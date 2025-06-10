import { Version } from '@xmcl/core'
import { installDependenciesTask } from '@xmcl/installer'

export const ensureDependenciesInstalled = async (mcVersion: string, destination: string) => {
    const resolvedVersion = await Version.parse(destination, mcVersion)
    return new Promise<void>(async (resolve) => {
        await installDependenciesTask(resolvedVersion).startAndWait({
            onSucceed(task) {
                console.log('onSucceed', task.path, task)
                if (task.path === 'dependencies.libraries' && task.isDone) {
                    resolve()
                }
            },
        })
        resolve()
    })
}
