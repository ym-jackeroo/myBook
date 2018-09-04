import {fetch} from '../../utils/util.js'

Page({
  data: {
    bookId:""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      bookId:options.id
    })
    this.getData()
  },
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
    })
  },
  onShareAppMessage: function () {
  
  }
})