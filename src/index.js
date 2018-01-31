const isPromise = obj => obj && 'then' in obj

/*
 * @param {array} polyfills array, each item should be an array of two items,
 * in each item array, first is condition, last is the polyfill to load.
 * * first item could be object/function.
 * * * function should always return bool to determin whether to call the last item.
 * * last item could be string/function.
 * * * when string, it would be called by dynimic import.
 * @return {object}, Promise instance
 * */
function loadPolyfill(polyfills) {
  if (process.env.NODE_ENV !== 'production') {
    const isArray = require('lodash/isArray')
    if (!isArray(polyfills)) {
      throw new Error('arg polyfills must be array')
    }
  }

  const promises = []
  // just use for loop, because the env may not has forEach or reduce support
  for (let o in polyfills) {
    const polyfill = polyfills[o]
    const condition =
      typeof polyfill[0] === 'function' ? polyfill[0]() : polyfill[0]
    if (!condition) {
      if (typeof polyfill[1] === 'function') {
        const polyfillResult = polyfill[1]()
        if (isPromise(polyfillResult)) {
          promises.push(polyfillResult)
        } else if (!polyfillResult) {
          promises.push(Promise.reject(`polyfills[${o}] polyfill load fail`))
        }
      }
    }
  }

  return Promise.all(promises)
}

export default loadPolyfill
