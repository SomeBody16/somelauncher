import { getForgeVersionList, installForgeTask } from '@xmcl/installer'
import { existsSync } from 'original-fs'
import { join } from 'path'
import version from 'simple-git/dist/src/lib/tasks/version'

export const installForge = async (
    mcVersion: string,
    forgeVersion: string,
    destination: string,
) => {
    const versionDir = join(destination, 'versions', `${mcVersion}-forge-${forgeVersion}`)
    if (existsSync(versionDir)) {
        console.log('Forge', forgeVersion, 'installed, skipping...')
        return
    }

    const { versions } = await getForgeVersionList({
        mcversion: mcVersion,
    })
    const resolvedVersion = versions.find((v) => v.version === forgeVersion)!
    await installForgeTask(resolvedVersion, destination).startAndWait()
}
