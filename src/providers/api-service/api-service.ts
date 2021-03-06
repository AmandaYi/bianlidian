import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpServiceProvider } from '../http-service/http-service';
import { SERVER_URL } from '../constants/constants';


@Injectable()
export class ApiServiceProvider {

  constructor(public http: HttpServiceProvider) {
    console.log('Hello AipServiceProvider Provider');
  }

  public SHOPID;


  /*********************home.ts**************************** */

  /**
* @name  购物车数量
*/
  shopcarNum() {
    let params = {
      tokenid: localStorage.getItem('tokenId'),
      userAgent: localStorage.getItem('userAgent'),
    }
    return this.http.get('/api/shop/shopcar/odShopcarDetail/shpocarinfo/' + localStorage.getItem('shopId'), params)
  }

  /**
   * @name 商品详细信息
   * @param itemid 
   */
  itemInfo(itemid) {
    return this.http.get('/api/shop/product/goods/' + itemid)
  }


  /**
   * @name 收藏
   * @param itemid  
   * @param type  prod:商品；shop:店铺
   */
  favorite(itemid, type) {
    let params = {
      bids: itemid,
      type: type,
      tokenid: localStorage.getItem('tokenId'),
      userAgent: localStorage.getItem('userAgent'),
    }
    return this.http.post('/api/shop/collection/favorite/', params)
  }

  /**
   * @name 取消收藏
   * @param itemid 
   * @param type prod:商品；shop:店铺
   */
  cancelcollect(itemid, type) {
    let params = {
      bid: itemid,
      type: type,
      tokenid: localStorage.getItem('tokenId'),
      userAgent: localStorage.getItem('userAgent'),
    }
    return this.http.post('/api/shop/collection/favorite/', params)
  }

  /**
   * @name 加入购物车
   * @param itemid 
   * @param productQty 数量
   */
  add(itemid, productQty = 1) {
    let params = {
      itemid: itemid,
      productQty: productQty,
      tokenid: localStorage.getItem('tokenId'),
      userAgent: localStorage.getItem('userAgent'),
    }
    // console.log(params);

    return this.http.postFormData('/api/shop/shopcar/odShopcarDetail/add', params)
  }


  /**
   * @name 默认地址
   */
  getAddressDefByPassId() {
    let params = {
      passId: localStorage.getItem('userId')
    }
    // console.log(params);

    return this.http.get('/api/shop/address/msAddress/getAddressDefByPassId', params)
  }

  /**
   * @name 优惠券
   * @param status 
   * @param page 
   * @param size 
   */
  couponActivityListByPassId(status = 0, page = 1, size = 8) {
    let params = {
      tokenId: localStorage.getItem('tokenId'),
      status: status,
      page: page,
      size: size,
      userAgent: localStorage.getItem('userAgent'),
    }
    // console.log(params);

    return this.http.get('/api/shop/couponActivity/couponActivityListByPassId', params)
  }



  /**
   * @name  商品清单接口
   * @param items {itemid: '', quantity: '' }此数组
   */
  getOdProds(items) {
    let params = {
      tokenid: localStorage.getItem('tokenId'),
      userAgent: localStorage.getItem('userAgent'),
      shopid: localStorage.getItem('shopId'),
      items: items,
    }
    // console.log(params);

    return this.http.postFormData('/api/shop/order/orderPreview/getOdProds', params)
  }


  /**
   * @name 查询我的余额
   */
  getBalanceAll() {
    let params = {
      userAgent: localStorage.getItem('userAgent'),
      userToken: localStorage.getItem('userToken'),
      userCode: localStorage.getItem('userCodes'),
    }
    // console.log(params);

    return this.http.get('/api/shop/lmcard/getBalanceAll', params)
  }


  /**
   * @name 订单提交
   * @param odBase 
   *   odBase = {
   *                   shopid: Variable.getInstance().shopid, //商店ID
   *                   transportType: Since,//配送方式(0:配送,1:自提)
   *                   transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
   *                   transportEndTime: this.now + ' ' + timeh,//配送结束时间
   *                   userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
   *                   userName: this.username,//收货人名称
   *                   userMobile: this.mobileno,//收货人电话
   *                   isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
   *                   couponId: this.couponActivityId, //优惠券ID
   *                   couponMsPassRelationId: this.id,//优惠券关联ID
   *                   usedCouponAmount: this.amount,//优惠券金额
   *                   orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
   *                   receivable: this.ordery,//应收(订单总价-优惠券金额)
   *                   payType: 3 //支付状态
   *                 };
   * @param odProductList   
   *          odProduct.push({
   *           itemid: this.carPile[i].ids,//商品ID
   *           productName: this.carPile[i].name,//商品名称
   *           productTitle: this.carPile[i].title,//商品标题
   *           productQty: this.carPile[i].num,//商品数量
   *           salePrice: this.carPile[i].sprice,//商品单价
   *           productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
   *           shopid: Variable.getInstance().shopid, //商家ID
   *           isUseActivity: 0//是否是活动价(0:否,1:是)
   *        })
   */
  submitOrder(odBase, odProductList) {

    let params = {
      tokenid: localStorage.getItem('tokenId'),
      userAgent: localStorage.getItem('userAgent'),
      odProductList: odProductList,
      odBase: odBase,
    }
    // console.log(params);

    return this.http.postFormData('/api/shop/order/submitOrder', params)
  }



/**
 * @name 预支付信息生成1
 * @param orderno 提交订单的接口生成的orderNo字段
 * @param amount  订单总价(所有商品单价*数量的和)
 */
  generatePayment(orderno, amount){

    let params = {
      orderno: orderno,
      amount: amount,
    }
    // console.log(params);

    return this.http.get('/api/shop/lmcard/generatePayment', params)
  }


/**
 * @name 预支付信息2
 * @param prepayNo 预支付信息生成1 generatePayment() 接口返回的prepayNo
 * @param timestamp 预支付信息生成1 generatePayment() 接口返回的systemTime
 * @param userPayInfo ???
 */
  confirmPay(prepayNo, timestamp, userPayInfo){
    let params = {
      prepayNo: prepayNo, 
      timestamp: timestamp, 
      userPayInfo: userPayInfo
    }
    // console.log(params);

    return this.http.get('/api/shop/lmcard/confirmPay', params)
  }


/**
 * @name 支付完成后删除当前商品
 * @param itemids 数组
 * {
    itemid: this.carPile[i].ids,//商品ID
    productName: this.carPile[i].name,//商品名称
    productTitle: this.carPile[i].title,//商品标题
    productQty: this.carPile[i].num,//商品数量
    salePrice: this.carPile[i].sprice,//商品单价
    productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
    shopid: Variable.getInstance().shopid, //商家ID
    isUseActivity: 0//是否是活动价(0:否,1:是)
  }
 */
  deleteByItem(itemids){
    let params = {
      tokenid: localStorage.getItem('tokenId'),
      userAgent: localStorage.getItem('userAgent'),
      shopid: localStorage.getItem('shopId'),
      itemids: itemids, 
    }
    // console.log(params);

    return this.http.postFormData('/api/shop/lmcard/confirmPay', params)
  }

/**
 * @name 店铺分类是否享受折扣-判断
 * @param itm   itm.push(this.carPile[i].ids)//商品ID的集合
 */
  isDiscounts(itm){
    let params = {
      shopId: localStorage.getItem('shopId'),
      productIds: itm.toString(),
    }
    // console.log(params);
    return this.http.get('/api/shop/product/prodProduct/isDiscounts', params)
  }


  /**
   * @name 实现了否享受折扣-判断后调用的
   */
  getDiscountRatio(){
    let params = {
      shopid: localStorage.getItem('shopId'),
    }
    console.log(params);
    
    return this.http.get('/api/shop/shopActivity/activity/getDiscountRatio', params)
  }





/************************Mine.ts 个人中心 ***************************************/

/**
 * @author qiyue
 * @returns userData
*/

msMember(){
  let params = {
    userId: localStorage.getItem('userId'),
 
  }
  console.log(params);
  return this.http.get('/api/shop/member/msMember/'+localStorage.getItem('userId'), params)
}
 


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  //  list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  //  list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }



  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  //  list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  //  list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  //  list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  //  list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  //  list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }


  // list(code) {
  //   let param = {
  //     code: code,
  //   }
  //   return this.http.get('api/shop/home/list/', param)
  // }

}
