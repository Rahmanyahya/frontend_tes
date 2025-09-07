export const verifyKaryawan = async (token: string) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/employee/me`
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'app-key': `${process.env.NEXT_PUBLIC_APP_KEY}`
            },
        })

        const data = await result.json()
        return data.success
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const verifyPelanggan = async (token: string) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customer/me`
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'app-key': `${process.env.NEXT_PUBLIC_APP_KEY}`
            },
        })

        const data = await result.json()
        return data.success
    } catch (error) {
        console.log(error)
        return false;
    }
}