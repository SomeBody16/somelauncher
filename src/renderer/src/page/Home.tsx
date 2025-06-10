import { Button, Center, Text } from '@mantine/core'
import { useIntl } from '../hooks/useIntl'
import { PageProps } from '@renderer/App.types'

export function HomePage(props: PageProps): React.JSX.Element {
    const { t } = useIntl()

    const startHandler = (): void => props.setPage('progress')

    return (
        <>
            <Center>
                <Text>{t('app.description')}</Text>
            </Center>
            <Center>
                <Button onClick={startHandler}>{t('app.start')}</Button>
            </Center>
        </>
    )
}
