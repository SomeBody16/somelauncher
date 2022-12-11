import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { getDotMinecraftDir } from '../getDotMinecraftDir'
import { getLauncherDir } from '../getLauncherDir'

const readJson = (filePath: string) => JSON.parse(readFileSync(filePath, 'utf-8'))
const writeJson = (filePath: string, data: any) =>
    writeFileSync(filePath, JSON.stringify(data, null, 4))

export const updateProfiles = async (
    name: string,
    mcVersion: string,
    forgeVersion: string,
    ramGb: number,
) => {
    const gameDir = getLauncherDir()
    const profilesFile = path.join(gameDir, 'launcher_profiles.json')

    const launcherProfiles = readJson(profilesFile)
    launcherProfiles.profiles = {
        [name]: {
            gameDir,
            icon: 'Cake',
            javaArgs: `-Xmx${ramGb}G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M`,
            lastVersionId: `${mcVersion}-forge-${forgeVersion}`,
            name,
            type: 'custom',
        },
    }

    writeJson(profilesFile, launcherProfiles)
}
