import dayjs from "dayjs"
import {scanOrder} from "@/api/order";

export const toPromise = (fn, options) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn({
        ...options,
        success: resolve,
        fail: reject
      })
    })
  })
}


export const Toast = {
  success: (title, options) => {
    uni.showToast({
      icon: 'success',
      title,
      ...options
    })
  },
  fail: (title, options) => {
    uni.showToast({
      icon: 'error',
      title,
      ...options
    })
  },
  info: (title, options) => {
    uni.showToast({
      icon: 'none',
      title,
      ...options
    })
  }
}

export const setToken = (token, expires_in) => {
  if (token) {
    const nowT = dayjs().clone().add(expires_in, 's')
    uni.setStorageSync('tokenExpiresTime', nowT.valueOf())
    uni.setStorageSync('token', token)
  }
}

export const getToken = () => {
  const token = uni.getStorageSync('token')
  const expiresTime = uni.getStorageSync('tokenExpiresTime')
  if (!token) return ''
  if (expiresTime && dayjs(expiresTime).isSameOrAfter(dayjs(), 'seconds')) {
    // 未过期
    return token
  }
  return ''
}

// 获取缓存大小（单位：MB）
export async function getCacheSize() {
  let totalSize = 0;

  // 1. 获取本地存储大小
  const storageInfo = uni.getStorageInfoSync();
  totalSize += storageInfo.keys.reduce((sum, key) => {
    return sum + (uni.getStorageSync(key).toString().length || 0);
  }, 0) / 1024 / 1024;

  // 2. 获取文件缓存大小（App端）
  // #ifdef APP-PLUS
  const cacheDir = plus.io.convertLocalFileSystemURL('_doc/cache/');
  totalSize += await calculateDirSize(cacheDir);
  // #endif

  // H5端获取缓存大小（需要浏览器支持）
  // #ifdef H5
  // if ('caches' in window) {
  //   const cacheSize = await getBrowserCacheSize();
  //   totalSize += cacheSize;
  // }
  // #endif

  return totalSize.toFixed(2);
}

// 清除所有缓存
export async function clearAllCache() {
  // 1. 清除本地存储
  // uni.clearStorageSync();

  // 2. 清除文件缓存（App端）
  // #ifdef APP-PLUS
  const cacheDir = '_doc/cache';
  const fs = uni.getFileSystemManager();
  try {
    const files = await readDir(cacheDir);
    await Promise.all(files.map(file => removeFile(`${cacheDir}/${file}`)));
  } catch (e) {
    console.error('清除文件缓存失败:', e);
  }
  // #endif

  // 3. 清除H5缓存
  // #ifdef H5
  // if ('caches' in window) {
  //   await caches.keys().then(cacheNames => {
  //     return Promise.all(cacheNames.map(name => caches.delete(name)));
  //   });
  // }
  // #endif

  uni.showToast({
    title: '缓存清理完成',
    icon: 'success'
  });
}

/****************** 工具函数 ******************/
// 计算目录大小（App端）
export async function calculateDirSize(dirPath) {
  const files = await readDir(dirPath);
  let size = 0;

  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const stat = await getFileStat(filePath);

    if (stat.isDirectory()) {
      size += await calculateDirSize(filePath);
    } else {
      size += stat.size / 1024 / 1024;
    }
  }
  return size;
}

// 读取目录内容
export function readDir(path) {
  return new Promise((resolve, reject) => {
    const fs = uni.getFileSystemManager();
    fs.readdir({
      dirPath: path,
      success: res => resolve(res.files),
      fail: reject
    });
  });
}

// 获取文件信息
export function getFileStat(path) {
  return new Promise((resolve, reject) => {
    const fs = uni.getFileSystemManager();
    fs.stat({
      path,
      success: res => resolve(res.stats),
      fail: reject
    });
  });
}

// 删除文件/目录
export function removeFile(path) {
  return new Promise((resolve, reject) => {
    const fs = uni.getFileSystemManager();
    fs.unlink({
      filePath: path,
      success: resolve,
      fail: reject
    });
  });
}

// 获取浏览器缓存大小（H5）
export async function getBrowserCacheSize() {
  let total = 0;
  const cacheNames = await caches.keys();

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const headers = response.headers;
        const contentLength = headers.get('content-length');
        if (contentLength) {
          total += Number(contentLength);
        }
      }
    }
  }
  return total / 1024 / 1024;
}

export const showModal = (content, title = '提示') => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: title,
      content: content,
      success: (result) => {
        if (result.confirm) {
          resolve(result.confirm);
        } else {
          reject(result.confirm);
        }
      },
      fail: (result) => {
        reject(result);
      }
    })
  })
}

// 扫取餐码
export const scanCodeByOrder = () => {
  return toPromise(uni.scanCode, {onlyFromCamera: true, hideAlbum: true}).then(res => {
    const text = res.result; // order_no=xxxxx&code=xxxxx
    const params = text.split('&') || [];
    const orderNo = params[0]?.split('=')?.[1];
    const code = params[1]?.split('=')?.[1];
    const dataParams = {order_no: orderNo, pickup_code: code}
    return scanOrder(dataParams).then(() => (dataParams));
  });
}