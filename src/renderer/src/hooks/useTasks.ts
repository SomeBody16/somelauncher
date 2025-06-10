import React from 'react'

export type TaskId = keyof TranslationDefault['task']

export type UseTasksOptions = {
    currentTaskId: TaskId
    tasks: Record<TaskId, number>
    onFinish: () => void
}

export type TaskProgress = {
    // eslint-disable-next-line no-unused-vars
    [key in TaskId]?: number
}

export type UseTasksResult = {
    progress: TaskProgress
    setCurrentTask: (taskId: TaskId) => void
    currentTask: {
        id: TaskId
        progress: number
        setProgress: (value: number) => void
    }
    tasks: {
        // eslint-disable-next-line no-unused-vars
        [key in TaskId]: {
            weight: number
            progress: number
        }
    }
    nextTask: () => void
}

export const useTasks = (options: UseTasksOptions): UseTasksResult => {
    const [currentTaskId, setCurrentTaskId] = React.useState<TaskId>(options.currentTaskId)
    const [progress, setProgress] = React.useState<TaskProgress>({})
    const updateProgress = (taskId: TaskId, value: number): void => {
        setProgress((prev) => ({
            ...prev,
            [taskId]: value,
        }))
    }

    return {
        progress,
        setCurrentTask: setCurrentTaskId,
        currentTask: {
            id: currentTaskId,
            progress: progress[currentTaskId] || 0,
            setProgress: (value) => updateProgress(currentTaskId, value),
        },
        tasks: Object.entries(options.tasks).reduce(
            (acc, [taskId, weight]) => {
                acc[taskId] = {
                    weight,
                    progress: progress[taskId] || 0,
                }
                return acc
            },
            {} as UseTasksResult['tasks'],
        ),
        nextTask: () => {
            const taskIds = Object.keys(options.tasks) as TaskId[]
            const currentIndex = taskIds.indexOf(currentTaskId)
            if (currentIndex < taskIds.length - 1) {
                updateProgress(currentTaskId, 100)
                setTimeout(() => setCurrentTaskId(taskIds[currentIndex + 1]), 1000)
            } else {
                updateProgress(currentTaskId, 100)
                setTimeout(() => options.onFinish(), 1000)
            }
        },
    }
}
