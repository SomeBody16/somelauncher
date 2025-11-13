import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'original-fs'
import { SimpleGitOptions, simpleGit } from 'simple-git'
import { getLauncherDir } from './getLauncherDir'

const baseDir = getLauncherDir()
mkdirSync(baseDir, { recursive: true })

export const getGit = (options?: Partial<SimpleGitOptions>) => simpleGit({ baseDir, ...options })

/**
 * Should return last git commit full description
 *
 * @param branch - branch name
 */
export const getChangelog = async (branch: string): Promise<string> => {
    const git = getGit()
    try {
        // Fetch latest commits for the branch
        await git.fetch('origin', branch)

        // Get the log of commits for the given branch, limiting to the most recent 50 for practicality
        const logResult = await git.log([`origin/${branch}`, '--max-count=1'])

        // Format each commit as "hash - message"
        return logResult.all[0].message
    } catch (error: any) {
        // You may want to add error reporting/logging here
        return `Failed to get changelog: ${error?.message ?? error}`
    }

}

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

export const setBranch = (branch: string): void => {
    const branchFile = './branch.txt'
    try {
        writeFileSync(branchFile, branch, { encoding: 'utf-8' })
    } catch (e) {
        console.error(`Failed to set branch:`, e)
    }
}
