// pages/collection/collection.js
import {
  fetch
} from '../../utils/util.js'

Page({
  data: {
    bookCollection: {},
    pn:1,
    size:100,
  },
  onLoad: function(options) {
    this.setData({
      bookId: options
    })
    this.getCollcetion()
  },
  getCollcetion() {
    fetch.get('/collection',{
      pn:this.data.pn,
      size:this.data.size
    }).then(res => {
      this.setData({
        bookCollection: res.data,
      })
    })
  },
  handleItem(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },
  longpress: function (e) {
    wx.showModal({
      title: '提示',
      content: '长按事件被触发',
      success: res => {
        if (res.confirm) {
          fetch.delete(`/collection/${e.currentTarget.dataset.id}`).then(res => {
            this.getCollcetion()
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  onShareAppMessage: function() {

  }
})