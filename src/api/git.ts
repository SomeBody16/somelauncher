import { mkdirSync } from 'original-fs'
import { simpleGit } from 'simple-git'
import { getLauncherDir } from './getLauncherDir'

const baseDir = getLauncherDir()
mkdirSync(baseDir, { recursive: true })

export const git = simpleGit({ baseDir })
