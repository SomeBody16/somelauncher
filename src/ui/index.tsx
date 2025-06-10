import { Center, Code, Progress, Stack, Text } from '@mantine/core'
import React from 'react'
import { repositoryUrl } from '../config'

export default function UI() {
    const [taskName, setTaskName] = React.useState(<>'Initializing...'</>)
    const [progress, setProgress] = React.useState(0)
    const [gitProgress, setGitProgress] = React.useState(100)

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

    React.useEffect(() => {
        ;(async () => {
            const { getGit, ...api } = window.api
            const git = getGit({
                progress: ({ method, stage, progress }) => {
                    console.log(`git.${method} ${stage} stage ${progress}% complete`)
                    setGitProgress(progress)
                },
            })

            const branch = api.getBranch()
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
        })()
    }, [])

    let gitProgressText = ''
    if (gitProgress < 100) {
        gitProgressText = ` (${gitProgress}%)`
    }

    return (
        <Center sx={{ height: '100vh' }}>
            <Stack sx={{ width: '50vw' }}>
                <Text>
                    {taskName}
                    {gitProgressText}
                </Text>
                <Progress value={progress} animate />
                <Progress value={gitProgress} animate />
            </Stack>
        </Center>
    )
}
