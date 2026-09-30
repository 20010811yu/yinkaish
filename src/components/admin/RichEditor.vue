<template>
  <div class="rich-editor">
    <Toolbar class="rich-editor__bar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      :key="locale"
      class="rich-editor__body"
      v-model="html"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useI18n } from 'vue-i18n'
import '@wangeditor/editor/dist/css/style.css'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

const { locale } = useI18n()
const mode = 'default'
// shallowRef:编辑器实例无需深层响应
const editorRef = shallowRef(null)

const html = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

// 只留文字排版;图片/视频上传不开放(图片走素材文件名机制,避免 base64 入库)
const toolbarConfig = { excludeKeys: ['group-image', 'group-video'] }
const editorConfig = computed(() => ({
  placeholder: locale.value === 'en' ? 'Write here...' : '请输入正文…',
  language: locale.value === 'en' ? 'en' : 'zh-CN',
}))

const onCreated = (editor) => {
  editorRef.value = editor
  // dev 构建暴露实例供自动化测试(同 SlideVerify 的 data-dev-target 惯例)
  if (import.meta.env.DEV) window.__ykEditor = editor
}

onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<style scoped>
.rich-editor {
  width: 100%;
  min-width: 0;
  /* 弹性高度:Editor 根节点内联 height:100%,故在根容器定高、flex 分配 */
  height: clamp(240px, 40vh, 380px);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  /* el-dialog 等 z-index 覆盖层内的下拉菜单需要独立层叠上下文 */
  z-index: 0;
}
.rich-editor__bar {
  flex: none;
  border-bottom: 1px solid var(--el-border-color);
}
.rich-editor__body {
  flex: 1;
  overflow-y: auto;
}
</style>
