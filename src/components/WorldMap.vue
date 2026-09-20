<template>
  <div ref="el" class="world-map"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts/core'
import { GeoComponent } from 'echarts/components'
import { ScatterChart } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
import worldTopo from 'world-atlas/countries-110m.json'
import { feature } from 'topojson-client'

echarts.use([GeoComponent, ScatterChart, SVGRenderer])

// Natural Earth 公有领域数据(world-atlas),注册一次即可
// Natural Earth 公有领域数据(world-atlas),注册一次即可;
// 剔除南极洲;丢弃跨 180° 经线的环(斐济/俄罗斯楚科奇),避免 ECharts 画出横贯线伪影
const worldGeo = feature(worldTopo, worldTopo.objects.countries);
const ringSpan = (ring) => {
  let minX = 1e9, maxX = -1e9;
  for (const [lon] of ring) { minX = Math.min(minX, lon); maxX = Math.max(maxX, lon); }
  return maxX - minX;
};
const cleanPolygon = (poly) => poly.filter((ring) => ringSpan(ring) < 300);
const cleanGeom = (geom) => {
  if (geom.type === 'Polygon') { const rings = cleanPolygon(geom.coordinates); return rings.length ? { ...geom, coordinates: rings } : null; }
  if (geom.type === 'MultiPolygon') {
    const polys = geom.coordinates.map(cleanPolygon).filter((p) => p.length);
    return polys.length ? { ...geom, coordinates: polys } : null;
  }
  return geom;
};
worldGeo.features = worldGeo.features
  .filter((f) => f.properties?.name !== 'Antarctica')
  .map((f) => ({ ...f, geometry: cleanGeom(f.geometry) }))
  .filter((f) => f.geometry);
echarts.registerMap('world', worldGeo)

const { locale, t } = useI18n()
const el = ref(null)
let chart = null
let resizeObserver = null

// 服务覆盖点:经纬度由 ECharts 投影,位置天然精确且随缩放对齐
const locations = () => [
  { key: 'shanghai', value: [121.47, 31.23] },
  { key: 'usa', value: [-98, 39] },
  { key: 'egypt', value: [30, 26.5] },
  { key: 'india', value: [79, 22] },
  { key: 'malaysia', value: [101.7, 3.1] },
]

function buildOption() {
  return {
    geo: {
      map: 'world',
      roam: false,
      silent: false,
      layoutCenter: ['50%', '50%'],
      layoutSize: '100%',
      itemStyle: {
        areaColor: '#8fdcb1',
        borderColor: '#ffffff',
        borderWidth: 0.6,
      },
      emphasis: {
        disabled: true,
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 12,
        itemStyle: { color: '#00a651', borderColor: '#ffffff', borderWidth: 1.5 },
        label: {
          show: true,
          position: 'right',
          distance: 8,
          formatter: (p) => p.name,
          color: '#00a651',
          fontSize: 13,
          fontWeight: 600,
          textBorderColor: 'rgba(255,255,255,0.9)',
          textBorderWidth: 3,
        },
        data: locations().map((loc) => ({
          name: t(`home.partners.locations.${loc.key}`),
          value: loc.value,
        })),
      },
    ],
  }
}

onMounted(() => {
  chart = echarts.init(el.value, null, { renderer: 'svg' })
  chart.setOption(buildOption())
  resizeObserver = new ResizeObserver(() => chart?.resize())
  resizeObserver.observe(el.value)
})

// 语言切换:仅刷新标记标签文字
watch(locale, () => {
  chart?.setOption(buildOption())
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
  chart = null
})
</script>

<style scoped>
.world-map {
  width: 100%;
  max-width: 980px;
  height: auto;
  aspect-ratio: 1000 / 500;
  margin: 0 auto;
}
</style>
