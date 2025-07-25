import request from "@/api/index";

// 获取钱包信息
export const getWallet = () => {
  return request.get('/store/finance/wallet', {})
}

// 金额明细-金额日志
export const getWalletLog = (params) => {
  return request.get('/store/finance/settledLog', params)
}

// 银行卡列表
export const getBankCardList = () => {
  return request.get('/store/finance/listBank', {})
}

// 申请提现
export const applyWithdraw = (params) => {
  return request.post('/store/finance/approvalWithdrawal', params)
}

// 提现记录
export const getWithdrawList = (params) => {
  return request.get('/store/finance/listWithdrawal', params)
}

// 解绑银行卡
export const unbindBankCard = (params) => {
  return request.post('/store/finance/listBank', params)
}

// 添加银行卡
export const addBankCard = (params) => {
  return request.post('/store/finance/addBank', params)
}

// 订单明细
export const sellerOrder = (params) => {
  return request.get('/store/finance/settledOrder', params)
}