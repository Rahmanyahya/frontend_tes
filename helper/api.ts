import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
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