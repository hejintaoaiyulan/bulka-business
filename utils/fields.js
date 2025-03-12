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