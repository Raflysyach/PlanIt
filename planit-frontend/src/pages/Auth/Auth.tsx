import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()
  const isSignup = location.pathname === '/auth/signup'

  const [tab, setTab] = useState<'login' | 'signup'>(isSignup ? 'signup' : 'login')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('')
  const [signupUsername, setSignupUsername] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupFullName, setSignupFullName] = useState('')

  const handleLogin = async () => {
    try {
      setLoading(true)
      setError('')
      await login(loginEmail, loginPassword)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    try {
      setLoading(true)
      setError('')
      await register({
        email: signupEmail,
        username: signupUsername,
        password: signupPassword,
        fullName: signupFullName,
      })
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF5FC] to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/src/assets/logo.svg" alt="PlanIt" className="h-10 mx-auto" />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setTab('login'); navigate('/auth/login') }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all
              ${tab === 'login' ? 'bg-blue-600 text-white shadow' : 'text-gray-500'}`}
            >
              Log in
            </button>
            <button
              onClick={() => { setTab('signup'); navigate('/auth/signup') }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all
              ${tab === 'signup' ? 'bg-blue-600 text-white shadow' : 'text-gray-500'}`}
            >
              Sign up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Welcome back!
              </h2>
              <p className="text-gray-500 text-sm mb-6">Sign in to your PlanIt account</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all pr-10"
                    />
                    <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-blue-600" defaultChecked />
                    Remember me
                  </label>
                  <button className="text-sm text-blue-600 font-semibold hover:underline">Forgot password?</button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all mt-6"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button
                onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`}
                className="w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span className="text-lg">G</span> Continue with Google
              </button>

              <p className="text-center text-sm text-gray-500 mt-5">
                Don't have an account?{' '}
                <button onClick={() => { setTab('signup'); navigate('/auth/signup') }} className="text-blue-600 font-bold hover:underline">
                  Sign up for free
                </button>
              </p>
            </div>
          )}

          {/* SIGNUP FORM */}
          {tab === 'signup' && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Create your account
              </h2>
              <p className="text-gray-500 text-sm mb-6">Join PlanIt and start planning your events</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={signupFullName}
                    onChange={(e) => setSignupFullName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="Choose a unique username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        placeholder="Min 8 chars"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all pr-10"
                      />
                      <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Confirm</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Repeat password"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all pr-10"
                      />
                      <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="DD" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all text-center" />
                    <input type="text" placeholder="MM" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all text-center" />
                    <input type="text" placeholder="YYYY" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all text-center" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all mt-6"
              >
                {loading ? 'Creating account...' : 'Create Free Account'}
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button
                onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`}
                className="w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span className="text-lg">G</span> Continue with Google
              </button>

              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{' '}
                <button onClick={() => { setTab('login'); navigate('/auth/login') }} className="text-blue-600 font-bold hover:underline">
                  Log in here
                </button>
              </p>
            </div>
          )}

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span>
          {' '}and{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>
        </p>

      </div>
    </div>
  )
}

export default Auth