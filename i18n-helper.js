import i18n from '@/lang'
export const $t = (...args) => {
  const key = args[0]
  // 空key保护，防止 Invalid arguments
  if (!key) return args[1] ?? ''
  const currentLocale = i18n.global.locale.value // 取出ref的值
  const hasKey = i18n.global.te(key, currentLocale)
  console.log(currentLocale, hasKey, 888888);
  // 中文系列直接返回key，跳过i18n查询，消除警告
  if (currentLocale === 'zh-CN' || currentLocale === 'zh' || currentLocale === 'CN') {
    return key
  } else if (hasKey) {
    // 存在就返回翻译文本
    return i18n.global.t(...args)
  } else {
    // 找不到key：原样返回key，不进入i18n降级逻辑，不触发警告
    return key
  }
  // 其他语言正常翻译
  return i18n.global.t(...args)
}
export const $te = (...args) => i18n.global.te(...args)
export const $d = (...args) => i18n.global.d(...args)
export const locale = i18n.global.locale
