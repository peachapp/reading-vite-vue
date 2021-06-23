import axios from "axios";
// import router from 'umi/router';
import { Dialog } from 'vant';
// import store from '@/store';


/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 60000 // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(response => {
  if (response.headers.authorization) {
    let authorization = response.headers.authorization
    if (authorization.startsWith('Bearer ') || authorization.startsWith('bearer ')) {
      // store.dispatch('SetToken', authorization)
    }
  } else if (!response.headers.authorization) {
    response.headers.authorization = localStorage.getItem('TOKEN') ? 'Bearer ' + localStorage.getItem('TOKEN') : "";
  }

  if (response.data && response.data.meta && response.data.meta.success === false) {
    return Promise.reject(response)
  }

  return response
  // config.method === 'post'
  //     ? config.data = qs.stringify({ ...config.data })
  //     : config.params = { ...config.params };
  //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

}, error => { //请求错误处理
  // app.$vux.toast.show({
  //     type: 'warn',
  //     text: error
  // });
  Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => { //成功请求到数据
    //app.$vux.loading.hide();
    //这里根据后端提供的数据进行对应的处理
    if (response.data.code === 200) {
      return response.data;
    } else if (response.data.code === 401) {
      localStorage.removeItem("TOKEN");
      // router.push({
      //   pathname: '/login',
      // });
      Dialog.alert({
        title: '请求错误！',
        message: response.data.msg,
      }).then(() => {
        // on close
      });
      return response.data;
    }
    else {
      Dialog.alert({
        title: '请求错误！',
        message: response.data.msg,
      }).then(() => {
        // on close
      });
      return response.data;
    }
  },
  error => { //响应错误处理
    // 如果是某个请求被业务代码, 取消掉导致的错误, 则不处理, 直接将错误返回给业务代码
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    // 401 错误, 重新登录获取token
    if (error.response && error.response.status === 401) {
      // store.dispatch('Login')
      localStorage.removeItem("TOKEN");
      // router.push({
      //   pathname: '/login',
      // });
    };

    const data = error.response.data;
    let errMsg = data.message || data;

    // if (errMsg === '' || errMsg === null || errMsg === undefined) {
    //   errMsg = '获取数据时发生了未知错误'
    // }

    if (errMsg.indexOf('timeout') >= 0) {
      errMsg = '请求超时'
    }

    // if (errMsg) {
    Dialog.alert({
      title: '请求错误！',
      message: errMsg || '获取数据时发生了未知错误',
    }).then(() => {
      // on close
    });
    // };
    // Toast(errMsg);
    // Notify({
    //   message: errMsg,
    //   background: '#ff4444',
    //   duration: 5000
    // })
    // let text = JSON.parse(JSON.stringify(error)).response.status === 404
    //         ? '404'
    //         : '网络异常，请重试';
    // app.$vux.toast.show({
    //     type: 'warn',
    //     text: text
    // });

    return Promise.reject(error)
  }
);

export default service;