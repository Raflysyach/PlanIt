import api from './api'

export const organizersService = {
  getAll: async (params?: { category?: string; location?: string }) => {
    const res = await api.get('/organizers', { params })
    return res.data
  },

  getOne: async (id: number) => {
    const res = await api.get(`/organizers/${id}`)
    return res.data
  },
}