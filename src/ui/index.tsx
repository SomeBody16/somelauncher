import { Center, Progress, Stack, Text } from '@mantine/core'
import React from 'react'
import { repositoryUrl } from '../config'

export default function UI() {
    const [taskName, setTaskName] = React.useState('Initializing...')
    const [progress, setProgress] = React.useState(0)

    const runTask = async (name: string, progressOnDone: number, task: () => Promise<void>) => {
        setTaskName(name)
        await task()
        setProgress(progressOnDone)
    }

    React.useEffect(() => {
        ;(async () => {
            const { git, ...api } = window.api

            await runTask('Initializing...', 10, async () => {
                api.removeOldVersion()
            })

            if (!api.isInstalled()) {
                await runTask('Connecting to remote...', 20, async () => {
                    await git.clone(repositoryUrl, api.getLauncherDir(), [
                        '--depth',
                        '1',
                        '--filter',
                        'blob:none',
                        '--no-checkout',
                    ])
                })
            }

            await runTask('Updating client...', 50, async () => {
                let error
                for (let i = 0; i < 3; i++) {
                    // 3 retries
                    try {
                        await git.checkout(['master', '--', 'modpack/client'])
                        return
                    } catch (e) {
                        error = e
                    }
                }
                throw error
            })
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
