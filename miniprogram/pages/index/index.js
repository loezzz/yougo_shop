//引用用来发送请求的方法
import{ request } from"../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航 数组
    catesList:[],
    //楼层数据
    floorList:[]
  },

 //页面开始加载就会触发
  onLoad: function (options) {
    //1、发送异步请求，优化的手段可以通过es6的promise来解决这个问题
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     });
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
},

//获取轮播图数据的方法
getSwiperList(){
  request({url:"/home/swiperdata"})
  .then(result=>{
    this.setData({
    swiperList:result.data.message
    })
  })
  },

  //获取导航栏数据的方法
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result.data.message
      })
    })
    },

    //获取楼层数据的方法
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
    },
})