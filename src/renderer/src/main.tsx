import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme='dark'>
            <App />
        </MantineProvider>
    </StrictMode>,
)
