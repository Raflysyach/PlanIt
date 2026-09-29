import api from './api'

export const authService = {
  register: async (data: {
    email: string
    username: string
    password: string
    fullName: string
  }) => {
    const res = await api.post('/auth/register', data)
    return res.data
  },

  login: async (data: { email: string; password: string }) => {
    const res = await api.post('/auth/login', data)
    return res.data
  },
}