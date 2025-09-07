import Cookies from "js-cookie"

export const storesCookie = (
    key: string,
    value: string
): void => {
    Cookies.set(key, value)
}

export const getStoresCookie = (
    key: string
): string => {
    return Cookies.get(key) || "";
}

export const removeCookie = (key: string): void => {
    Cookies.remove(key)
}