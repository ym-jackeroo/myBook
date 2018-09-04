import {fetch} from '../../utils/util.js'

Page({
  data: {
    bookId:"",
    bookData:{},
    isLoading:false
  },
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    }),
    this.getData()
  },
  getData(){
    this.setData({
      isLoading:true
    }),
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      this.setData({
        bookData:res,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },
  jumpCatalog(event){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
  onShareAppMessage: function () {
  
  }
})