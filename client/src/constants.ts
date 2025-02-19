export const storageURL =
    process.env.NODE_ENV === "production"
        ? "http://in500m.com/uploads"
        : "http://localhost:5000/uploads"
export const apiBaseURL =
    process.env.NODE_ENV === "production"
        ? "http://in500m.com/api"
        : "http://localhost:5000/api"

export enum PAGE_PATHS {
    HOME = "/",
    OWNER = "/owners",
    STORE_EDITOR = "/store-editor",
    STORE_DETAIL = "/stores",
    ADVERTISEMENT_EDITOR = "/advertisement-editor",
    ADMIN = "/admin"
}

export enum COLORS {
    main = "#34C6F5",
    mainHover = "#24ABD1",
    grayLight = "#DFDFDF",
    grayLightHover = "#dfe4ea",
    grayNormal = "#bdc3c7",
    grayBold = "#7f8c8d",
    grayTitle = "#555555",
    grayButton = "#A1A6AD",
    blueNormal = "#3498db",
    greenNormal = "#07B481",
    redNormal = "#ee5253",
    background = "#F5F5F5",
    border = "#E0E0E0"
}

export const regex = {
    id: /^[a-zA-Z0-9]{2,30}$/,
    name: /^[a-zA-Z0-9ㄱ-힣]{2,10}$/,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    password: /^[A-Za-z0-9!@#$%^&+=]{6,30}$/,
    storeName: /^[a-zA-Z0-9ㄱ-힣\s]{1,30}$/
}
