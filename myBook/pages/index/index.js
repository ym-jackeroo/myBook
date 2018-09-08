import {
  fetch,
  login
} from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    isLoading: false,
    pn: 1,
    hasMore: true
  },
  onLoad() {
    login();
    this.getAllData();
  },
  getData() {
    return new Promise((resolve, reject) => {
      fetch.get('/swiper').then(res => {
        resolve()
        this.setData({
          swiperData: res.data,
        })
      }).catch(err => {
        this.setData({})
      })
    })
  },
  getContent() {
    return new Promise((resolve, reject) => {
      fetch.get('/category/books').then(res => {
        console.log(res)
        resolve()
        this.setData({
          mainContent: res.data,
        })
      })
    })
  },
  getAllData() {
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true,
        hasMore: true,
        pn: 1
      })
      Promise.all([this.getData(), this.getContent()]).then(() => {
        resolve()
        this.setData({
          isLoading: false
        })
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
    })
  },
  getMoreContent() {
    return new Promise(resolve => {
      fetch.get('/category/books', {
        pn: this.data.pn
      }).then(res => {
        let newArr = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: newArr
        })
        resolve(res)
      })
    })
  },
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },
  handleItem(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },
  onPullDownRefresh() {
    this.getAllData().then(() => {
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  }
})