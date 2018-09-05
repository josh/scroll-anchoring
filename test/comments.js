/* global ScrollAnchoring */

function randomComment() {
  const comments = Array.from(document.querySelectorAll('#comments > p')).sort(() => 0.5 - Math.random())
  let findAnchorNode = ScrollAnchoring.findAnchorNode(document)
  if (findAnchorNode) findAnchorNode = findAnchorNode.closest('p')
  return comments[0] === findAnchorNode ? comments[1] : comments[0]
}

function install() {
  let toInsert

  const speed = document.querySelector('input.speed').value * 500
  document.querySelector('output.speed').value = speed

  let i2
  const t1 = setTimeout(() => {
    i2 = setInterval(() => {
      if (toInsert) {
        ScrollAnchoring.preserveAnchorNodePosition(document, () => {
          document.querySelector('#comments').append(toInsert)
          toInsert = null
        })
      }
    }, speed)
  }, 2000)

  const i3 = setInterval(() => {
    if (!toInsert) {
      ScrollAnchoring.preserveAnchorNodePosition(document, () => {
        toInsert = randomComment()
        toInsert.remove()
      })
    }
  }, speed)

  return function() {
    clearTimeout(t1)
    clearInterval(i2)
    clearInterval(i3)
  }
}

let cleanup

document.querySelector('input.speed').addEventListener('change', () => {
  cleanup()
  cleanup = install()
})

cleanup = install()
