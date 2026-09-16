<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('contact.title') }}</h1>
        <p class="section-subtitle">{{ $t('contact.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact">
        <div class="contact__info">
          <h2>{{ $t('contact.infoTitle') }}</h2>
          <ul>
            <li>
              <el-icon><Location /></el-icon>
              <span>{{ $t('contact.address') }}</span>
            </li>
            <li>
              <el-icon><Phone /></el-icon>
              <span>{{ $t('contact.phone') }}</span>
            </li>
            <li>
              <el-icon><Message /></el-icon>
              <span>{{ $t('contact.email') }}</span>
            </li>
            <li>
              <el-icon><Clock /></el-icon>
              <span>{{ $t('contact.hours') }}</span>
            </li>
          </ul>
        </div>

        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="contact__form">
          <el-form-item :label="$t('contact.form.name')" prop="name">
            <el-input v-model="form.name" :placeholder="$t('contact.form.name')" />
          </el-form-item>
          <el-form-item :label="$t('contact.form.email')" prop="email">
            <el-input v-model="form.email" :placeholder="$t('contact.form.email')" />
          </el-form-item>
          <el-form-item :label="$t('contact.form.phone')">
            <el-input v-model="form.phone" :placeholder="$t('contact.form.phone')" />
          </el-form-item>
          <el-form-item :label="$t('contact.form.message')" prop="message">
            <el-input v-model="form.message" type="textarea" :rows="5" :placeholder="$t('contact.form.message')" />
          </el-form-item>
          <el-button type="primary" size="large" round @click="submit">
            {{ $t('contact.form.submit') }}
          </el-button>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { Location, Phone, Message, Clock } from '@element-plus/icons-vue'

const { t } = useI18n()

const formRef = ref()
const form = reactive({ name: '', email: '', phone: '', message: '' })

const rules = {
  name: [{ required: true, message: () => t('contact.form.name'), trigger: 'blur' }],
  email: [
    { required: true, message: () => t('contact.form.email'), trigger: 'blur' },
    { type: 'email', message: () => t('contact.form.email'), trigger: 'blur' },
  ],
  message: [{ required: true, message: () => t('contact.form.message'), trigger: 'blur' }],
}

const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    ElMessage.success(t('contact.form.success'))
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  })
}
</script>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 56px;
}

.contact__info h2 {
  font-size: 22px;
  margin-bottom: 22px;
}

.contact__info li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 18px;
  color: var(--c-text-secondary);
  font-size: 15px;
}

.contact__info .el-icon {
  margin-top: 4px;
  color: var(--c-primary);
}

@media (max-width: 768px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
