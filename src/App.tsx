import { MantineProvider } from '@mantine/core'
import { createRoot } from 'react-dom/client'
import UI from './ui'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
            colorScheme: 'dark',
        }}
    >
        <UI />
    </MantineProvider>,
)
