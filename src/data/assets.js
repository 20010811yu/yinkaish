// 静态素材文件名 → 打包后 URL 的映射(数据库只存文件名,由前端解析为实际地址)
const bannerModules = import.meta.glob('../assets/products/*_banner.*', { eager: true, import: 'default' })
export const productBanners = Object.fromEntries(
  Object.entries(bannerModules).map(([path, url]) => [path.split('/').pop(), url])
)

export const partnerLogos = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/partners/*.png', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.split('/').pop(), url])
)

export const honorImages = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/honors/honor-*.jpg', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.split('/').pop(), url])
)

const ol2iModules = import.meta.glob('../assets/products/yk-ol-2i/*.png', { eager: true, import: 'default' })
export const ol2iGallery = Object.keys(ol2iModules).sort().map((k) => ol2iModules[k])
// 画廊按文件名(1.png...)索引
export const ol2iGalleryByName = Object.fromEntries(
  Object.entries(ol2iModules).map(([path, url]) => [path.split('/').pop(), url])
)

// 双轨解析:根路径/绝对 URL(后端上传图,如 /uploads/img-xxx.png)原样返回;否则查素材映射
export function resolveImage(value, map) {
  if (!value) return value
  if (/^(https?:)?\/\//.test(value) || value.startsWith('/')) return value
  return map[value]
}
