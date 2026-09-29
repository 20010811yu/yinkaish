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
                  filterable
                  allow-create
                  default-first-option
                  @change="formRef?.clearValidate('phone')"
                >
                  <template #label="{ value }">
                    <span class="phone-region__selected">
                      <img v-if="regions.find(r => r.iso === value)" :src="regions.find(r => r.iso === value).flag" alt="" class="phone-region__flag-img" />
                      <span>{{ regionCode }}</span>
                    </span>
                  </template>
                  <el-option v-for="r in regions" :key="r.iso" :value="r.iso" :label="locale === 'en' ? r.en : r.zh">
                    <span class="phone-region__option">
                      <img :src="r.flag" alt="" class="phone-region__flag-img" />
                      <span class="phone-region__name">{{ locale === 'en' ? r.en : r.zh }}</span>
                      <span class="phone-region__code">{{ r.code }}</span>
                    </span>
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
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { Location, Phone, Message, Clock } from '@element-plus/icons-vue'

const { t, locale } = useI18n()

const formRef = ref()
const form = reactive({ name: '', email: '', phone: '', message: '' })

// 国旗 SVG 来自 flag-icons 包(MIT),按引用打包
import flagAE from 'flag-icons/flags/4x3/ae.svg'
import flagAU from 'flag-icons/flags/4x3/au.svg'
import flagBR from 'flag-icons/flags/4x3/br.svg'
import flagCA from 'flag-icons/flags/4x3/ca.svg'
import flagCN from 'flag-icons/flags/4x3/cn.svg'
import flagDE from 'flag-icons/flags/4x3/de.svg'
import flagEG from 'flag-icons/flags/4x3/eg.svg'
import flagFR from 'flag-icons/flags/4x3/fr.svg'
import flagGB from 'flag-icons/flags/4x3/gb.svg'
import flagHK from 'flag-icons/flags/4x3/hk.svg'
import flagIN from 'flag-icons/flags/4x3/in.svg'
import flagJP from 'flag-icons/flags/4x3/jp.svg'
import flagKR from 'flag-icons/flags/4x3/kr.svg'
import flagMO from 'flag-icons/flags/4x3/mo.svg'
import flagMY from 'flag-icons/flags/4x3/my.svg'
import flagSG from 'flag-icons/flags/4x3/sg.svg'
import flagTH from 'flag-icons/flags/4x3/th.svg'
import flagTW from 'flag-icons/flags/4x3/tw.svg'
import flagUS from 'flag-icons/flags/4x3/us.svg'
import flagVN from 'flag-icons/flags/4x3/vn.svg'

// 电话地区区号列表(主要出口市场,双语名称按数据规范 { zh, en });
// iso 为唯一键(value 也存 iso,+1 等同区号国家分列互不冲突);
// 国旗用 SVG 图——Windows 无国旗 emoji 字体,emoji 只能显示成字母对
const regions = [
  { iso: 'cn', flag: flagCN, code: '+86', zh: '中国大陆', en: 'Mainland China' },
  { iso: 'hk', flag: flagHK, code: '+852', zh: '中国香港', en: 'Hong Kong, China' },
  { iso: 'mo', flag: flagMO, code: '+853', zh: '中国澳门', en: 'Macao, China' },
  { iso: 'tw', flag: flagTW, code: '+886', zh: '中国台湾', en: 'Taiwan, China' },
  { iso: 'sg', flag: flagSG, code: '+65', zh: '新加坡', en: 'Singapore' },
  { iso: 'my', flag: flagMY, code: '+60', zh: '马来西亚', en: 'Malaysia' },
  { iso: 'jp', flag: flagJP, code: '+81', zh: '日本', en: 'Japan' },
  { iso: 'kr', flag: flagKR, code: '+82', zh: '韩国', en: 'South Korea' },
  { iso: 'th', flag: flagTH, code: '+66', zh: '泰国', en: 'Thailand' },
  { iso: 'vn', flag: flagVN, code: '+84', zh: '越南', en: 'Vietnam' },
  { iso: 'in', flag: flagIN, code: '+91', zh: '印度', en: 'India' },
  { iso: 'ae', flag: flagAE, code: '+971', zh: '阿联酋', en: 'UAE' },
  { iso: 'eg', flag: flagEG, code: '+20', zh: '埃及', en: 'Egypt' },
  { iso: 'de', flag: flagDE, code: '+49', zh: '德国', en: 'Germany' },
  { iso: 'fr', flag: flagFR, code: '+33', zh: '法国', en: 'France' },
  { iso: 'gb', flag: flagGB, code: '+44', zh: '英国', en: 'UK' },
  { iso: 'us', flag: flagUS, code: '+1', zh: '美国', en: 'USA' },
  { iso: 'ca', flag: flagCA, code: '+1', zh: '加拿大', en: 'Canada' },
  { iso: 'au', flag: flagAU, code: '+61', zh: '澳大利亚', en: 'Australia' },
  { iso: 'br', flag: flagBR, code: '+55', zh: '巴西', en: 'Brazil' },
]
// value 存 iso;自填区号(allow-create)时存用户键入的文本,归一化补 +
const phoneRegion = ref('cn')
const selectedRegion = computed(() => regions.find(r => r.iso === phoneRegion.value))
const regionCode = computed(() => {
  if (selectedRegion.value) return selectedRegion.value.code
  const v = phoneRegion.value.trim()
  return v.startsWith('+') ? v : `+${v}`
})

// +86:手机号/座机/400 热线(兼容分隔符);其他地区:去分隔符后 5-14 位、非 0 开头
const RE_MAINLAND = /^(?:1[3-9]\d{9}|0\d{2,3}\d{7,8}|400\d{7,8})$/

const validatePhone = (rule, value, callback) => {
  if (!value) return callback()
  // 先去分隔符再匹配,手机号/座机/400 均允许带空格或横杠书写
  const stripped = value.replace(/[\s-]/g, '')
  const ok = regionCode.value === '+86'
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
      const fullPhone = form.phone.trim() ? `${regionCode.value} ${form.phone.trim()}` : ''
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.phone-region__flag-img {
  width: 21px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid var(--c-border);
  object-fit: cover;
  flex: none;
  display: block;
}

/* 下拉选项:国旗 + 名称 + 区号 flex 排布(teleport 到 body,靠 data-v 作用域样式仍生效) */
.phone-region__option {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
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
