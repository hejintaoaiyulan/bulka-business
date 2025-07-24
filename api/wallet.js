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