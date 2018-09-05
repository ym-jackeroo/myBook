import {fetch} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    titleId: "",
    bookContent: [],
    title: "",
    bookId: "",
    font:40,
    catalog: [],
    isShow: false,
    index:"",
    isLoading:false
  },
  onLoad: function(options) {
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    }),
    this.getData(),
    this.getCatalog()
  },
  getData() {
    this.setData({
      isLoading:true
    })
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      this.setData({
        bookContent: res.data.article.content,
        title: res.data.title,
        index:res.data.article.index,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading: false
      })
    })
  },
  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalog: res.data
      })
    })
  },
  toggleCatalog() {
    let isShow = !this.data.isShow;
    this.setData({
      isShow
    })
  },
  handleGet(event) {
    const id = event.currentTarget.dataset.id;
    this.setData({
      titleId: id,
      isShow:false
    }),
    this.getData()
  },
  handleAdd(){
    this.setData({
      font:this.data.font+2
    })
  },
  handleReduce(){
    if(this.data.font<32){
      wx.showToast({
        title: '不能再小了！',
      })
    }else{
      this.setData({
        font:this.data.font-2
      })
    }
  },
  handlePrev(){
    let catalog = this.data.catalog
    if(this.data.index-1>=0){
      this.setData({
        titleId: catalog[this.data.index - 1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: "已是第一章了",
      })
    }
  }, 
  handleNext(){
    let catalog = this.data.catalog
    if(catalog[this.data.index+1]){
      this.setData({
        titleId: catalog[this.data.index + 1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: '已是最后一章了',
      })
    }
  },
  onShareAppMessage: function() {

  }
})