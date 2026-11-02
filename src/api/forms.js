// 官网表单提交双通道:优先自建后端(/api/contact、/api/apply,VPS 整站部署时同源命中);
// 拿不到 JSON 应答(Netlify/GitHub Pages 纯静态托管会回 index.html 或 404)或网络失败时,
// 回退 Netlify Forms 影子表单(index.html 中的 contact / job)。
// 后端一旦给出 JSON 应答即为最终结论(含 4xx/5xx),不再回退,避免绕过限速与重复提交。
const API_TIMEOUT = 20_000

// 返回 true/false 为后端结论;返回 null 表示「没有后端」,交给 Netlify
async function postApi(path, init) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), API_TIMEOUT)
  try {
    const res = await fetch(path, { ...init, signal: ctrl.signal })
    if (!res.headers.get('content-type')?.includes('application/json')) return null
    const data = await res.json().catch(() => ({}))
    return res.ok && data.ok === true
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

const postNetlify = (body, headers) =>
  fetch('/', { method: 'POST', body, headers }).then((r) => r.ok, () => false)

/** 联系表单;fields: { name, email, phone, message } */
export async function submitContact(fields) {
  const api = await postApi('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  })
  if (api !== null) return api
  return postNetlify(
    new URLSearchParams({ 'form-name': 'contact', ...fields }),
    { 'Content-Type': 'application/x-www-form-urlencoded' },
  )
}

/** 职位申请;fields: { position, name, phone, email, message },resume: File */
export async function submitApplication(fields, resume) {
  // 附件走 multipart:不手动设 Content-Type,浏览器自带 boundary
  const fd = new FormData()
  Object.entries(fields).forEach(([k, v]) => fd.set(k, v ?? ''))
  fd.set('resume', resume, resume.name)
  const api = await postApi('/api/apply', { method: 'POST', body: fd })
  if (api !== null) return api
  fd.set('form-name', 'job')
  return postNetlify(fd)
}
