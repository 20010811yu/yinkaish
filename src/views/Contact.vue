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
              <span class="contact__phones">
                <span>Tel: {{ $t('contact.phone') }}</span>
                <span>{{ $t('contact.phoneCao') }}</span>
                <span>{{ $t('contact.phoneZhu') }}</span>
              </span>
            </li>
            <li>
              <el-icon><Message /></el-icon>
              <span class="contact__phones">
                <span>{{ $t('contact.email') }}</span>
                <span>{{ $t('contact.email2') }}</span>
              </span>
            </li>
            <li>
              <el-icon><Clock /></el-icon>
              <span>{{ $t('contact.hours') }}</span>
            </li>
          </ul>
        </div>

        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" name="contact" class="contact__form">
          <el-form-item :label="$t('contact.form.name')" prop="name">
            <el-input v-model="form.name" :placeholder="$t('contact.form.name')" />
          </el-form-item>
          <el-form-item :label="$t('contact.form.email')" prop="email">
            <el-input v-model="form.email" :placeholder="$t('contact.form.email')" />
          </el-form-item>
          <el-form-item :label="$t('contact.form.phone')" prop="phone">
            <el-input v-model="form.phone" :placeholder="$t('contact.form.phone')">
              <template #prepend>
                <el-select
                  v-model="phoneRegion"
                  class="phone-region"
                  :aria-label="$t('contact.form.phone')"
                  @change="formRef?.clearValidate('phone')"
                >
                  <template #label="{ value }">
                    <span class="phone-region__selected">{{ regions.find(r => r.code === value)?.flag }}{{ value }}</span>
                  </template>
                  <el-option v-for="r in regions" :key="r.code" :value="r.code" :label="r.code">
                    <span class="phone-region__flag">{{ r.flag }}</span>
                    <span class="phone-region__name">{{ locale === 'en' ? r.en : r.zh }}</span>
                    <span class="phone-region__code">{{ r.code }}</span>
                  </el-option>
                </el-select>
              </template>
            </el-input>
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

const { t, locale } = useI18n()

const formRef = ref()
const form = reactive({ name: '', email: '', phone: '', message: '' })

// 电话地区区号列表(主要出口市场,双语名称按数据规范 { zh, en })
const regions = [
  { flag: '🇨🇳', code: '+86', zh: '中国大陆', en: 'Mainland China' },
  { flag: '🇭🇰', code: '+852', zh: '中国香港', en: 'Hong Kong, China' },
  { flag: '🇲🇴', code: '+853', zh: '中国澳门', en: 'Macao, China' },
  { flag: '🇹🇼', code: '+886', zh: '中国台湾', en: 'Taiwan, China' },
  { flag: '🇸🇬', code: '+65', zh: '新加坡', en: 'Singapore' },
  { flag: '🇲🇾', code: '+60', zh: '马来西亚', en: 'Malaysia' },
  { flag: '🇯🇵', code: '+81', zh: '日本', en: 'Japan' },
  { flag: '🇰🇷', code: '+82', zh: '韩国', en: 'South Korea' },
  { flag: '🇹🇭', code: '+66', zh: '泰国', en: 'Thailand' },
  { flag: '🇻🇳', code: '+84', zh: '越南', en: 'Vietnam' },
  { flag: '🇮🇳', code: '+91', zh: '印度', en: 'India' },
  { flag: '🇦🇪', code: '+971', zh: '阿联酋', en: 'UAE' },
  { flag: '🇪🇬', code: '+20', zh: '埃及', en: 'Egypt' },
  { flag: '🇩🇪', code: '+49', zh: '德国', en: 'Germany' },
  { flag: '🇫🇷', code: '+33', zh: '法国', en: 'France' },
  { flag: '🇬🇧', code: '+44', zh: '英国', en: 'UK' },
  { flag: '🇺🇸', code: '+1', zh: '美国/加拿大', en: 'USA/Canada' },
  { flag: '🇦🇺', code: '+61', zh: '澳大利亚', en: 'Australia' },
  { flag: '🇧🇷', code: '+55', zh: '巴西', en: 'Brazil' },
]
const phoneRegion = ref('+86')

// +86:手机号/座机/400 热线(兼容分隔符);其他地区:去分隔符后 5-14 位、非 0 开头
const RE_MAINLAND = /^(?:1[3-9]\d{9}|0\d{2,3}\d{7,8}|400\d{7,8})$/

const validatePhone = (rule, value, callback) => {
  if (!value) return callback()
  // 先去分隔符再匹配,手机号/座机/400 均允许带空格或横杠书写
  const stripped = value.replace(/[\s-]/g, '')
  const ok = phoneRegion.value === '+86'
    ? RE_MAINLAND.test(stripped)
    : /^[1-9]\d{4,13}$/.test(stripped)
  ok ? callback() : callback(new Error(t('contact.form.phoneRule')))
}

const rules = {
  name: [{ required: true, message: () => t('contact.form.name'), trigger: 'blur' }],
  email: [
    { required: true, message: () => t('contact.form.email'), trigger: 'blur' },
    { type: 'email', message: () => t('contact.form.email'), trigger: 'blur' },
  ],
  message: [{ required: true, message: () => t('contact.form.message'), trigger: 'blur' }],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
}

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      // Netlify Forms 提交:POST 到站点根路径,form-name 指向 index.html 中的影子表单
      // 电话提交合并值(区号 + 号码),如 "+86 13800138000"
      const fullPhone = form.phone.trim() ? `${phoneRegion.value} ${form.phone.trim()}` : ''
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          name: form.name,
          email: form.email,
          phone: fullPhone,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      ElMessage.success(t('contact.form.success'))
      form.name = ''
      form.email = ''
      form.phone = ''
      form.message = ''
    } catch {
      ElMessage.error(t('contact.form.fail'))
    }
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

.contact__phones {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 电话地区选择器 */
.phone-region {
  width: 128px;
}

.phone-region__selected {
  font-size: 14px;
}

.phone-region__flag {
  width: 22px;
  flex: none;
}

.phone-region__name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.phone-region__code {
  color: var(--c-text-secondary);
  font-size: 13px;
  margin-left: auto;
  padding-left: 8px;
}

@media (max-width: 768px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
