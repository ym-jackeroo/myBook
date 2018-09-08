import {fetch} from '../../utils/util.js'

Page({
  data: {
    bookId:"",
    bookData:[],
    isLoading:false,
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
  checkCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
  handleCollect(){
    fetch.post('/collection',{
      bookId: this.data.bookId
    }).then(res =>{
      if(res.code == 200){
        wx.showToast({
          title: '收藏成功',
          type:'success',
          duration:1000
        })
        let bookData =this.data.bookData
        bookData.isCollect = 1
        this.setData({
          bookDate:bookData
        })
      }
      this.getData()
    })
  },
  handleDelete(){
    fetch.delete(`/collection/${this.data.bookId}`).then(res=>{
      if (res.code == 200) {
        wx.showModal({
          title: '删除收藏',
          content: '确定取消收藏？',
          success:res=>{
            if(res.confirm){
              this.getData()
            }else if(res.cancel){

            }
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title:this.data.bookData.data.title,
      path:`/pages/details/details?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }
})