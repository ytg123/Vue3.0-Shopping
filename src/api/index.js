const url = {
  getProduct:'/products',
  addCarts:'/carts',
  selectAll:'/carts/selectAll',
  unSelectAll:'/carts/unSelectAll',
  logIn:'/user/login',
  register:'/user/register',
  getUserInfo:'/user',
  logOut:'/user/logout',
  getCartsSum:'/carts/products/sum',
  getAddressList:'/shippings',
  orders:'/orders',
  pay:'/pay'
}

for(let v in url){
  url[v] = 'proxy' + url[v]
}

export default url
