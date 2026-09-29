import api from './api'

export const usersService = {
  getMe: async () => {
    const res = await api.get('/users/me')
    return res.data
  },

  updateMe: async (data: {
    fullName?: string
    username?: string
    phone?: string
    location?: string
    gender?: string
    dateOfBirth?: string
  }) => {
    const res = await api.patch('/users/me', data)
    return res.data
  },
}