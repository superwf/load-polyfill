import loadPolyfill from '../src/index'

describe('load and return promise', () => {
  it('condition truthy, not call polyfill fn', () => {
    const spy = jest.fn(() => Promise.resolve())
    return loadPolyfill([[true, spy]]).then(() => {
      expect(spy).not.toHaveBeenCalled()
    })
  })

  it('condition is not false, will not call polyfill fn', done => {
    const spy = jest.fn(() => Promise.resolve())
    return loadPolyfill([[true, spy]]).then(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    })
  })

  it('condition is not boolean, should throw', () => {
    const spy = jest.fn(() => Promise.resolve())
    expect(() => loadPolyfill([[null, spy]])).toThrow()
  })

  it('when polyfill fn return false, loadPolyfill catch', () => {
    const spy = jest.fn(() => false)
    return loadPolyfill([[false, spy]]).catch(err => {
      expect(err.toString()).toContain('polyfill load fail')
    })
  })

  it('when polyfill return promise reject, loadPolyfill catch', () => {
    const spy = jest.fn(() => Promise.reject())
    return loadPolyfill([[false, spy]]).catch(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  it('condition is fn', () => {
    const spy = jest.fn(() => Promise.reject())
    return loadPolyfill([[() => false, spy]]).catch(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  it('condition is native Object', done => {
    const spy = jest.fn()
    loadPolyfill([['Map' in global, spy]])
    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    })
  })
})
