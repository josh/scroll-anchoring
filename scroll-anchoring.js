/* eslint no-restricted-globals: ["error", "document", "window"] */

// Public: Preserves scroll position of interactive element.
//
// callback - Function to call that may change the scroll position.
//
// Returns result of `callback` function.
export function preserveAnchorNodePosition(document, callback) {
  preservePosition(findAnchorNode(document), callback)
}

// Preserves scroll position of anchor node.
//
// node     - Node
// callback - Function to call that may change the scroll position.
//
// Returns result of `callback` function.
export function preservePosition(anchorNode, callback) {
  let node = anchorNode
  if (!node) {
    return callback()
  }

  const documentElement = node.ownerDocument.documentElement

  function computeAncestorBoundingRects(element) {
    const rects = []
    while (element) {
      const {top, left} = element.getBoundingClientRect()
      rects.push({element, top, left})
      element = element.parentElement
    }
    return rects
  }

  function firstAttachedBoundingRect(rects) {
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i]
      if (documentElement.contains(rect.element)) {
        return rect
      }
    }
  }

  const origBoundingRects = computeAncestorBoundingRects(node)

  const result = callback()

  const origBoundingRect = firstAttachedBoundingRect(origBoundingRects)
  if (origBoundingRect) {
    node = origBoundingRect.element
    const origTop = origBoundingRect.top
    const origLeft = origBoundingRect.left
    const {top, left} = node.getBoundingClientRect()

    cumulativeScrollBy(node, left - origLeft, top - origTop)
  }

  return result
}

// Public: Detect primary interactive node on the page.
//
// Attempts to guess which element on the page the user has their primary
// attention on. When using a mouse its usually whatever they are hovering
// over. But if they have focus on some field consider that over the mouse
// position.
//
// Returns an Node or null.
export function findAnchorNode(document) {
  if (document.activeElement !== document.body) {
    return document.activeElement
  }
  const hoverElements = document.querySelectorAll(':hover')
  const len = hoverElements.length
  if (len) {
    return hoverElements[len - 1]
  }
}

// Scroll container and any scroll ancestors until the desired offset is reached.
//
// Positive co-ordinates will scroll to the right and down the page. Negative
// values will scroll to the left and up the page.
//
// node - HTMLElement
// x    - The Number offset in pixels to scroll horizontally.
// y    - The Number offset in pixels to scroll vertically.
//
// Returns nothing.
function cumulativeScrollBy(element, x, y) {
  const document = element.ownerDocument
  const window = document.defaultView

  function scrollOffsets(element) {
    if (element.offsetParent) {
      return {
        top: element.scrollTop,
        left: element.scrollLeft
      }
    } else {
      return {
        top: window.pageYOffset,
        left: window.pageXOffset
      }
    }
  }

  function scrollBy(element, x, y) {
    if (x === 0 && y === 0) {
      return [0, 0]
    }

    const origScroll = scrollOffsets(element)
    const top = origScroll.top + y
    const left = origScroll.left + x

    if (
      element === document ||
      element === window ||
      element === document.documentElement ||
      element === document.body
    ) {
      document.defaultView.scrollTo(left, top)
    } else {
      element.scrollTop = top
      element.scrollLeft = left
    }

    const newScroll = scrollOffsets(element)
    return [newScroll.left - origScroll.left, newScroll.top - origScroll.top]
  }

  function overflowParent(el) {
    let element = el
    if (!element.offsetParent || element === document.body) {
      return
    }

    while (element !== document.body) {
      if (element.parentElement) {
        element = element.parentElement
      } else {
        return
      }

      const {position, overflowY, overflowX} = window.getComputedStyle(element)
      if (
        position === 'fixed' ||
        overflowY === 'auto' ||
        overflowX === 'auto' ||
        overflowY === 'scroll' ||
        overflowX === 'scroll'
      ) {
        break
      }
    }

    return element
  }

  let container = overflowParent(element)
  let cumulativeX = 0
  let cumulativeY = 0

  while (container) {
    const scrolled = scrollBy(container, x - cumulativeX, y - cumulativeY)
    cumulativeX += scrolled[0]
    cumulativeY += scrolled[1]

    if (cumulativeX === x && cumulativeY === y) {
      break
    }

    container = overflowParent(container)
  }
}
