import { homedir } from 'os'
import { join } from 'path'

export const getLauncherDir = (): string => {
    return join(homedir(), 'AppData', 'Roaming', '.somelauncher')
}
