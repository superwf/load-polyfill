# load-polyfill

### Load which and how many polyfill? Depend on yourself

### Notice: this package depend on global Promise, if your dest env does not contain Promise, polyfill it first. For example:
```ecmascript
import 'es6-promise/auto'
```

### Usage

loadPolyfill accept an array of two dimesions

in each one item[0] could be object or function, when function it should return bool in sync code

in each one item[1] could be string or function

it return promise, call your main code in 'then' method


### Example

```ecmascript
import loadPolyfill from 'load-polyfill'

// here use dynimic import and webpack code spliting feature.
loadPolyfill([
  [Array.isArray, 'core-js/fn/array/is-array'],
  // when the second is fn, it must return promise
  [Array.isArray, () => import('lodash/isArray').then(module => Array.isArray = module)],
  [Array.from, 'core-js/fn/array/from'],
  [() => Array.prototype.find, 'core-js/fn/array/find'], // will call dynimic import('core-js/fn/array/find')
  [() => Array.prototype.find, () => import('core-js/fn/array/find')], // or run your own logic
  [() => {
    // some code to test env does not have Map
    return window.Map
  }, () => import('es6-map/polyfill')],
]).then(() => {
  // load your main code here
  // for example
  ReactDom.render(<App />, document.querySelector('#main'))
})

```

### Pitfalls

polyfills list have to be maintained manually, depend on your dest browser env.

### License

MIT
