// @ts-check
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import airbnbBase from 'eslint-config-airbnb-base'

export default tseslint.config(
    { ignores: ['**/node_modules', '**/dist', '**/out'] },
    tseslint.configs.recommended,
    eslintPluginReact.configs.flat.recommended,
    eslintPluginReact.configs.flat['jsx-runtime'],
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': eslintPluginReactHooks,
            'react-refresh': eslintPluginReactRefresh,
            '@typescript-eslint': typescriptEslint,
            prettier,
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules,
            ...eslintPluginReactRefresh.configs.vite.rules,
            ...typescriptEslint.configs.recommended.rules,
            ...airbnbBase.rules,
            'prettier/prettier': 'error',
            'no-unused-vars': [
                'warn',
                {
                    args: 'none',
                },
            ],
            '@typescript-eslint/no-unused-vars': ['warn'],
        },
    },
    eslintConfigPrettier,
)
