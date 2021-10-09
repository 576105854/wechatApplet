// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图数据
    recommendList: [], //推荐歌单
    topList: [], //排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let result = await request('/banner',{type:2})
    this.setData({
      bannerList: result.banners
    })

    //获取推荐歌单数据
    let recommendListData = await request('/personalized',{limit:10})
    this.setData({
      recommendList: recommendListData.result
    })

    //获取排行版数据
    let resultArr = [];
    let topListData = await request('/toplist')

    for (let i = 0; i < 5; i++) {
      let id = topListData.list[i].id
      let topListItems = await request('/playlist/detail',{id:id})
      let topListItem = {name: topListItems.playlist.name, tracks: topListItems.playlist.tracks.slice(0,3)}
      resultArr.push(topListItem)
      //不需要等待5次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
      this.setData({
        topList: resultArr
      })   
    }
    //更新topList的状态值，放在此处更新会导致发送请求的过程中页面长时间白屏， 用户体验差
    this.setData({
      topList: resultArr
    })
  },

  //跳转至recommendSong页面的回调
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})