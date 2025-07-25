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

// 库存是否紧张
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

// 优惠活动状态
export const ActivityStatus = {
  list: [
    {
      name: '未开始',
      value: 1
    },
    {
      name: '进行中',
      value: 2
    },
    {
      name: '已下架',
      value: 3
    },
    {
      name: '已结束',
      value: 4
    },
  ],
  map: new Map([
    [1, '未开始'],
    [2, '进行中'],
    [3, '已下架'],
    [4, '已结束']
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

// 银行列表
export const BankMap = new Map([
  ['工商银行', {name: '工商银行', icon: '/static/bank-icon/gsyh.png' }],
  ['农业银行', {name: '农业银行', icon: '/static/bank-icon/nyyh.png' }],
  ['中国银行', {name: '中国银行', icon: '/static/bank-icon/zgyh.png' }],
  ['建设银行', {name: '建设银行', icon: '/static/bank-icon/jiansheyh.png' }],
  ['交通银行', {name: '交通银行', icon: '/static/bank-icon/jtyh.png' }],
  ['招商银行', {name: '招商银行', icon: '/static/bank-icon/zsyh.png' }],
  ['民生银行', {name: '民生银行', icon: '/static/bank-icon/msyh.png' }],
  ['广发银行' , {name: '广发银行', icon: '/static/bank-icon/gfyh.png' }],
  ['兴业银行', {name: '兴业银行', icon: '/static/bank-icon/xyyh.png' }],
  ['中信银行', {name: '中信银行', icon: '/static/bank-icon/zxyh.png' }],
  ['华夏银行', {name: '华夏银行', icon: '/static/bank-icon/hxyh.png' }],
  ['浦发银行', {name: '浦发银行', icon: '/static/bank-icon/pfyh.png' }],
  ['平安银行', {name: '平安银行', icon: '/static/bank-icon/payh.png' }],
  ['光大银行', {name: '光大银行', icon: '/static/bank-icon/gdyh.png' }],
  ['邮政储蓄', {name: '邮政储蓄', icon: '/static/bank-icon/yzcx.png' }],
  ['邮储银行', {name: '邮储银行', icon: '/static/bank-icon/yzcx.png' }],
  ['北京银行', {name: '北京银行', icon: '/static/bank-icon/bjyh.png' }],
  ['上海银行', {name: '上海银行', icon: '/static/bank-icon/shyh.png' }],
  ['南京银行', {name: '南京银行', icon: '/static/bank-icon/njyh.png' }],
  ['宁波银行', {name: '宁波银行', icon: '/static/bank-icon/nbyh.png' }],
])