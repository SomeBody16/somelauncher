import { Center, Code, Progress, Stack, Text } from '@mantine/core'
import React from 'react'
import { repositoryUrl } from '../config'

export default function UI() {
    const [taskName, setTaskName] = React.useState(<>'Initializing...'</>)
    const [progress, setProgress] = React.useState(0)

    const runTask = async (
        name: JSX.Element,
        progressOnDone: number,
        task: () => Promise<void>,
    ) => {
        setTaskName(name)
        await task()
        setProgress(progressOnDone)
    }

    React.useEffect(() => {
        ;(async () => {
            const { git, ...api } = window.api

            await runTask(<>Initializing...</>, 10, async () => {
                api.removeOldVersion()
                await git.init()
            })

            await runTask(<>Connecting to remote...</>, 20, async () => {
                const remotes = await git.getRemotes()
                if (!remotes.length) {
                    await git.addRemote('origin', repositoryUrl)
                }
            })

            await runTask(<>Updating client...</>, 50, async () => {
                await git.fetch()
                await git.pull('origin', 'master')
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
                    await api.minecraft.ensureDependenciesInstalled(version.minecraft, launcherDir)
                },
            )

            await runTask(
                <>
                    Installing Forge <Code>{version.forge}</Code>...
                </>,
                90,
                async () => {
                    await api.minecraft.installForge(version.minecraft, version.forge, launcherDir)
                    await api.minecraft.ensureDependenciesInstalled(version.minecraft, launcherDir)
                },
            )

            await runTask(<>Preparing for launch...</>, 95, async () => {
                await api.minecraft.updateProfiles(
                    'Some Hunters',
                    version.minecraft,
                    version.forge,
                    api.getRamForMc(),
                )
            })

            await runTask(<>Launching minecraft...</>, 100, async () => {
                await api.minecraft.launch()
            })

            window.electron.exit()
        })()
    }, [])
    return (
        <Center sx={{ height: '100vh' }}>
            <Stack sx={{ width: '50vw' }}>
                <Text>{taskName}</Text>
                <Progress value={progress} animate />
            </Stack>
        </Center>
    )
}