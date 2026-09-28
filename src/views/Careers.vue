<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('careers.title') }}</h1>
        <p class="section-subtitle">{{ $t('careers.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="jobs">
          <el-card v-for="j in jobs" :key="j.id" shadow="hover" class="job" :class="{ 'job--open': expanded.has(j.id) }">
            <div class="job__row" @click="toggle(j.id)">
              <div>
                <h3>{{ pick(j.title, locale) }}</h3>
                <p class="job__meta">
                  <el-tag size="small" effect="plain">{{ pick(j.dept, locale) }}</el-tag>
                  <el-tag size="small" effect="plain" type="info">{{ pick(j.location, locale) }}</el-tag>
                </p>
              </div>
              <div class="job__actions">
                <el-button type="primary" round @click.stop="apply(j)">{{ $t('careers.apply') }}</el-button>
                <el-icon class="job__chevron" :class="{ 'job__chevron--open': expanded.has(j.id) }"><ArrowDown /></el-icon>
              </div>
            </div>
            <div class="job__detail" :class="{ 'job__detail--open': expanded.has(j.id) }">
              <div class="job__detail-inner">
                <p v-for="(line, li) in pick(j.desc, locale).split('\n')" :key="li">{{ line }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">{{ $t('careers.welfareTitle') }}</h2>
        </div>
        <div class="welfares">
          <div v-for="(w, i) in welfares" :key="i" class="welfare">
            <el-icon :size="26" color="var(--c-primary)"><component :is="icons[w.icon]" /></el-icon>
            <span>{{ pick(w.text, locale) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 申请职位弹框:个人信息 + 简历附件(Netlify Forms) -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="min(92vw, 520px)" @closed="onDialogClosed">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="apply-form">
        <el-form-item :label="$t('careers.form.position')">
          <el-input :model-value="currentJob ? pick(currentJob.title, locale) : ''" disabled />
        </el-form-item>
        <el-form-item :label="$t('careers.form.name')" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item :label="$t('careers.form.phone')" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item :label="$t('careers.form.email')" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item :label="$t('careers.form.resume')" prop="resume">
          <el-upload :auto-upload="false" :show-file-list="false" accept=".pdf,.doc,.docx" :on-change="onResumeChange">
            <el-button>{{ $t('careers.form.selectFile') }}</el-button>
            <template #tip>
              <div class="apply-form__tip">{{ $t('careers.form.resumeTip') }}</div>
              <div v-if="resumeFile" class="apply-form__file">
                <el-icon><Document /></el-icon>
                <span>{{ resumeFile.name }}</span>
                <el-icon class="apply-form__file-x" @click="removeResume"><Close /></el-icon>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('careers.form.message')" prop="message">
          <el-input v-model="form.message" type="textarea" :rows="4" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button round @click="dialogVisible = false">{{ $t('careers.form.cancel') }}</el-button>
        <el-button type="primary" round :loading="submitting" @click="submit">{{ $t('careers.form.submit') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>


<script setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Opportunity, Coin, Umbrella, AlarmClock, Reading, Watermelon, ArrowDown, Document, Close,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { jobs, welfares } from '../data'
import { pick } from '../data/lang'

const { locale, t } = useI18n()

const icons = { Opportunity, Coin, Umbrella, AlarmClock, Reading, Watermelon }

// 展开的职位 id 集合(可同时展开多个)
const expanded = ref(new Set())

const toggle = (id) => {
  const next = new Set(expanded.value)
  next.has(id) ? next.delete(id) : next.add(id)
  expanded.value = next
}

/* ---- 申请职位弹框 ---- */
const dialogVisible = ref(false)
const currentJob = ref(null)
const formRef = ref()
const submitting = ref(false)
const resumeFile = ref(null) // 简历原始 File 对象
const MAX_RESUME_SIZE = 10 * 1024 * 1024 // Netlify 单次提交上限

const form = reactive({ name: '', phone: '', email: '', resume: '', message: '' })

const dialogTitle = computed(() =>
  currentJob.value
    ? t('careers.form.title', { position: pick(currentJob.value.title, locale.value) })
    : t('careers.apply')
)

// message 用函数保证语言切换后校验提示跟随
const rules = {
  name: [{ required: true, message: () => t('careers.form.name'), trigger: 'blur' }],
  phone: [
    { required: true, message: () => t('careers.form.phone'), trigger: 'blur' },
    { pattern: /^[+()\d\s-]{5,20}$/, message: () => t('careers.form.phone'), trigger: 'blur' },
  ],
  email: [{ type: 'email', message: () => t('careers.form.email'), trigger: 'blur' }],
  resume: [{ required: true, message: () => t('careers.form.resume'), trigger: 'change' }],
}

const apply = (j) => {
  currentJob.value = j
  dialogVisible.value = true
}

const onResumeChange = (uploadFile) => {
  const raw = uploadFile?.raw
  if (!raw) return
  if (!/\.(pdf|docx?)$/i.test(raw.name)) {
    ElMessage.error(t('careers.form.resumeType'))
    return
  }
  if (raw.size > MAX_RESUME_SIZE) {
    ElMessage.error(t('careers.form.resumeSize'))
    return
  }
  resumeFile.value = raw
  form.resume = raw.name
  formRef.value?.clearValidate('resume')
}

const removeResume = () => {
  resumeFile.value = null
  form.resume = ''
  formRef.value?.clearValidate('resume')
}

const onDialogClosed = () => {
  formRef.value?.resetFields()
  resumeFile.value = null
}

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      // 附件走 multipart:用 FormData,不手动设 Content-Type(浏览器自带 boundary)
      const fd = new FormData()
      fd.set('form-name', 'job')
      fd.set('position', pick(currentJob.value.title, locale.value))
      fd.set('name', form.name)
      fd.set('phone', form.phone)
      fd.set('email', form.email)
      fd.set('message', form.message)
      fd.set('resume', resumeFile.value, resumeFile.value.name)
      const res = await fetch('/', { method: 'POST', body: fd })
      if (!res.ok) throw new Error(`status ${res.status}`)
      ElMessage.success(t('careers.form.success'))
      dialogVisible.value = false
    } catch {
      ElMessage.error(t('careers.form.fail'))
    } finally {
      submitting.value = false
    }
  })
}
</script>

<style scoped>
.jobs {
  display: grid;
  gap: 14px;
}

.job :deep(.el-card__body) {
  padding: 20px 24px;
}

.job__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  user-select: none;
}

.job__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: none;
}

.job__chevron {
  color: var(--c-primary);
  transition: transform 0.25s;
}

.job__chevron--open {
  transform: rotate(180deg);
}

/* 详情展开/收起:grid rows 过渡,平滑且内容高度自适应 */
.job__detail {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.job__detail--open {
  grid-template-rows: 1fr;
}

.job__detail-inner {
  overflow: hidden;
}

.job__detail-inner p {
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.85;
  color: var(--c-text-secondary);
  overflow-wrap: anywhere;
}

.job h3 {
  font-size: 17px;
  margin-bottom: 8px;
}

/* 申请弹框 */
.apply-form__tip {
  font-size: 12px;
  line-height: 1.6;
  color: var(--c-text-secondary);
  margin-top: 4px;
}

.apply-form__file {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 6px 10px;
  background: var(--c-primary-light);
  border-radius: 6px;
  font-size: 13px;
  color: var(--c-text);
  max-width: 100%;
}

.apply-form__file span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apply-form__file-x {
  margin-left: auto;
  flex: none;
  cursor: pointer;
  color: var(--c-text-secondary);
}

.apply-form__file-x:hover {
  color: var(--c-primary);
}

.job__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.welfares {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.welfare {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 18px 20px;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .welfares {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .job__row {
    flex-direction: column;
    align-items: flex-start;
  }

  .welfares {
    grid-template-columns: 1fr;
  }
}
</style>
