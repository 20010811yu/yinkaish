import { onBeforeUnmount, onMounted } from 'vue'

// [data-reveal] 滚动入场观察器(每次进入视口重播,离开复位;尊重 prefers-reduced-motion)
export function useReveal() {
  let observer = null

  onMounted(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('revealed'))
      return
    }
    observer = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('revealed', e.isIntersecting)
    }, { threshold: 0.18 })
    els.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
