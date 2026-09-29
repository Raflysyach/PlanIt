import api from './api'

export const bookingsService = {
  create: async (data: {
    venueId?: number
    organizerId?: number
    eventName: string
    eventDate: string
    guests: number
    eventLocation: string
    notes?: string
    packageName: string
    totalPrice: number
    paymentMethod: string
  }) => {
    const res = await api.post('/bookings', data)
    return res.data
  },

  getMyBookings: async () => {
    const res = await api.get('/bookings')
    return res.data
  },

  getOne: async (id: number) => {
    const res = await api.get(`/bookings/${id}`)
    return res.data
  },

  updateStatus: async (id: number, status: string) => {
    const res = await api.patch(`/bookings/${id}/status`, { status })
    return res.data
  },
}