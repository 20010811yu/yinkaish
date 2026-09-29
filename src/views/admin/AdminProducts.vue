<template>
  <div>
    <div class="bar">
      <h2>{{ $t('admin.menu.products') }}</h2>
      <el-button type="primary" @click="openCatAdd">{{ $t('admin.rule.addCategory') }}</el-button>
    </div>

    <!-- 分类列表 -->
    <el-table :data="cats" v-loading="loading" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="slug" label="Slug" width="110" />
      <el-table-column prop="name_zh" :label="$t('admin.fields.nameZh')" min-width="180" show-overflow-tooltip />
      <el-table-column prop="name_en" :label="$t('admin.fields.nameEn')" min-width="180" show-overflow-tooltip />
      <el-table-column prop="sort" :label="$t('admin.fields.sort')" width="70" />
      <el-table-column :label="$t('admin.fields.actions')" width="230" fixed="right">
        <template #default="{ row }">
          <el-button text type="primary" @click="openCatEdit(row)">{{ $t('admin.common.edit') }}</el-button>
          <el-button text type="success" @click="openProdAdd(row)">{{ $t('admin.rule.addProduct') }}</el-button>
          <el-button text type="danger" @click="removeCat(row)">{{ $t('admin.common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分类下产品列表 -->
    <template v-for="cat in cats" :key="cat.id">
      <div class="subbar">
        <h3>{{ cat.name_zh }} / {{ cat.name_en }}</h3>
        <el-button size="small" type="primary" plain @click="openProdAdd(cat)">{{ $t('admin.rule.addProduct') }}</el-button>
      </div>
      <el-table :data="productsOf(cat)" size="small" border>
        <el-table-column prop="model" :label="$t('admin.fields.model')" width="140" />
        <el-table-column prop="tag_zh" :label="$t('admin.fields.tag')" width="120" />
        <el-table-column prop="image" :label="$t('admin.fields.image')" min-width="180" show-overflow-tooltip />
        <el-table-column prop="sort" :label="$t('admin.fields.sort')" width="70" />
        <el-table-column :label="$t('admin.fields.actions')" width="200" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="openProdEdit(row)">{{ $t('admin.common.edit') }}</el-button>
            <el-button text type="warning" size="small" @click="openParams(row)">{{ $t('admin.rule.params') }}</el-button>
            <el-button text type="danger" size="small" @click="removeProd(row)">{{ $t('admin.common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分类编辑弹框 -->
    <el-dialog v-model="catDlg" :title="$t('admin.rule.category')" width="640px">
      <el-form :model="catForm" label-width="90px">
        <el-form-item label="Slug"><el-input v-model="catForm.slug" /></el-form-item>
        <div class="grid2">
          <el-form-item :label="$t('admin.fields.nameZh')"><el-input v-model="catForm.name_zh" /></el-form-item>
          <el-form-item :label="$t('admin.fields.nameEn')"><el-input v-model="catForm.name_en" /></el-form-item>
        </div>
        <el-form-item :label="$t('admin.fields.descZh')"><el-input v-model="catForm.desc_zh" type="textarea" :rows="2" /></el-form-item>
        <el-form-item :label="$t('admin.fields.descEn')"><el-input v-model="catForm.desc_en" type="textarea" :rows="2" /></el-form-item>
        <el-form-item :label="$t('admin.fields.sort')"><el-input-number v-model="catForm.sort" :min="0" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="catDlg = false">{{ $t('admin.common.cancel') }}</el-button>
        <el-button type="primary" :loading="saving" @click="saveCat">{{ $t('admin.common.save') }}</el-button>
      </template>
    </el-dialog>

    <!-- 产品编辑弹框 -->
    <el-dialog v-model="prodDlg" :title="$t('admin.rule.product')" width="680px" top="6vh">
      <el-form :model="prodForm" label-width="90px">
        <div class="grid2">
          <el-form-item :label="$t('admin.fields.model')"><el-input v-model="prodForm.model" /></el-form-item>
          <el-form-item :label="$t('admin.fields.sort')"><el-input-number v-model="prodForm.sort" :min="0" /></el-form-item>
          <el-form-item :label="$t('admin.fields.tagZh')"><el-input v-model="prodForm.tag_zh" /></el-form-item>
          <el-form-item :label="$t('admin.fields.tagEn')"><el-input v-model="prodForm.tag_en" /></el-form-item>
        </div>
        <el-form-item :label="$t('admin.fields.image')">
          <el-select v-model="prodForm.image" filterable allow-create style="width: 100%">
            <el-option v-for="f in bannerOptions" :key="f" :label="f" :value="f" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="urlOf(prodForm.image)" :label="$t('admin.fields.preview')">
          <el-image :src="urlOf(prodForm.image)" fit="contain" style="max-height: 100px" />
        </el-form-item>
        <el-form-item :label="$t('admin.rule.gallery')">
          <el-select v-model="prodForm.gallery" multiple filterable allow-create style="width: 100%">
            <el-option v-for="f in galleryOptions" :key="f" :label="f" :value="f" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('admin.fields.descZh')"><el-input v-model="prodForm.desc_zh" type="textarea" :rows="4" /></el-form-item>
        <el-form-item :label="$t('admin.fields.descEn')"><el-input v-model="prodForm.desc_en" type="textarea" :rows="4" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="prodDlg = false">{{ $t('admin.common.cancel') }}</el-button>
        <el-button type="primary" :loading="saving" @click="saveProd">{{ $t('admin.common.save') }}</el-button>
      </template>
    </el-dialog>

    <!-- 参数编辑弹框 -->
    <el-dialog v-model="paramDlg" :title="$t('admin.rule.params') + ' - ' + (paramProd?.model || '')" width="860px" top="6vh">
      <el-table :data="paramRows" size="small" border>
        <el-table-column :label="$t('admin.fields.labelZh')" min-width="150">
          <template #default="{ row }"><el-input v-model="row.label_zh" size="small" /></template>
        </el-table-column>
        <el-table-column :label="$t('admin.fields.labelEn')" min-width="150">
          <template #default="{ row }"><el-input v-model="row.label_en" size="small" /></template>
        </el-table-column>
        <el-table-column :label="$t('admin.fields.valueZh')" min-width="180">
          <template #default="{ row }"><el-input v-model="row.value_zh" size="small" /></template>
        </el-table-column>
        <el-table-column :label="$t('admin.fields.valueEn')" min-width="180">
          <template #default="{ row }"><el-input v-model="row.value_en" size="small" /></template>
        </el-table-column>
        <el-table-column :label="$t('admin.fields.actions')" width="70">
          <template #default="{ $index }">
            <el-button text type="danger" size="small" @click="paramRows.splice($index, 1)">{{ $t('admin.common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="addrow" size="small" @click="paramRows.push({ label_zh: '', label_en: '', value_zh: '', value_en: '' })">
        {{ $t('admin.rule.addParamRow') }}
      </el-button>
      <template #footer>
        <el-button @click="paramDlg = false">{{ $t('admin.common.cancel') }}</el-button>
        <el-button type="primary" :loading="saving" @click="saveParams">{{ $t('admin.common.save') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from '../../api/admin'
import { productBanners, ol2iGalleryByName } from '../../data/assets'

const { t } = useI18n()
const cats = ref([])
const products = ref([])
const loading = ref(false)
const saving = ref(false)

const bannerOptions = Object.keys(productBanners).sort()
const galleryOptions = Object.keys(ol2iGalleryByName).sort()
const urlOf = (name) => productBanners[name] || null

const productsOf = (cat) => products.value.filter((p) => p.category_id === cat.id)

/* ---- 分类 ---- */
const catDlg = ref(false)
const catForm = reactive({})
const emptyCat = { id: 0, slug: '', name_zh: '', name_en: '', desc_zh: '', desc_en: '', sort: 0 }

const openCatAdd = () => {
  Object.assign(catForm, emptyCat)
  catDlg.value = true
}
const openCatEdit = (row) => {
  Object.assign(catForm, emptyCat, row)
  catDlg.value = true
}
const saveCat = async () => {
  if (!catForm.slug || !catForm.name_zh) {
    ElMessage.warning(t('admin.rule.categoryRequired'))
    return
  }
  saving.value = true
  try {
    if (catForm.id) await adminApi.update('product-categories', catForm.id, catForm)
    else await adminApi.create('product-categories', catForm)
    ElMessage.success(t('admin.common.saved'))
    catDlg.value = false
    await load()
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    saving.value = false
  }
}
const removeCat = async (row) => {
  if (productsOf(row).length) {
    ElMessage.warning(t('admin.rule.categoryNotEmpty'))
    return
  }
  try {
    await ElMessageBox.confirm(t('admin.rule.confirmDelete'), t('admin.common.warning'), { type: 'warning' })
  } catch { return }
  try {
    await adminApi.remove('product-categories', row.id)
    ElMessage.success(t('admin.common.deleted'))
    await load()
  } catch (err) {
    ElMessage.error(err.message)
  }
}

/* ---- 产品 ---- */
const prodDlg = ref(false)
const prodForm = reactive({})
const emptyProd = { id: 0, category_id: 0, model: '', tag_zh: '', tag_en: '', image: '', gallery: [], desc_zh: '', desc_en: '', sort: 0 }

const openProdAdd = (cat) => {
  Object.assign(prodForm, emptyProd, { category_id: cat.id, sort: productsOf(cat).length + 1 })
  prodDlg.value = true
}
const openProdEdit = (row) => {
  const g = row.gallery
  Object.assign(prodForm, emptyProd, row, { gallery: g ? (typeof g === 'string' ? JSON.parse(g) : g) : [] })
  prodDlg.value = true
}
const saveProd = async () => {
  if (!prodForm.model || !prodForm.image) {
    ElMessage.warning(t('admin.rule.productRequired'))
    return
  }
  saving.value = true
  try {
    if (prodForm.id) await adminApi.update('products', prodForm.id, prodForm)
    else await adminApi.create('products', prodForm)
    ElMessage.success(t('admin.common.saved'))
    prodDlg.value = false
    await load()
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    saving.value = false
  }
}
const removeProd = async (row) => {
  try {
    await ElMessageBox.confirm(t('admin.rule.confirmDeleteParams'), t('admin.common.warning'), { type: 'warning' })
  } catch { return }
  try {
    await adminApi.remove('products', row.id)
    ElMessage.success(t('admin.common.deleted'))
    await load()
  } catch (err) {
    ElMessage.error(err.message)
  }
}

/* ---- 参数 ---- */
const paramDlg = ref(false)
const paramProd = ref(null)
const paramRows = ref([])

const openParams = async (row) => {
  paramProd.value = row
  try {
    paramRows.value = (await adminApi.params(row.id)).params
  } catch (err) {
    ElMessage.error(err.message)
    return
  }
  paramDlg.value = true
}
const saveParams = async () => {
  saving.value = true
  try {
    await adminApi.saveParams(paramProd.value.id, paramRows.value)
    ElMessage.success(t('admin.common.saved'))
    paramDlg.value = false
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    saving.value = false
  }
}

/* ---- 加载 ---- */
const load = async () => {
  loading.value = true
  try {
    const [c, p] = await Promise.all([adminApi.list('product-categories'), adminApi.list('products')])
    cats.value = c['product-categories']
    products.value = p.products
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.bar h2,
.subbar h3 {
  margin: 0;
}
.bar h2 {
  font-size: 18px;
}
.subbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0 8px;
}
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}
.addrow {
  margin-top: 10px;
}
</style>
