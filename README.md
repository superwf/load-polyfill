# load-polyfill

### Load which and how many polyfill? Depend on yourself

### Notice: this package depend on global Promise, if your dest env does not contain Promise, polyfill it first. For example:
```ecmascript
import 'es6-promise/auto'
```

### Usage

loadPolyfill accept an array of two dimesions

in each one item[0] should be boolean or function, when function it should return bool in sync code

in each one item[1] could be string or function, when function it should return promise

it return promise, call your main code in 'then' method


### Example

```ecmascript
import loadPolyfill from 'load-polyfill'

// here use dynimic import and webpack code spliting feature.
loadPolyfill([
  ['isArray' in Array, 'core-js/fn/array/is-array'],
  // when the second is fn, it must return promise
  ['isArray' in Array, () => import('lodash/isArray').then(module => Array.isArray = module)],
  ['from' in Array, 'core-js/fn/array/from'],
  [() => 'find' in Array.prototype, 'core-js/fn/array/find'], // will call dynimic import('core-js/fn/array/find')
  [() => 'find' in Array.prototype, () => import('core-js/fn/array/find')], // or run your own logic
  [() => {
    // some code to test env does not have Map
    return 'Map' in global
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

### Reference Articles

  [loading-polyfills-only-when-needed](https://philipwalton.com/articles/loading-polyfills-only-when-needed/)
