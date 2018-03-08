import Vue from 'vue'
import Router from 'vue-router'
import stock from '../pages/stock'
import comment from '../pages/comment'
import first from '../pages/first'
import mine from '../pages/mine'
import zyts from '../pages/zyts'
import zytsStockPool from '../pages/zytsStockPool'
import zytsDetails from '../pages/zytsDetails'
import stockDetails from '../pages/stockDetails'
import optional from '../pages/optional'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/stock',
      component: stock
    },{
      path: '/comment',
      component: comment
    },{
      path: '/first',
      component: first
    },{
      path: '/mine',
      component: mine
    },{
      path: '/zyts',
      component: zyts
    },{
      path: '/zytsStockPool',
      component: zytsStockPool
    },{
      path: '/zytsDetails',
      component: zytsDetails
    },{
      path: '/stockDetails',
      component: stockDetails
    },{
      path: '/optional',
      component: optional
    },{
      path: '*',
      component: first
    }
  ]
})
