import { getForgeVersionList, installForgeTask } from '@xmcl/installer'

export const installForge = async (
    mcVersion: string,
    forgeVersion: string,
    destination: string,
) => {
    const { versions } = await getForgeVersionList({
        mcversion: mcVersion,
    })
    const resolvedVersion = versions.find((v) => v.version === forgeVersion)!
    await installForgeTask(resolvedVersion, destination).startAndWait()
}
