import * as React from "react"
import styled from "styled-components"
import { FiX } from "react-icons/fi"
import { COLORS } from "src/constants"

interface ModalProps {
    title: string
    show: boolean
    onHideModal: () => void
}

const Modal: React.SFC<ModalProps> = ({
    children,
    title,
    show,
    onHideModal
}) => {
    return (
        <Container show={show}>
            <div className={"dark-bg"} onClick={onHideModal} />
            <div className={"modal animated fade-in-up"}>
                <div className={"header"}>
                    <h3>{title}</h3>
                    <div className={"close-button"} onClick={onHideModal}>
                        <FiX size={24} />
                    </div>
                </div>
                <div className={"main"} id={"modal"}>
                    {children}
                </div>
            </div>
        </Container>
    )
}

export default Modal

interface ContainerProps {
    show: boolean
}

const Container = styled.div<ContainerProps>`
    display: ${props => (props.show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 20;

    .dark-bg {
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    .header {
        margin: 0 1em 0 1em;
        padding-top: 1em;
        padding-bottom: 0.5em;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dotted ${COLORS.border};

        h3 {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .close-button {
            cursor: pointer;
        }
    }

    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        max-height: 600px;
        margin: 0.5em;
        background: white;
        border-radius: 4px;
        overflow-y: auto;

        .main {
            padding: 14px;
        }
    }
`
