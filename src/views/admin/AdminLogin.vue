<template>
  <div class="login">
    <el-card class="login__card">
      <div class="login__brand">
        <img src="../../assets/logo.png" alt="logo" class="login__logo" />
        <span class="login__company">{{ $t('brand.full') }}</span>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="onSubmit">
        <el-form-item :label="$t('admin.login.username')" prop="username">
          <el-input v-model="form.username" data-testid="admin-username" autocomplete="username" />
        </el-form-item>
        <el-form-item :label="$t('admin.login.password')" prop="password">
          <el-input v-model="form.password" data-testid="admin-password" type="password" show-password autocomplete="current-password" />
        </el-form-item>
        <SlideVerify ref="slideRef" class="login__slide" @verified="slideOk = true" />
        <!-- 登录失败信息内嵌常驻显示,不随时间自动消失 -->
        <el-alert v-if="loginError" :title="loginError" type="error" show-icon :closable="false" class="login__error" />
        <el-button type="primary" class="login__btn" :loading="loading" native-type="submit" data-testid="admin-login-btn">
          {{ $t('admin.login.submit') }}
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { adminApi, setSession } from '../../api/admin'
import SlideVerify from './SlideVerify.vue'

const { t } = useI18n()
const router = useRouter()
const formRef = ref(null)
const form = reactive({ username: '', password: '' })
const loading = ref(false)
const slideOk = ref(false)
const slideRef = ref(null)
const loginError = ref('')

// 重新输入凭据即清除失败提示
watch(() => [form.username, form.password], () => { loginError.value = '' })

const rules = {
  username: [{ required: true, message: () => t('admin.rule.usernameRequired'), trigger: 'blur' }],
  password: [{ required: true, message: () => t('admin.rule.passwordRequired'), trigger: 'blur' }],
}

const onSubmit = async () => {
  // 登录前前端校验:必填项不通过则不发请求
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  // 滑块未通过(含失败后重置未重拖)时给出明确提示,而不是静默无反应
  if (!slideOk.value) {
    ElMessage.warning(t('admin.login.slideFirst'))
    return
  }
  loading.value = true
  try {
    const { token, nickname, username } = await adminApi.login(form.username, form.password)
    setSession(token, { nickname, username })
    ElMessage.success(t('admin.login.welcome', { name: nickname || username }))
    router.push('/admin/news')
  } catch (err) {
    // 登录失败要求重新滑块验证,防重放
    slideOk.value = false
    slideRef.value?.reset()
    // 服务端凭据错误为英文标识,映射为双语提示;其余(网络失败等)原样展示
    loginError.value = err.message === 'invalid credentials' ? t('admin.login.invalid') : err.message
    ElMessage.error(loginError.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-soft, #f5f7f6);
}

.login__card {
  width: min(380px, calc(100vw - 32px));
}

.login__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.login__logo {
  height: 34px;
  max-width: 120px;
  object-fit: contain;
}

.login__company {
  font-size: clamp(14px, 1.2vw + 8px, 17px);
  font-weight: 600;
  color: var(--c-primary, #00a651);
  overflow-wrap: anywhere;
}

.login__btn {
  width: 100%;
}

.login__slide {
  margin-bottom: 14px;
}

.login__error {
  margin-bottom: 14px;
}
</style>
