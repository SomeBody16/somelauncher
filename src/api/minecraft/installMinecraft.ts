import { DownloadTask, getVersionList, installTask } from '@xmcl/installer'
import path from 'path'

export const installMinecraft = async (mcVersion: string, destination: string) => {
    const { versions } = await getVersionList()
    const foundVersion = versions.find((v) => v.id === mcVersion)!

    await new DownloadTask({
        url: 'https://launcher.mojang.com/download/Minecraft.exe',
        destination: path.join(destination, 'minecraft.exe'),
    }).startAndWait()

    await installTask(foundVersion, destination).startAndWait()
}
