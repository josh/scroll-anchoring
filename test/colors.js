/* global PreserveScrollPosition */

document.addEventListener('click', function(event) {
  if (!event.target.matches('.color')) return
  const el = event.target

  const beforeEl = el.cloneNode()
  const afterEl = el.cloneNode()
  beforeEl.style.background = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  afterEl.style.background = `#${Math.floor(Math.random() * 16777215).toString(16)}`

  PreserveScrollPosition.preservingScrollPosition(el, () => {
    el.insertAdjacentElement('beforebegin', beforeEl)
    el.insertAdjacentElement('afterend', afterEl)
  })
})
