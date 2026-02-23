export function debounce(fn, delay = 200) {
  let timer
  function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
  debounced.cancel = () => {
    clearTimeout(timer)
  }
  return debounced
}
