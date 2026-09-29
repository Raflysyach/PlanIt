import api from './api'

export const reviewsService = {
  getByVenue: async (venueId: number) => {
    const res = await api.get(`/reviews/venue/${venueId}`)
    return res.data
  },

  getByOrganizer: async (organizerId: number) => {
    const res = await api.get(`/reviews/organizer/${organizerId}`)
    return res.data
  },

  create: async (data: {
    venueId?: number
    organizerId?: number
    rating: number
    comment: string
  }) => {
    const res = await api.post('/reviews', data)
    return res.data
  },

  getMyReviewCount: async () => {
    const res = await api.get('/reviews/my/count')
    return res.data
  },
}