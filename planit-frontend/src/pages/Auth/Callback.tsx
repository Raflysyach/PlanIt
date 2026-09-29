import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')
      const userStr = params.get('user')

      if (token && userStr) {
        const user = JSON.parse(decodeURIComponent(userStr))
        localStorage.setItem('planit_token', token)
        localStorage.setItem('planit_user', JSON.stringify(user))
        window.location.href = '/'
      } else {
        navigate('/auth/login')
      }
    } catch (err) {
      console.error('Callback error:', err)
      navigate('/auth/login')
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-gray-500 text-sm">Signing you in...</div>
      </div>
    </div>
  )
}

export default Callback