<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('services.title') }}</h1>
        <p class="section-subtitle">{{ $t('services.subtitle') }}</p>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container svc-layout">
        <!-- 左侧:产品列表栏(桌面常开,手机手风琴) -->
        <aside class="svc-side">
          <div v-for="cat in productCategories" :key="cat.id" class="svc-group" :class="{ 'svc-group--open': isCatOpen(cat.id) }">
            <button class="svc-group__head" type="button" @click="toggleCat(cat.id)">
              <span>{{ pick(cat.name, locale) }}</span>
              <span class="svc-group__count">{{ cat.products.length }}</span>
            </button>
            <ul class="svc-group__list">
              <li v-for="prod in cat.products" :key="prod.model">
                <button
                  class="svc-item"
                  :class="{ 'svc-item--active': selected.model === prod.model }"
                  type="button"
                  @click="select(cat, prod)"
                >
                  <span class="svc-item__model">{{ prod.model }}</span>
                  <span class="svc-item__tag">{{ pick(prod.tag, locale) }}</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <!-- 右侧:产品详情(大图 + 简介 + 参数表格) -->
        <div class="svc-detail">
          <div class="detail-fig">
            <img :src="selectedProd.image" :alt="selectedProd.model" />
          </div>
          <div class="detail-head">
            <span class="detail-cat">{{ pick(selectedCat.name, locale) }}</span>
            <div class="detail-title-row">
              <h2>{{ selectedProd.model }}</h2>
              <span class="detail-tag">{{ pick(selectedProd.tag, locale) }}</span>
            </div>
            <p class="detail-desc">{{ pick(selectedProd.desc, locale) }}</p>
          </div>

          <div class="detail-params">
            <div class="params-head">
              <span>{{ $t('services.paramsTitle') }}</span>
              <span class="params-head__en">EQUIPMENT PARAMETERS</span>
            </div>
            <table class="params-table">
              <tbody>
                <tr v-for="(row, i) in currentParams" :key="i">
                  <th>{{ pick(row.label, locale) }}</th>
                  <td>{{ pick(row.value, locale) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2>{{ $t('services.ctaTitle') }}</h2>
        <p>{{ $t('services.ctaDesc') }}</p>
        <el-button type="primary" size="large" round @click="$router.push('/contact')">
          {{ $t('services.ctaBtn') }}
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { productCategories, productParams } from '../data'
import { pick } from '../data/lang'

const { locale } = useI18n()

const selected = ref({ catId: productCategories[0].id, model: productCategories[0].products[0].model })
// 手机手风琴:默认展开选中分类,桌面端该状态无效果(样式常开)
const openCat = ref(productCategories[0].id)

const selectedCat = computed(() => productCategories.find((c) => c.id === selected.value.catId))
const selectedProd = computed(() => selectedCat.value.products.find((x) => x.model === selected.value.model))
const currentParams = computed(() => productParams[selectedProd.value.model.replaceAll('-', '')] ?? productParams[selectedProd.value.model] ?? [])

const select = (cat, prod) => {
  selected.value = { catId: cat.id, model: prod.model }
  openCat.value = cat.id
}
const toggleCat = (id) => {
  openCat.value = openCat.value === id ? '' : id
}
const isCatOpen = (id) => openCat.value === id
</script>

<style scoped>
.svc-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 36px;
  align-items: start;
}

/* ---------- 左侧列表栏 ---------- */
.svc-side {
  position: sticky;
  top: 108px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.svc-group {
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.svc-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 13px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--c-text);
  text-align: left;
}

.svc-group__count {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-primary);
  background: var(--c-primary-light);
  border-radius: 999px;
  padding: 1px 9px;
}

.svc-group__list {
  display: none;
  flex-direction: column;
  padding: 0 8px 8px;
}

.svc-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  color: var(--c-text-secondary);
  transition: background 0.15s, color 0.15s;
}

.svc-item:hover {
  background: var(--c-bg-soft);
  color: var(--c-primary);
}

.svc-item--active {
  background: var(--c-primary-light);
  color: var(--c-primary);
  font-weight: 700;
}

.svc-item__model {
  font-size: 0.9375rem;
}

.svc-item__tag {
  font-size: 0.75rem;
  white-space: nowrap;
}

/* ---------- 右侧详情 ---------- */
.svc-detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.detail-fig {
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.detail-fig img {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: contain;
  padding: 28px;
  display: block;
}

.detail-head {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-cat {
  align-self: flex-start;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--c-primary);
  background: var(--c-primary-light);
  border-radius: 999px;
  padding: 3px 14px;
}

.detail-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.detail-title-row h2 {
  font-size: clamp(24px, 2.4vw, 32px);
  color: var(--c-primary);
  letter-spacing: 1px;
}

.detail-tag {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--c-primary);
  border: 1px solid var(--c-primary);
  border-radius: 999px;
  padding: 3px 14px;
}

.detail-desc {
  color: var(--c-text-secondary);
  line-height: 1.8;
}

/* ---------- 参数表格 ---------- */
.params-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  background: linear-gradient(90deg, var(--c-primary-dark), var(--c-primary));
  color: #fff;
  border-radius: var(--radius) var(--radius) 0 0;
  padding: 12px 18px;
  font-size: 1.0625rem;
  font-weight: 700;
}

.params-head__en {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.75;
  letter-spacing: 1px;
}

.params-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid var(--c-border);
  border-top: none;
  border-radius: 0 0 var(--radius) var(--radius);
  overflow: hidden;
}

.params-table th,
.params-table td {
  padding: 10px 18px;
  font-size: 0.875rem;
  text-align: left;
}

.params-table tr:nth-child(odd) {
  background: var(--c-bg-soft);
}

.params-table th {
  width: 42%;
  font-weight: 600;
  color: var(--c-text);
}

.params-table td {
  color: var(--c-text-secondary);
}

/* ---------- 手风琴(≤768px):分类可折叠,列表在上 ---------- */
@media (max-width: 768px) {
  .svc-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .svc-side {
    position: static;
  }

  .svc-group--open .svc-group__list {
    display: flex;
  }
}

/* ---------- 平板收窄 ---------- */
@media (min-width: 769px) and (max-width: 1024px) {
  .svc-layout {
    grid-template-columns: 250px 1fr;
    gap: 24px;
  }
}

/* 桌面端列表常开 */
@media (min-width: 769px) {
  .svc-group__list {
    display: flex;
  }
}
</style>
