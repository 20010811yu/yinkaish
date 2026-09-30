// 管理端接口封装:自动附带 JWT,401 时清除会话并跳转登录页
const TOKEN_KEY = 'yk_admin_token'
const USER_KEY = 'yk_admin_user'
// 登录页完整路径需带站点 base(开发/GitHub Pages 为 /yinkaish/,Netlify 为 /)
const LOGIN_PATH = `${import.meta.env.BASE_URL}admin/login`

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function getSession() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch { return null }
}
export function setSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  if (res.status === 401) {
    clearSession()
    if (!location.pathname.startsWith(LOGIN_PATH)) location.href = LOGIN_PATH
    throw new Error('登录已失效,请重新登录')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

export const adminApi = {
  login: (username, password) => request('/api/admin/login', { method: 'POST', body: { username, password } }),
  me: () => request('/api/admin/me'),
  changePassword: (oldPassword, newPassword) => request('/api/admin/password', { method: 'PUT', body: { oldPassword, newPassword } }),

  list: (name) => request(`/api/admin/${name}`),
  create: (name, body) => request(`/api/admin/${name}`, { method: 'POST', body }),
  update: (name, id, body) => request(`/api/admin/${name}/${id}`, { method: 'PUT', body }),
  remove: (name, id) => request(`/api/admin/${name}/${id}`, { method: 'DELETE' }),

  params: (productId) => request(`/api/admin/products/${productId}/params`),
  saveParams: (productId, params) => request(`/api/admin/products/${productId}/params`, { method: 'PUT', body: { params } }),
}
