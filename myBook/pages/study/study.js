// pages/study/study.js
import { fetch } from '../../utils/util.js'

Page({
  data: {
    bookReading:{},
    isLoading:false
  },
  onLoad: function (options) {
    this.getReading()
  },
  getReading(){
    this.setData({
      isLoading: true
    })
    return new Promise(resolve=>{
      fetch.get('/readList').then(res => {
        resolve()
        this.setData({
          bookReading: res.data,
          isLoading: false
        })
      }).catch(err=>{
        this.setData({
          isLoading: false
        })
      })
    })
  },
  toview(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}`,
    })
  },
  onPullDownRefresh() {
    this.getReading().then(() => {
      wx.stopPullDownRefresh()
    })
  },
  onShareAppMessage: function () {
  
  }
})