import React from 'react'
import { HomePage } from './page/Home'
import { Title } from '@mantine/core'
import { Page } from './App.types'
import { ProgressPage } from './page/Progress'
import { AppContainer } from './components/AppContainer'

export default function App(): React.JSX.Element {
    const [page, setPage] = React.useState<Page>('home')

    const Page = React.useMemo((): React.JSX.Element => {
        switch (page) {
            case 'home':
                return <HomePage setPage={setPage} />
            case 'progress':
                return <ProgressPage />
            default:
                return <Title order={1}>Invalid page: {page}</Title>
        }
    }, [page])

    return <AppContainer>{Page}</AppContainer>
}
