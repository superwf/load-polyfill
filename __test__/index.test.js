import loadPolyfill from '../src/index'

describe('load and return promise', () => {
  it('condition truthy, not call polyfill fn', () => {
    const spy = jest.fn(() => Promise.resolve())
    return loadPolyfill([[true, spy]]).then(() => {
      expect(spy).not.toHaveBeenCalled()
    })
  })

  it('condition falsy, call polyfill fn', () => {
    const spy = jest.fn(() => Promise.resolve())
    return loadPolyfill([[undefined, spy]]).then(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  it('when polyfill fn return false, loadPolyfill catch', () => {
    const spy = jest.fn(() => false)
    return loadPolyfill([[undefined, spy]]).catch(err => {
      expect(err.toString()).toContain('polyfill load fail')
    })
  })

  it('when polyfill return promise reject, loadPolyfill catch', () => {
    const spy = jest.fn(() => Promise.reject())
    return loadPolyfill([[undefined, spy]]).catch(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  it('condition is fn', () => {
    const spy = jest.fn(() => Promise.reject())
    return loadPolyfill([[() => undefined, spy]]).catch(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  it('condition is native Object', done => {
    const spy = jest.fn()
    loadPolyfill([[Map, spy]])
    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    })
  })
})
