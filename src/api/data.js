// 启动时尝试从后端 API 拉取动态内容并原位替换 src/data 中的 reactive 数组;
// 任一接口失败(无后端/超时)则保持静态兜底数据,官网功能不受影响
import { news, jobs, productCategories, productParams, honors, partners } from '../data'
import { productBanners, partnerLogos, honorImages, ol2iGalleryByName } from '../data/assets'

const TIMEOUT_MS = 2500

async function getJSON(path) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(path, { signal: ctrl.signal })
    if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

// 原位替换 reactive 数组内容(保持引用不变,已渲染的 computed 会响应更新)
function replaceList(list, items) {
  list.splice(0, list.length, ...items)
}

// 数据库图片列存文件名,这里映射回打包资源 URL;未知文件名回退为 undefined
const productImage = (name) => productBanners[name]
const galleryImages = (names) =>
  Array.isArray(names) && names.length ? names.map((n) => ol2iGalleryByName[n]).filter(Boolean) : undefined

export async function hydrateNews() {
  const { news: rows } = await getJSON('/api/news')
  replaceList(news, rows)
}

export async function hydrateJobs() {
  const { jobs: rows } = await getJSON('/api/jobs')
  replaceList(jobs, rows)
}

export async function hydrateProducts() {
  const { categories } = await getJSON('/api/products')
  replaceList(
    productCategories,
    categories.map((c) => ({
      id: c.id,
      name: c.name,
      desc: c.desc,
      products: c.products.map((p) => ({
        model: p.model,
        tag: p.tag,
        image: productImage(p.image),
        images: galleryImages(p.gallery),
        desc: p.desc,
      })),
    }))
  )
  // 参数表按型号重建,同时提供去连字符键(Services 页两种取法都兼容)
  const next = {}
  for (const c of categories) {
    for (const p of c.products) {
      const rows = p.params || []
      next[p.model] = rows
      next[p.model.replaceAll('-', '')] = rows
    }
  }
  Object.keys(productParams).forEach((k) => delete productParams[k])
  Object.assign(productParams, next)
}

export async function hydrateHonors() {
  const { honors: rows } = await getJSON('/api/honors')
  replaceList(
    honors,
    rows.map((h) => ({ ...h, image: honorImages[h.image] }))
  )
}

export async function hydratePartners() {
  const { partners: rows } = await getJSON('/api/partners')
  replaceList(
    partners,
    rows.map((p) => ({ ...p, image: partnerLogos[p.image] }))
  )
}

// 汇总水合;静默失败(纯静态部署属预期)
export function hydrateAll() {
  const tasks = [
    ['news', hydrateNews],
    ['jobs', hydrateJobs],
    ['products', hydrateProducts],
    ['honors', hydrateHonors],
    ['partners', hydratePartners],
  ]
  for (const [name, fn] of tasks) {
    fn().catch((err) => console.info(`[data] ${name} 使用静态兜底数据(${err.message})`))
  }
}
