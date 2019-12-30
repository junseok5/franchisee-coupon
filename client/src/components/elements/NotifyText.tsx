import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface NotifyTextProps {
    color?: string
}

const NotifyText: React.SFC<NotifyTextProps> = ({
    children,
    color = COLORS.greenNormal
}) => {
    return <Container color={color}>{children}</Container>
}

export default NotifyText

const Container = styled.div`
    color: ${props => props.color};
    font-size: 0.9em;
    font-weight: bold;
    text-align: right;
`
