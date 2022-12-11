import { DownloadTask } from '@xmcl/installer'
import { execSync } from 'child_process'
import { unlinkSync } from 'original-fs'
import { join } from 'path'
import { getLauncherDir } from './getLauncherDir'

const downloadUrl =
    'https://github.com/git-for-windows/git/releases/download/v2.38.1.windows.1/Git-2.38.1-64-bit.exe'

export const downloadGit = async () => {
    const launcherDir = getLauncherDir()
    const installerFile = join(launcherDir, 'git-install.exe')

    await new DownloadTask({
        url: downloadUrl,
        destination: installerFile,
    }).startAndWait()

    execSync(installerFile)
    unlinkSync(installerFile)
}
