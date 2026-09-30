<template>
  <el-container class="layout">
    <!-- 顶部横栏占满整行:左 logo+公司中英文名,右 会话操作 -->
    <el-header class="layout__header">
      <div class="layout__brand">
        <img src="../../assets/favicon.ico" alt="logo" class="layout__logo" />
        <div class="layout__brand-text">
          <span class="layout__name">{{ $t('brand.full') }}</span>
          <span class="layout__name-en">{{ $t('brand.english') }}</span>
        </div>
      </div>
      <div class="layout__header-actions">
        <span class="layout__user">{{ session?.nickname || session?.username || '' }}</span>
        <el-button text @click="onChangePwd">{{ $t('admin.layout.changePwd') }}</el-button>
        <el-button text type="danger" data-testid="admin-logout" @click="onLogout">{{ $t('admin.layout.logout') }}</el-button>
      </div>
    </el-header>
    <el-container class="layout__body">
      <el-aside width="200px" class="layout__aside">
        <el-menu :default-active="route.path" router>
          <el-menu-item index="/admin/news">{{ $t('admin.menu.news') }}</el-menu-item>
          <el-menu-item index="/admin/jobs">{{ $t('admin.menu.jobs') }}</el-menu-item>
          <el-menu-item index="/admin/products">{{ $t('admin.menu.products') }}</el-menu-item>
          <el-menu-item index="/admin/honors">{{ $t('admin.menu.honors') }}</el-menu-item>
          <el-menu-item index="/admin/partners">{{ $t('admin.menu.partners') }}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="layout__main">
        <router-view />
      </el-main>
    </el-container>

    <el-dialog v-model="pwdVisible" :title="$t('admin.layout.changePwd')" width="420px">
      <el-form label-width="90px">
        <el-form-item :label="$t('admin.login.password')">
          <el-input v-model="pwd.old" type="password" show-password />
        </el-form-item>
        <el-form-item :label="$t('admin.pwd.new')">
          <el-input v-model="pwd.new1" type="password" show-password />
        </el-form-item>
        <el-form-item :label="$t('admin.pwd.confirm')">
          <el-input v-model="pwd.new2" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="pwdVisible = false">{{ $t('admin.common.cancel') }}</el-button>
        <el-button type="primary" :loading="pwdSaving" @click="savePwd">{{ $t('admin.common.save') }}</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { adminApi, clearSession, getSession } from '../../api/admin'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const session = computed(() => getSession())

const pwdVisible = ref(false)
const pwdSaving = ref(false)
const pwd = reactive({ old: '', new1: '', new2: '' })

const onLogout = () => {
  clearSession()
  router.push('/admin/login')
}

const onChangePwd = () => {
  pwd.old = pwd.new1 = pwd.new2 = ''
  pwdVisible.value = true
}

const savePwd = async () => {
  if (!pwd.old || pwd.new1.length < 6) {
    ElMessage.warning(t('admin.pwd.rule'))
    return
  }
  if (pwd.new1 !== pwd.new2) {
    ElMessage.warning(t('admin.pwd.mismatch'))
    return
  }
  pwdSaving.value = true
  try {
    await adminApi.changePassword(pwd.old, pwd.new1)
    ElMessage.success(t('admin.pwd.done'))
    pwdVisible.value = false
  } catch (err) {
    ElMessage.error(err.message)
  } finally {
    pwdSaving.value = false
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

/* 顶部横栏:整行铺满,左品牌右操作 */
.layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.layout__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.layout__logo {
  width: 38px;
  height: 38px;
  flex: none;
}

.layout__brand-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.3;
}

.layout__name {
  font-weight: 700;
  font-size: 15px;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.layout__name-en {
  font-size: 11px;
  color: var(--el-color-primary, #00a651);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.layout__header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: none;
}

.layout__user {
  color: var(--el-text-color-regular);
  margin-right: 4px;
}

.layout__body {
  min-height: 0;
}

.layout__aside {
  border-right: 1px solid #e5e7eb;
}

.layout__main {
  background: #fafafa;
}
</style>
