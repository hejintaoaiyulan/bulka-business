import request from "@/api/index";

// 獲取錢包信息
export const getWallet = () => {
  return request.get('/store/finance/wallet', {})
}

// 金額明細-金額日誌
export const getWalletLog = (params) => {
  return request.get('/store/finance/settledLog', params)
}

// 銀行卡列表
export const getBankCardList = () => {
  return request.get('/store/finance/listBank', {})
}

// 申請提現
export const applyWithdraw = (params) => {
  return request.post('/store/finance/approvalWithdrawal', params)
}

// 提現記錄
export const getWithdrawList = (params) => {
  return request.get('/store/finance/listWithdrawal', params)
}

// 解綁銀行卡
export const unbindBankCard = (params) => {
  return request.post('/store/finance/listBank', params)
}

// 添加銀行卡
export const addBankCard = (params) => {
  return request.post('/store/finance/addBank', params)
}

// 訂單明細
export const sellerOrder = (params) => {
  return request.get('/store/finance/settledOrder', params)
}