// pages/goods_list/goods_list.js
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive: true
      },
      {
        id:1,
        value:"销量",
        isActive: false
      },
      {
        id:2,
        value:"价格",
        isActive: false
      }
    ]
  },

  onLoad: function (options) {
    console.log(options);
    
  },
  // 标题点击事件 从子组件传递来的
  handleTabsItemChange(e){
    // 1、获取被点击的标题索引
    const {index}=e.detail;
    // 2、修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    // 3、赋值到data中
    this.setData({
      tabs
    });
  }
})