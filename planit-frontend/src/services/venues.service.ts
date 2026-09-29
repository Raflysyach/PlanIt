import api from './api'

export const venuesService = {
  getAll: async (params?: { category?: string; location?: string }) => {
    const res = await api.get('/venues', { params })
    return res.data
  },

  getOne: async (id: number) => {
    const res = await api.get(`/venues/${id}`)
    return res.data
  },
}