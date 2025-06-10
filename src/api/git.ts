import { existsSync, mkdirSync, readFileSync } from 'original-fs'
import { SimpleGitOptions, simpleGit } from 'simple-git'
import { getLauncherDir } from './getLauncherDir'

const baseDir = getLauncherDir()
mkdirSync(baseDir, { recursive: true })

export const getGit = (options?: Partial<SimpleGitOptions>) => simpleGit({ baseDir, ...options })

export const getBranch = (): string => {
    const defaultBranch = 'main'
    const branchFile = './branch.txt'
    try {
        if (existsSync(branchFile)) {
            const data = readFileSync(branchFile, {
                encoding: 'utf-8',
            })
            
            return data.trim() || defaultBranch
        }
    } catch (e) {
        console.error(e)
    }


    return defaultBranch
}
