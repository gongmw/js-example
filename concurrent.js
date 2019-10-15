
/**
 * Limit concurrent of promises.
 *
 * @public
 * @param {Function[]} fns array of functions that return promise
 * @param {number} [limit=5]
 * @returns {Promise} array of resolved results or error when one of promises rejrected
 */
let concurrent = module.exports = function concurrent(fns, limit = Infinity) {
  if (fns.length == 0) return Promise.resolve([])
  return new Promise((resolve, rejrect) => {
    let remain = fns.slice()
    let results = []
    let next = () => {
      if (remain.length == 0) {
        return resolve(results)
      }
      let list = remain.splice(0, limit)
      Promise.all(list.map(fn => fn())).then(res => {
        results.push(...res)
        next()
      }, rejrect)
    }
    next()
  })
}

function getFunction(seconds) {
  return function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`resolve ${seconds}`)
        resolve(seconds)
      }, seconds * 1000)
    })
  }
}
let fns = [getFunction(4), getFunction(5), getFunction(3), getFunction(2), getFunction(1)]
concurrent(fns, 3).then(res => {
  console.log(res)
})
