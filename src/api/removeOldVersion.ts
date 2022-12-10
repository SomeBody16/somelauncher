import { existsSync, lstatSync, mkdirSync, readdirSync, rmdirSync, unlinkSync } from 'original-fs'
import { join } from 'path'
import { getLauncherDir } from './getLauncherDir'

const rmdirRecursiveSync = (dir: string) => {
    if (existsSync(dir)) {
        readdirSync(dir).forEach((file, index) => {
            const currPath = join(dir, file)
            if (lstatSync(currPath).isDirectory()) {
                rmdirRecursiveSync(currPath)
            } else {
                unlinkSync(currPath)
            }
        })
        rmdirSync(dir)
    }
}

export const removeOldVersion = () => {
    const launcherDir = getLauncherDir()
    const overrideFile = join(launcherDir, 'override.zip')
    if (existsSync(overrideFile)) {
        rmdirRecursiveSync(launcherDir)
        mkdirSync(launcherDir, { recursive: true })
    }
}
