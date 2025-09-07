import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstance.interceptors.response.use(
    (response) => response, 
    (error) => {
      if (error.response?.status === 403) {
       
        if (typeof window !== 'undefined') {
          window.location.href = '/' 
        }
      }
      return Promise.reject(error)
    }
  )