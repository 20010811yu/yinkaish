<template>
  <div>
    <div class="bar">
      <h2>{{ $t('admin.menu.news') }}</h2>
      <el-button type="primary" data-testid="news-add" @click="openAdd">{{ $t('admin.common.add') }}</el-button>
    </div>

    <el-table :data="rows" v-loading="loading" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="news_date" :label="$t('admin.fields.date')" width="110" />
      <el-table-column prop="tag_zh" :label="$t('admin.fields.tag')" width="110" />
      <el-table-column prop="title_zh" :label="$t('admin.fields.titleZh')" min-width="200" show-overflow-tooltip />
      <el-table-column prop="title_en" :label="$t('admin.fields.titleEn')" min-width="200" show-overflow-tooltip />
      <el-table-column :label="$t('admin.fields.published')" width="90">
        <template #default="{ row }">
          <el-switch :model-value="!!row.is_published" @change="(v) => toggle(row, v)" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('admin.fields.actions')" width="140" fixed="right">
        <template #default="{ row }">
          <el-button text type="primary" @click="openEdit(row)">{{ $t('admin.common.edit') }}</el-button>
          <el-button text type="danger" @click="remove(row)">{{ $t('admin.common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dlg" :title="form.id ? $t('admin.common.edit') : $t('admin.common.add')" width="720px" top="6vh">
      <el-form :model="form" label-width="90px">
        <div class="grid2">
          <el-form-item :label="$t('admin.fields.tagZh')"><el-input v-model="form.tag_zh" /></el-form-item>
          <el-form-item :label="$t('admin.fields.tagEn')"><el-input v-model="form.tag_en" /></el-form-item>
        </div>
        <el-form-item :label="$t('admin.fields.date')">
          <el-date-picker v-model="form.news_date" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item :label="$t('admin.fields.titleZh')"><el-input v-model="form.title_zh" /></el-form-item>
        <el-form-item :label="$t('admin.fields.titleEn')"><el-input v-model="form.title_en" /></el-form-item>
        <el-form-item :label="$t('admin.fields.summaryZh')"><el-input v-model="form.summary_zh" type="textarea" :rows="2" /></el-form-item>
        <el-form-item :label="$t('admin.fields.summaryEn')"><el-input v-model="form.summary_en" type="textarea" :rows="2" /></el-form-item>
        <el-form-item :label="$t('admin.fields.contentZh')"><el-input v-model="form.content_zh" type="textarea" :rows="6" /></el-form-item>
        <el-form-item :label="$t('admin.fields.contentEn')"><el-input v-model="form.content_en" type="textarea" :rows="6" /></el-form-item>
        <el-form-item :label="$t('admin.fields.published')">
          <el-switch v-model="form.is_published" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dlg = false">{{ $t('admin.common.cancel') }}</el-button>
        <el-button type="primary" :loading="saving" data-testid="news-save" @click="save">{{ $t('admin.common.save') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from '../../api/admin'

const { t } = useI18n()
const rows = ref([])
const loading = ref(false)
const saving = ref(false)
const dlg = ref(false)
const form = reactive({})

const empty = {
  id: 0, tag_zh: '', tag_en: '', news_date: new Date().toISOString().slice(0, 10),
  title_zh: '', title_en: '', summary_zh: '', summary_en: '', content_zh: '', content_en: '', is_published: 1,
}

const load = async () => {
  loading.value = true
  try {
    rows.value = (await adminApi.list('news')).news
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    loading.value = false
  }
}

const openAdd = () => {
  Object.assign(form, empty)
  dlg.value = true
}

const openEdit = (row) => {
  Object.assign(form, empty, row)
  dlg.value = true
}

const save = async () => {
  if (!form.title_zh || !form.title_en) {
    ElMessage.warning(t('admin.rule.titleRequired'))
    return
  }
  saving.value = true
  try {
    if (form.id) await adminApi.update('news', form.id, form)
    else await adminApi.create('news', form)
    ElMessage.success(t('admin.common.saved'))
    dlg.value = false
    await load()
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    saving.value = false
  }
}

const toggle = async (row, v) => {
  try {
    await adminApi.update('news', row.id, { is_published: v ? 1 : 0 })
    row.is_published = v ? 1 : 0
  } catch (err) {
    ElMessage.error(err.message)
  }
}

const remove = async (row) => {
  try {
    await ElMessageBox.confirm(t('admin.rule.confirmDelete'), t('admin.common.warning'), { type: 'warning' })
  } catch { return }
  try {
    await adminApi.remove('news', row.id)
    ElMessage.success(t('admin.common.deleted'))
    await load()
  } catch (err) {
    ElMessage.error(err.message)
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
.bar h2 {
  margin: 0;
  font-size: 18px;
}
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}
</style>
