<template>
  <div class="login">
    <el-card class="login__card">
      <h1 class="login__title">{{ $t('admin.title') }}</h1>
      <el-form :model="form" @submit.prevent="onSubmit">
        <el-form-item :label="$t('admin.login.username')">
          <el-input v-model="form.username" data-testid="admin-username" autocomplete="username" />
        </el-form-item>
        <el-form-item :label="$t('admin.login.password')">
          <el-input v-model="form.password" data-testid="admin-password" type="password" show-password autocomplete="current-password" />
        </el-form-item>
        <el-button type="primary" class="login__btn" :loading="loading" native-type="submit" data-testid="admin-login-btn">
          {{ $t('admin.login.submit') }}
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { adminApi, setSession } from '../../api/admin'

const { t } = useI18n()
const router = useRouter()
const form = reactive({ username: '', password: '' })
const loading = ref(false)

const onSubmit = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning(t('admin.login.required'))
    return
  }
  loading.value = true
  try {
    const { token, nickname, username } = await adminApi.login(form.username, form.password)
    setSession(token, { nickname, username })
    ElMessage.success(t('admin.login.welcome', { name: nickname || username }))
    router.push('/admin/news')
  } catch (err) {
    ElMessage.error(err.message)
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

.login__title {
  text-align: center;
  margin: 0 0 20px;
  font-size: 20px;
}

.login__btn {
  width: 100%;
}
</style>
