import {
    Button,
    Center,
    Code,
    Divider,
    Group,
    List,
    Progress,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import React from 'react'
import { repositoryUrl } from '../config'

type Step = 'home' | 'install' | 'launch'

export default function UI() {
    const [step, setStep] = React.useState<Step>('home')
    const [taskName, setTaskName] = React.useState(<>Initializing...</>)
    const [progress, setProgress] = React.useState(0)
    const [gitProgress, setGitProgress] = React.useState(100)
    const version = React.useMemo(() => window.api.getVersion(), [])

    const [branch, setBranch] = React.useState(window.api.getBranch())
    const [changelog, setChangelog] = React.useState('Loading...')
    React.useEffect(() => {
        setChangelog('Loading...')
        window.api.setBranch(branch)
        window.api.getChangelog(branch).then(setChangelog)
    }, [branch])

    const runTask = async (
        name: JSX.Element,
        progressOnDone: number,
        task: () => Promise<void>,
    ) => {
        setTaskName(name)
        await task()
        setProgress(progressOnDone)
        setGitProgress(100)
    }

    const start = async () => {
        setStep('install')
        const { getGit, ...api } = window.api
        const git = getGit({
            progress: ({ method, stage, progress }) => {
                console.log(`git.${method} ${stage} stage ${progress}% complete`)
                setGitProgress(progress)
            },
        })
        console.log(`Branch: ${branch}`)

        await runTask(<>Initializing...</>, 5, async () => {
            api.removeOldVersion()
            await git.init().catch(async (error) => {
                console.error(error)
                console.error('GIT not installed')

                await api.downloadGit()
                alert('You need to restart the launcher')
                window.electron.exit()
            })
        })

        await runTask(<>Connecting to remote...</>, 10, async () => {
            const remotes = await git.getRemotes()
            if (!remotes.length) {
                await git.addRemote('origin', repositoryUrl)
            }
        })

        await runTask(<>Downloading...</>, 60, async () => {
            await git.fetch('origin', branch)
        })

        await runTask(<>Installing mods...</>, 65, async () => {
            await git.reset(['--hard', `origin/${branch}`])
        })

        const launcherDir = api.getLauncherDir()
        const version = api.getVersion()

        await runTask(
            <>
                Installing Minecraft <Code>{version.minecraft}</Code>...
            </>,
            70,
            async () => {
                await api.minecraft.installMinecraft(version.minecraft, launcherDir)
            },
        )

        await runTask(
            <>
                Installing Forge <Code>{version.forge}</Code>...
            </>,
            90,
            async () => {
                await api.minecraft.installForge(version.minecraft, version.forge, launcherDir)
            },
        )

        setStep('launch')
        await runTask(<>Preparing for launch...</>, 95, async () => {
            await api.minecraft.updateProfiles(
                'Minecraft THE Server',
                version.minecraft,
                version.forge,
                api.getRamForMc(),
            )
            await api.minecraft.ensureDependenciesInstalled(version.minecraft, launcherDir)
        })

        await runTask(<>Launching minecraft...</>, 100, async () => {
            await api.minecraft.launch()
        })

        window.electron.exit()
    }

    let gitProgressText = ''
    if (gitProgress < 100) {
        gitProgressText = ` (${gitProgress}%)`
    }

    return (
        <Center sx={{ height: '100vh', width: '100vw' }}>
            {step === 'home' && (
                <Group sx={{ width: '100vw' }}>
                    <Stack
                        align='center'
                        sx={{ width: '40vw', height: '90vh', borderRight: '1px solid gray' }}
                    >
                        <Title order={3}>{version.name}</Title>
                        <Group spacing={6}>
                            <Code title='Minecraft Version'>{version.minecraft}</Code>
                            <Code title='Forge Version'>{version.forge}</Code>
                        </Group>

                        <TextInput
                            label='Branch'
                            value={branch}
                            onChange={(event) => setBranch(event.target.value)}
                            sx={{ width: '35vw', marginTop: 'auto' }}
                        />
                        <Button onClick={start} sx={{ width: '35vw' }}>
                            Start
                        </Button>
                    </Stack>
                    <Stack sx={{ height: '90vh' }}>
                        <Title order={3}>Changelog</Title>
                        <Text>{changelog}</Text>
                    </Stack>
                </Group>
            )}
            {step === 'install' && (
                <Stack sx={{ width: '50vw' }}>
                    <Text>
                        {taskName}
                        {gitProgressText}
                    </Text>
                    <Progress value={progress} animate />
                    <Progress value={gitProgress} animate />
                </Stack>
            )}
            {step === 'launch' && (
                <Stack sx={{ width: '50vw' }}>
                    <Text>{taskName}</Text>
                    <Progress value={100} animate color='green' />
                    <Progress value={100} animate color='green' />
                </Stack>
            )}
        </Center>
    )
}
