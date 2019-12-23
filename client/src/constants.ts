export enum PAGE_PATHS {
    HOME = "/",
    OWNER = "/owners",
    STORE_EDITOR = "/store-editor"
}

export enum COLORS {
    main = "#fe8c52",
    grayLight = "#f1f2f6",
    grayLightHover = "#dfe4ea",
    grayNormal = "#bdc3c7",
    grayBold = "#7f8c8d",
    blueNormal = "#3498db"
}

export const regex = {
    id: /^[a-zA-Z0-9]{2,30}$/,
    name: /^[a-zA-Z0-9ㄱ-힣]{2,10}$/,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    password: /^[A-Za-z0-9!@#$%^&+=]{6,30}$/
}
