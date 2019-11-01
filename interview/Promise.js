const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(excutor) {
  let that = this; // 缓存当前promise实例对象
  that.status = PENDING; // 初始状态
  that.value = undefined; // fulfilled状态时 返回的信息
  that.reason = undefined; // rejected状态时 拒绝的原因
  that.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
  that.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数

  function resolve(value) { // value成功态时接收的终值
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    // 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
    setTimeout(() => {
      // 调用resolve 回调对应onFulfilled函数
      if (that.status === PENDING) {
        // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach(cb => cb(that.value));
      }
    });
  }

  function reject(reason) { // reason失败态时接收的拒因
    setTimeout(() => {
      // 调用reject 回调对应onRejected函数
      if (that.status === PENDING) {
        // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.forEach(cb => cb(that.reason));
      }
    });
  }

  // 捕获在excutor执行器中抛出的异常
  // new Promise((resolve, reject) => {
  //     throw new Error('error in excutor')
  // })
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  let newPromise;
  // 处理参数默认值 保证参数后续能够继续执行
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected =
    typeof onRejected === "function" ? onRejected : reason => {
      throw reason;
    };
  if (that.status === FULFILLED) { // 成功态
    return newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
        } catch (e) {
          reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
        }
      });
    })
  }

  if (that.status === REJECTED) { // 失败态
    return newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (that.status === PENDING) { // 等待态
    // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
    return newPromise = new Promise((resolve, reject) => {
      that.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};