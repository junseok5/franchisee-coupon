import * as React from "react"
import styled from "styled-components"

interface ModalProps {
    title: string
    show: boolean
    onClose: () => void
}

const Modal: React.SFC<ModalProps> = ({ children, title, show, onClose }) => {
    return (
        <Styled show={show}>
            <div className={"dark-bg"} />
            <div className={"modal"}>
                <div className={"header"}>
                    <h3>{title}</h3>
                </div>
                <div className={"main"}>{children}</div>
            </div>
        </Styled>
    )
}

export default Modal

interface StyledProps {
    show: boolean
}

const Styled = styled.div<StyledProps>`
    display: ${props => (props.show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;

    .dark-bg {
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    .header {
        margin: 1em 1em 0 1em;
    }

    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        margin: 0.5em;
        background: white;
        border-radius: 4px;

        .main {
            padding: 1em;
        }
    }
`
