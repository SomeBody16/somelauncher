import { homedir } from 'os'
import { join } from 'path'

export const getLauncherDir = () => {
    return join(homedir(), 'AppData', 'Roaming', '.somelauncher')
}
