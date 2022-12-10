import { Version } from '@xmcl/core'
import { installDependenciesTask } from '@xmcl/installer'

export const ensureDependenciesInstalled = async (mcVersion: string, destination: string) => {
    const resolvedVersion = await Version.parse(destination, mcVersion)
    await installDependenciesTask(resolvedVersion).startAndWait()
}
