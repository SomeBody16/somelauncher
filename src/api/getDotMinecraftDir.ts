import { homedir } from 'os'
import { join } from 'path'

export const getDotMinecraftDir = () => {
    return join(homedir(), 'AppData', 'Roaming', '.minecraft')
}
