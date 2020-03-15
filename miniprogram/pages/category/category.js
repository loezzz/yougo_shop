// pages/category/category.js
import { request } from "../../request/index.js";

Page({
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧商品数据
    rightContent: [],
    //被点击的左侧的菜单
    currentIndex: 0,
    //右侧内容滚动条距离顶部的距离
    scrollTop:0

  },
  //接口返回数据
  Cates: [],
  onLoad: function (options) {
    // 关于缓存
    // 0、web中的本地存储和小程序中的本地存储的区别
    //  1、写代码的方式不一样
    //   web: licalStorage.setItem{"key","value"}  licalStorage.getItem{"key"}
    //   小程序：wx.setStorageSync("cates", {"key","value"}); wx.getStorageSync("key");
    //  2、存的时候有没有做类型转换
    //   web：不管存入的是什么类型的数据，最终都会先调用一下toString() 把数据变成了字符串 再存入
    //   小程序：不存在类型转换的操作
    // 1、先判断一下本地存储中有没有旧的数据
    // 数据格式{time:date.now(),data:[...]}
    // 2、没有旧数据 直接发送新请求
    // 3、有旧数据 同时 旧数据也没有过期 就使用本地存储中的旧数据即可

    //步骤1：获取本地存储的数据（小程序中也是存在本地存储技术）
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      //不存在数据，发送请求获取数据
      this.getCates();
    } else {
      //有旧数据 定义一个过期时间 10S 改成5mins
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新发送请求
        this.getCates();
      } else {
        //可以使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }

    }
  },
  //获取分类数据
  getCates() {
    request({
      url: "/categories"
    }).then((res) => {
      this.Cates = res.data.message;
      //把接口的数据存入到本地存储中
      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      //构造左侧大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      });
    });
  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    // 1、获取被点击的标题身上的索引
    // 2、给data中的currentIndex赋值
    // 3、根据不同的索引渲染右侧的内容
    const { index } = e.currentTarget.dataset;
    //构造右侧的商品数据
    let rightContent = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置右侧内容的scroll-view的距离顶部的距离
      scrollTop:0
    });
    

  }
})