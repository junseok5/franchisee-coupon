import * as React from 'react'
import styled from 'styled-components'

interface ErrorNoticeProps {}

const ErrorNotice: React.SFC<ErrorNoticeProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default ErrorNotice

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-weight: bold;
`