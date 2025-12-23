import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'original-fs'
import { SimpleGitOptions, simpleGit } from 'simple-git'
import { getLauncherDir } from './getLauncherDir'
import { join } from 'path'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import {read} from 'to-vfile'
import {unified} from 'unified'

const baseDir = getLauncherDir()
mkdirSync(baseDir, { recursive: true })

export const getGit = (options?: Partial<SimpleGitOptions>) => simpleGit({ baseDir, ...options })

/**
 * Should return CHANGELOG.md content from given branch
 *
 * @param branch - branch name
 */
export const getChangelog = async (): Promise<string> => {
    try {
        const launcherDir = getLauncherDir()
        const changelogFile = join(launcherDir, 'CHANGELOG.md')
        return unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(await read(changelogFile))
            .then((result) => String(result))
    } catch (e) {
        console.error(e)
        return ''
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
