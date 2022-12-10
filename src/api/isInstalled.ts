import { existsSync } from 'original-fs'
import { join } from 'path'
import { getLauncherDir } from './getLauncherDir'

export const isInstalled = () => {
    const launcherDir = getLauncherDir()
    const gitDir = join(launcherDir, '.git')
    return existsSync(gitDir)
}
