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