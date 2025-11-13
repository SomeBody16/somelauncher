import { readFileSync } from 'original-fs'
import { join } from 'path'
import { getLauncherDir } from './getLauncherDir'

type Version = {
    name: string
    minecraft: string
    forge: string
}

export const getVersion = (): Version => {
    const launcherDir = getLauncherDir()
    const versionFile = join(launcherDir, 'version.json')
    const str = readFileSync(versionFile, 'utf-8')
    return JSON.parse(str)
}
