import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import { PublisherGithub } from '@electron-forge/publisher-github'
import type { ForgeConfig } from '@electron-forge/shared-types'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const iconUrl = 'https://raw.githubusercontent.com/SomeBody16/somelauncher/master/images/icon.png'
const iconPath = 'images/icon'

const config: ForgeConfig = {
    packagerConfig: {
        icon: iconPath,
    },
    rebuildConfig: {},
    makers: [new MakerSquirrel({})],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/preload.ts',
                        },
                    },
                ],
            },
        }),
    ],
    publishers: [
        new PublisherGithub({
            repository: {
                owner: 'SomeBody16',
                name: 'somelauncher',
            },
        }),
    ],
}

export default config
