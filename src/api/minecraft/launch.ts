import { spawn } from 'child_process'
import { getLauncherDir } from '../getLauncherDir'

export const launch = async () => {
    const cwd = getLauncherDir()

    const child = spawn('Minecraft.exe', [`--workDir=${cwd}`], {
        cwd,
        detached: true,
    })
    child.unref()

    console.log('DONE')
}
