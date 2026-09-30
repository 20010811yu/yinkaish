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

    <el-dialog v-model="dlg" :title="form.id ? $t('admin.common.edit') : $t('admin.common.add')" width="720px" top="4vh" class="news-dlg">
      <el-form :model="form" label-width="90px">
        <el-form-item :label="$t('admin.fields.tagZh')">
          <el-select v-model="form.tag_zh" filterable allow-create default-first-option :placeholder="$t('admin.fields.tagHint')" style="width: 100%">
            <el-option v-for="t in tagOptions" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('admin.fields.date')">
          <el-date-picker v-model="form.news_date" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item :label="$t('admin.fields.titleZh')"><el-input v-model="form.title_zh" /></el-form-item>
        <el-form-item :label="$t('admin.fields.summaryZh')"><el-input v-model="form.summary_zh" type="textarea" :rows="2" /></el-form-item>
        <el-form-item :label="$t('admin.fields.contentZh')"><RichEditor v-model="form.content_zh" /></el-form-item>
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
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from '../../api/admin'
import RichEditor from '../../components/admin/RichEditor.vue'

const { t } = useI18n()
const rows = ref([])
const loading = ref(false)
const saving = ref(false)
const dlg = ref(false)
const form = reactive({})

// 分类下拉选项:现有新闻分类去重(选择或手动输入新分类均可用)
const tagOptions = computed(() => [...new Set(rows.value.map((r) => r.tag_zh).filter(Boolean))].sort())

const empty = {
  id: 0, tag_zh: '', news_date: new Date().toISOString().slice(0, 10),
  title_zh: '', summary_zh: '', content_zh: '', is_published: 1,
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
  if (!form.title_zh) {
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
/* 富文本编辑器使弹框变高:矮视口下限制总高,表体内部滚动,保证底部按钮可达 */
.news-dlg {
  max-height: 92vh;
  display: flex;
  flex-direction: column;
}
.news-dlg :deep(.el-dialog__body) {
  overflow-y: auto;
}
</style>
