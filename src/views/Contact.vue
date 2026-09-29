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
            <el-input v-model="form.phone" :placeholder="$t('contact.form.phone')" class="phone-number">
              <template #prepend>
                <span class="dial-code">
                  <img v-if="flagUrl" :src="flagUrl" alt="" class="dial-code__flag" />
                  <input
                    v-model="form.dial"
                    class="dial-code__input"
                    :placeholder="'+86'"
                    :aria-label="$t('contact.form.phone')"
                    inputmode="tel"
                    maxlength="6"
                    @blur="onDialBlur"
                  />
                  <button
                    v-if="candidates.length > 1"
                    type="button"
                    class="dial-code__arrow"
                    :aria-label="$t('contact.form.phone')"
                    @click.stop="flagOpen = !flagOpen"
                  >▾</button>
                  <div v-if="flagOpen && candidates.length > 1" class="dial-code__menu">
                    <div
                      v-for="c in candidates"
                      :key="c.iso"
                      class="dial-code__candidate"
                      :class="{ 'dial-code__candidate--on': c.iso === selectedIso }"
                      @click.stop="pickCandidate(c)"
                    >
                      <img :src="flagOf(c.iso)" alt="" class="dial-code__flag" />
                      <span class="dial-code__name">{{ locale === 'en' ? c.en : c.zh }}</span>
                    </div>
                  </div>
                </span>
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
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { Location, Phone, Message, Clock } from '@element-plus/icons-vue'

const { t, locale } = useI18n()

const formRef = ref()
const flagOpen = ref(false)
// 点击区号区域以外时关闭候选菜单
const onDocClick = (e) => {
  if (!e.target.closest?.('.dial-code')) flagOpen.value = false
}
watch(flagOpen, (open) => {
  if (open) document.addEventListener('click', onDocClick, true)
  else document.removeEventListener('click', onDocClick, true)
})
const form = reactive({ name: '', email: '', dial: '+86', phone: '', message: '' })

// 区号表(含同码多国)与国旗 URL 按需加载表
import { dialCodes } from '../data/dialCodes'
const flagModules = import.meta.glob('../assets/flags/*.svg', { query: '?url', import: 'default' })
const flagCache = ref({}) // iso -> 已加载的 svg url
const flagOf = (iso) => flagCache.value[iso] ?? ''

const normalizedDial = computed(() => {
  const v = form.dial.replace(/[\s-]/g, '')
  if (!v) return ''
  return v.startsWith('+') ? v : `+${v}`
})
// 同码候选(可能多国);空/非法时为空数组
const candidates = computed(() => dialCodes.filter((c) => c.code === normalizedDial.value))
const selectedIso = ref('cn')

// 区号变化:重置候选选择(默认第一个),并预载候选国国旗;号码已填则重新校验
watch([normalizedDial], async () => {
  selectedIso.value = candidates.value[0]?.iso ?? ''
  for (const c of candidates.value) {
    if (!flagCache.value[c.iso]) {
      const loader = flagModules[`../assets/flags/${c.iso}.svg`]
      if (loader) flagCache.value = { ...flagCache.value, [c.iso]: await loader() }
    }
  }
  if (form.phone) formRef.value?.validateField('phone').catch(() => {})
}, { immediate: true })

const flagUrl = computed(() => flagOf(selectedIso.value))

const pickCandidate = (c) => {
  selectedIso.value = c.iso
  flagOpen.value = false // 同码候选点选后立即关闭菜单
  if (form.phone) formRef.value?.validateField('phone').catch(() => {})
}

// 区号框失焦:补 + 归一化,并触发区号/号码校验(区号非法即使号码未填也提示)
const onDialBlur = () => {
  const v = form.dial.replace(/[\s-]/g, '')
  if (v && !v.startsWith('+')) form.dial = `+${v}`
  if (form.dial || form.phone) formRef.value?.validateField('phone').catch(() => {})
}

// +86:手机号/座机/400 热线(先去分隔符再匹配);其他地区:5-14 位、非 0 开头
const RE_MAINLAND = /^(?:1[3-9]\d{9}|0\d{2,3}\d{7,8}|400\d{7,8})$/
const RE_DIAL = /^\+[1-9]\d{0,3}$/

const validatePhone = (rule, value, callback) => {
  if (!value && !form.dial) return callback()
  // 区号格式:1-4 位数字、非 0 开头(带 + 号)
  if (!RE_DIAL.test(normalizedDial.value)) return callback(new Error(t('contact.form.codeRule')))
  if (!value) return callback()
  // 号码:先去分隔符再按区号分支匹配
  const stripped = value.replace(/[\s-]/g, '')
  const ok = normalizedDial.value === '+86'
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
      const fullPhone = form.phone.trim() ? `${normalizedDial.value} ${form.phone.trim()}` : ''
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
      form.dial = '+86'
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

/* 区号输入 + 国旗 + 同码候选 */
.dial-code {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

/* 同码候选菜单:自控显隐,点选即关 */
.dial-code__menu {
  position: absolute;
  top: calc(100% + 8px);
  left: -8px;
  z-index: 2000;
  min-width: 170px;
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 4px;
}

.dial-code__flag {
  width: 21px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid var(--c-border);
  object-fit: cover;
  flex: none;
  display: block;
}

.dial-code__input {
  width: 52px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: var(--c-text);
  text-align: center;
}

.dial-code__arrow {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 11px;
  color: var(--c-text-secondary);
  padding: 2px 4px;
}

.dial-code__arrow:hover {
  color: var(--c-primary);
}

.dial-code__candidate {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: var(--c-text);
}

.dial-code__candidate:hover {
  background: var(--c-primary-light);
}

.dial-code__candidate--on {
  background: var(--c-primary-light);
  color: var(--c-primary-dark);
  font-weight: 600;
}

.dial-code__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.phone-number :deep(.el-input-group__prepend) {
  padding: 0 10px;
}

@media (max-width: 768px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
