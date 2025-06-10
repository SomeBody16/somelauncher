import { Center, Stack, Space, Title } from '@mantine/core'
import { useIntl } from '@renderer/hooks/useIntl'
import React from 'react'

export function AppContainer(props: { children: React.ReactNode }): React.JSX.Element {
    const { t } = useIntl()

    return (
        <Center>
            <Stack w='80vw'>
                <Space h='xl' />
                <Space h='xl' />
                <Center>
                    <Title order={1}>{t('app.name')}</Title>
                </Center>
                {props.children}
            </Stack>
        </Center>
    )
}
