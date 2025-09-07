import { cookies } from "next/headers";

export const getServerCookie = async (
    key: string
): Promise<string> => {
    return (await cookies()).get(key)?.value || ""
}

