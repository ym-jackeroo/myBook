// pages/mine/mine.js
import { fetch } from '../../utils/util.js'

Page({
  data: {
    collectNum:"",
    isLoading:false
  },
  onLoad: function (options) {
    this.getCollectNum()
  },
  getCollectNum(){
    this.setData({
      isLoading:true
    })
    return new Promise((resolve)=>{
      fetch.get('/collection/total').then(res => {
        resolve()
        this.setData({
          collectNum: res.data,
          isLoading:false
        })
      }).catch(err=>{
        this.setdata({
          isLoading:false
        })
      })
    })
  },
  handleColletion(){
    wx.navigateTo({
      url: "/pages/collection/collection",
    })
  },
  onPullDownRefresh() {
    this.getCollectNum().then(() => {
      wx.stopPullDownRefresh()
    })
  },
  onShareAppMessage: function () {
  
  }
})