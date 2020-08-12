import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "Home" */ '../views/Home.vue'),
    children: [{
        path: 'Index',
        name: 'Index',
        component: () => import( /* webpackChunkName: "Home" */ '../views/Index.vue'),
      },
      {
        path: 'Product/:id',
        name: 'Product',
        component: () => import( /* webpackChunkName: "Home" */ '../views/Product.vue'),
      },
      {
        path: 'Detail/:id',
        name: 'Detail',
        component: () => import( /* webpackChunkName: "Home" */ '../views/Detail.vue'),
      },
    ]
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: () => import( /* webpackChunkName: "Home" */ '../views/Cart.vue'),
  },
  {
    path: '/Order',
    name: 'Order',
    component: () => import( /* webpackChunkName: "Home" */ '../views/Order.vue'),
    children: [{
        path: '',
        redirect: '/List'
      },
      {
        path: 'List',
        name: 'OrderList',
        component: () => import( /* webpackChunkName: "Home" */ '../views/OrderList.vue'),
      },
      {
        path: 'Pay',
        name: 'OrderPay',
        component: () => import( /* webpackChunkName: "Home" */ '../views/OrderPay.vue'),
      },
      {
        path: 'Confirm',
        name: 'OrderConfirm',
        component: () => import( /* webpackChunkName: "Home" */ '../views/OrderConfirm.vue'),
      },
      {
        path: 'Alipay',
        name: 'Alipay',
        component: () => import( /* webpackChunkName: "Home" */ '../views/Alipay.vue'),
      },
    ]
  },
  
  {
    path: '/Login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Home" */ '../views/Login.vue'),
  },
  {
    path: '/*',
    redirect: '/Login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
