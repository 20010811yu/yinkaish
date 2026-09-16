// 按当前语言取双语字段值
export function pick(field, locale) {
  return field?.[locale] ?? field?.zh ?? ''
}
