export const PublishStatus =  {
  list: [
    {
      name: '未上架',
      value: 0
    },
    {
      name: '已上架',
      value: 1
    },
    {
      name: '已下架',
      value: 2
    }
  ],
  map: new Map(
    [
      [0,'未上架'],
      [1,'已上架'],
      [2,'已下架']
    ]
  )
}

// 庫存是否緊張
export const StockStatus = {
  list: [
    {name: '是',value: 1 },
    {name: '否', value: 2}
  ],
  map: new Map([
    [1, '是'],
    [2, '否']
  ])
}

// 優惠活動狀態
export const ActivityStatus = {
  list: [
    {
      name: '未開始',
      value: 1
    },
    {
      name: '進行中',
      value: 2
    },
    {
      name: '已下架',
      value: 3
    },
    {
      name: '已結束',
      value: 4
    },
  ],
  map: new Map([
    [1, '未開始'],
    [2, '進行中'],
    [3, '已下架'],
    [4, '已結束']
  ])
}

export const OrderStatusText = {
  map: new Map([
    [1, '用戶待支付'],
    [2, '已成功支付，正在等待商家接單'],
    [3, '商家已接單，請耐心等待出餐'],
    [4, '商家已出餐，請掃碼確認取餐'],
    [5, '用戶已完成取餐'],
    [6, '用戶已取消訂單，訂單金額將原路返回']
  ])
}

// 銀行列表
export const BankMap = new Map([
  ['工商銀行', {name: '工商銀行', icon: '/static/bank-icon/gsyh.png' }],
  ['農業銀行', {name: '農業銀行', icon: '/static/bank-icon/nyyh.png' }],
  ['中國銀行', {name: '中國銀行', icon: '/static/bank-icon/zgyh.png' }],
  ['建設銀行', {name: '建設銀行', icon: '/static/bank-icon/jiansheyh.png' }],
  ['交通銀行', {name: '交通銀行', icon: '/static/bank-icon/jtyh.png' }],
  ['招商銀行', {name: '招商銀行', icon: '/static/bank-icon/zsyh.png' }],
  ['民生銀行', {name: '民生銀行', icon: '/static/bank-icon/msyh.png' }],
  ['廣發銀行' , {name: '廣發銀行', icon: '/static/bank-icon/gfyh.png' }],
  ['興業銀行', {name: '興業銀行', icon: '/static/bank-icon/xyyh.png' }],
  ['中信銀行', {name: '中信銀行', icon: '/static/bank-icon/zxyh.png' }],
  ['華夏銀行', {name: '華夏銀行', icon: '/static/bank-icon/hxyh.png' }],
  ['浦發銀行', {name: '浦發銀行', icon: '/static/bank-icon/pfyh.png' }],
  ['平安銀行', {name: '平安銀行', icon: '/static/bank-icon/payh.png' }],
  ['光大銀行', {name: '光大銀行', icon: '/static/bank-icon/gdyh.png' }],
  ['郵政儲蓄', {name: '郵政儲蓄', icon: '/static/bank-icon/yzcx.png' }],
  ['郵儲銀行', {name: '郵儲銀行', icon: '/static/bank-icon/yzcx.png' }],
  ['北京銀行', {name: '北京銀行', icon: '/static/bank-icon/bjyh.png' }],
  ['上海銀行', {name: '上海銀行', icon: '/static/bank-icon/shyh.png' }],
  ['南京銀行', {name: '南京銀行', icon: '/static/bank-icon/njyh.png' }],
  ['寧波銀行', {name: '寧波銀行', icon: '/static/bank-icon/nbyh.png' }],
])