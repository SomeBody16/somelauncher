import { Text, Progress, Grid, DefaultMantineColor } from '@mantine/core'
import React from 'react'
import { useIntl } from '../hooks/useIntl'
import { useTasks } from '../hooks/useTasks'
import { useConfig } from '../hooks/useConfig'

export function ProgressPage(): React.JSX.Element {
    const config = useConfig()
    const { t } = useIntl()

    const getProgressColor = React.useCallback(
        (value: number): DefaultMantineColor => {
            if (value >= 100) {
                return config.progress.color.success
            } else if (value < 0) {
                return config.progress.color.error
            }
            return config.progress.color.working
        },
        [config],
    )

    const { tasks, currentTask, nextTask } = useTasks({
        currentTaskId: 'init',
        tasks: {
            init: 2,
            auth: 2,
            download: 6,
            finalize: 1,
        },
        // Close the app when all tasks are done
        onFinish: () => setTimeout(() => window.electron.ipcRenderer.send('app:finish'), 1000),
    })

    React.useEffect(() => {
        if (currentTask.progress >= 100) {
            nextTask()
        }
    }, [currentTask.progress, nextTask])

    // DEBUG
    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentProgress = currentTask.progress
            const newProgress = currentProgress + 1
            currentTask.setProgress(newProgress)
        }, 50)
        return () => clearInterval(interval)
    }, [currentTask])
    // END DEBUG

    return (
        <>
            <Text>{t(`task.${currentTask.id}`)}</Text>
            <Progress value={currentTask.progress} color={getProgressColor(currentTask.progress)} animated />
            <Grid grow mt='xs' gutter={5}>
                {Object.values(tasks).map((task, index) => (
                    <Grid.Col key={index} span={task.weight}>
                        <Progress value={task.progress} color={getProgressColor(task.progress)} animated />
                    </Grid.Col>
                ))}
            </Grid>
        </>
    )
}
