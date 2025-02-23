export const toPromise = (fn, options) => {
  return new Promise((resolve, reject) => {
    fn({
      ...options,
      success: resolve,
      fail: reject
    })
  })
}
