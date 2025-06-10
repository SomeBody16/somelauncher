import { DefaultMantineColor } from '@mantine/core'

export type App = {
    modpack: {
        remote: {
            /** URL of the modpack repository */
            url: string
            /** Branch of the modpack repository */
            branch: string
        }
        local: {
            /** Function that returns the local path to the modpack */
            getPath: () => string
        }
    }
    progress: {
        color: {
            /** Color that indicates the task is in progress */
            working: DefaultMantineColor
            /** Color that indicates the task has failed */
            error: DefaultMantineColor
            /** Color that indicates the task has succeeded */
            success: DefaultMantineColor
        }
    }
}
