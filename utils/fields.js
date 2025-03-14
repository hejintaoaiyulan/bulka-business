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