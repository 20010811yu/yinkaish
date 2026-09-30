// 管理端图片上传共用:上传地址/鉴权头/预校验与错误提示(产品/荣誉/伙伴三处复用)
// 文件名规范由服务端统一执行:img-<yyyyMMdd-HHmmss>-<随机>.<扩展名>,不保留原始文件名
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getToken } from '../api/admin'

export function useImageUpload() {
  const { t } = useI18n()
  const uploadAction = '/api/admin/upload'
  const uploadHeaders = { Authorization: `Bearer ${getToken()}` }

  const beforeImageUpload = (file) => {
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      ElMessage.error(t('admin.rule.imageType'))
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      ElMessage.error(t('admin.rule.imageSize'))
      return false
    }
    return true
  }

  const onUploadError = (err) => {
    let msg = t('admin.rule.uploadFailed')
    try {
      const resp = JSON.parse(err.message)
      if (resp?.error === 'file too large (max 5MB)') msg = t('admin.rule.imageSize')
    } catch { /* 保留默认提示 */ }
    ElMessage.error(msg)
  }

  return { uploadAction, uploadHeaders, beforeImageUpload, onUploadError }
}
