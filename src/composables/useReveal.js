import { onBeforeUnmount, onMounted } from 'vue'

// [data-reveal] 滚动入场观察器(每次进入视口重播,离开复位;尊重 prefers-reduced-motion)
// v-for 翻页等场景会渲染新的 [data-reveal] 节点,需在 DOM 更新后调用返回的 rescan 纳入观察
export function useReveal() {
  let observer = null
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const observeEl = (el) => {
    if (el.dataset.revealBound) return
    el.dataset.revealBound = '1'
    if (reduced()) {
      el.classList.add('revealed')
      return
    }
    observer?.observe(el)
  }

  const rescan = () => {
    document.querySelectorAll('[data-reveal]').forEach(observeEl)
  }

  onMounted(() => {
    if (!reduced()) {
      observer = new IntersectionObserver((entries) => {
        for (const e of entries) e.target.classList.toggle('revealed', e.isIntersecting)
      }, { threshold: 0.18 })
    }
    rescan()
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { rescan }
}
