import { DownloadTask, getVersionList, installTask } from '@xmcl/installer'
import { existsSync } from 'fs'
import { join } from 'path'

export const installMinecraft = async (mcVersion: string, destination: string) => {
    const versionDir = join(destination, 'versions', mcVersion)
    if (existsSync(versionDir)) {
        console.log('Minecraft', mcVersion, 'installed, skipping...')
        // return
    }

    const { versions } = await getVersionList()
    const foundVersion = versions.find((v) => v.id === mcVersion)!

    await new DownloadTask({
        url: 'https://launcher.mojang.com/download/Minecraft.exe',
        destination: join(destination, 'minecraft.exe'),
    }).startAndWait()

    await installTask(foundVersion, destination).startAndWait()
}
