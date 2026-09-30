<template>
  <div>
    <div class="bar">
      <h2>{{ $t('admin.menu.honors') }}</h2>
      <el-button type="primary" @click="openAdd">{{ $t('admin.common.add') }}</el-button>
    </div>

    <el-table :data="rows" v-loading="loading" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column :label="$t('admin.fields.image')" width="90">
        <template #default="{ row }">
          <el-image v-if="urlOf(row.image)" :src="urlOf(row.image)" fit="contain" style="width: 56px; height: 40px" />
          <span v-else>{{ row.image }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name_zh" :label="$t('admin.fields.nameZh')" min-width="160" show-overflow-tooltip />
      <el-table-column prop="sort" :label="$t('admin.fields.sort')" width="80" />
      <el-table-column :label="$t('admin.fields.actions')" width="140" fixed="right">
        <template #default="{ row }">
          <el-button text type="primary" @click="openEdit(row)">{{ $t('admin.common.edit') }}</el-button>
          <el-button text type="danger" @click="remove(row)">{{ $t('admin.common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dlg" :title="form.id ? $t('admin.common.edit') : $t('admin.common.add')" width="640px">
      <el-form :model="form" label-width="90px">
        <el-form-item :label="$t('admin.fields.nameZh')"><el-input v-model="form.name_zh" /></el-form-item>
        <el-form-item :label="$t('admin.fields.image')">
          <el-upload
            :action="uploadAction"
            :headers="uploadHeaders"
            name="file"
            accept="image/png,image/jpeg,image/webp"
            :show-file-list="false"
            :before-upload="beforeImageUpload"
            :on-success="(res) => (form.image = res.url)"
            :on-error="onUploadError"
          >
            <el-button type="primary" plain>{{ $t('admin.fields.uploadHonor') }}</el-button>
          </el-upload>
          <el-select v-model="form.image" filterable allow-create :placeholder="$t('admin.fields.orFromAssets')" style="width: 100%; margin-top: 6px">
            <el-option v-for="f in imageOptions" :key="f" :label="f" :value="f" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="urlOf(form.image)" :label="$t('admin.fields.preview')">
          <el-image
            :src="urlOf(form.image)"
            :preview-src-list="[urlOf(form.image)]"
            preview-teleported
            fit="contain"
            class="honor-preview"
          />
        </el-form-item>
        <el-form-item :label="$t('admin.fields.descZh')"><el-input v-model="form.desc_zh" type="textarea" :rows="2" /></el-form-item>
        <el-form-item :label="$t('admin.fields.sort')"><el-input-number v-model="form.sort" :min="0" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dlg = false">{{ $t('admin.common.cancel') }}</el-button>
        <el-button type="primary" :loading="saving" @click="save">{{ $t('admin.common.save') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from '../../api/admin'
import { useImageUpload } from '../../composables/useImageUpload'
import { honorImages } from '../../data/assets'

const { t } = useI18n()
const rows = ref([])
const loading = ref(false)
const saving = ref(false)
const dlg = ref(false)
const form = reactive({})
const imageOptions = Object.keys(honorImages).sort()
// 双轨解析:素材文件名走打包映射,/uploads 上传路径原样显示
const urlOf = (name) => honorImages[name] || (name && name.startsWith('/') ? name : null)
const { uploadAction, uploadHeaders, beforeImageUpload, onUploadError } = useImageUpload()

const empty = { id: 0, name_zh: '', desc_zh: '', image: '', sort: 0 }

const load = async () => {
  loading.value = true
  try {
    rows.value = (await adminApi.list('honors')).honors
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
  if (!form.name_zh) {
    ElMessage.warning(t('admin.rule.nameRequired'))
    return
  }
  saving.value = true
  try {
    if (form.id) await adminApi.update('honors', form.id, form)
    else await adminApi.create('honors', form)
    ElMessage.success(t('admin.common.saved'))
    dlg.value = false
    await load()
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    saving.value = false
  }
}

const remove = async (row) => {
  try {
    await ElMessageBox.confirm(t('admin.rule.confirmDelete'), t('admin.common.warning'), { type: 'warning' })
  } catch { return }
  try {
    await adminApi.remove('honors', row.id)
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
/* 证书预览:加高完整显示(证书多为竖版),点击放大 */
.honor-preview {
  width: 100%;
  height: 240px;
  background: var(--el-fill-color-light, #f5f7fa);
  border-radius: 4px;
  cursor: zoom-in;
}
</style>
