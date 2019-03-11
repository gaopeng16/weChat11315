import config from "../config";

//get请求
function get(url, data) {
  return request(url, "GET", data);
}
//post请求
function post(url, data) {
  return request(url, "POST", data);
}
//request请求
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: config.host + url,
      success: res => {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          if (res.data.message != undefined) {
            showModal("失败", res.data.message);
          }
          resolve(res.data);
        }
      }
    });
  });
}

//get请求（非标准：在请求的位置解析）
function _get(url, data) {
  return _request(url, "GET", data);
}
//post请求（非标准：在请求的位置解析）
function _post(url, data) {
  return _request(url, "POST", data);
}
//request请求（非标准：在请求的位置解析）
function _request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: res => {
        resolve(res);
      }
    });
  });
}

function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  });
}

function showToast(text, icon) {
  wx.showToast({
    title: text,
    icon: icon
  });
}

function hideToast() {
  wx.hideToast();
}

function showLoading(title) {
  wx.showLoading({
    title: title ? title : "努力加载中..."
  });
}

function hideLoading() {
  wx.hideLoading();
}

function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}
//时间格式转换
function formatTime(date, type = 1) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("-");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return type == 1 ? `${t1} ${t2}` : `${t1}`;
}

//排序
function compare(propertyName, type) {
  if (type === 'asc') {
    return function (obj1, obj2) {
      let value1 = obj1[propertyName];
      let value2 = obj2[propertyName];
      if (value1 > value2) {
        return 1;
      } else if (value1 < value2) {
        return -1;
      } else {
        return 0;
      }
    }
  } else if (type === 'desc') {
    return function (obj1, obj2) {
      let value1 = obj1[propertyName];
      let value2 = obj2[propertyName];
      if (value1 > value2) {
        return -1;
      } else if (value1 < value2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}

export {
  get,
  post,
  _get,
  _post,
  formatTime,
  showModal,
  hideToast,
  showLoading,
  showToast,
  hideLoading,
  compare
};
