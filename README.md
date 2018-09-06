# scroll-anchoring

Scroll Anchoring preserves the user's scroll position while DOM mutations change the page.

While dynamic adding, removing and updating elements on a page is useful, it is often jarring to the user to have contents shift while they are reading or attempting to click on a button. Scroll anchoring helps alleviate these user experience issues by locking the scroll position to an anchor node while page updates are performed.

## Installation

```
$ npm install scroll-anchoring
```

## Usage

The `preserveAnchorNodePosition` function is given a mutation callback to apply to the document. The scroll offset is recorded before and after applying the callback. Then the scroll position is adjusted to lock the anchor node in the same position. The helper will automatically try to detect the best anchor node in the current document.

```js
import {preserveAnchorNodePosition} from 'scroll-anchoring'

const comments = document.getElementById('comments')
preserveAnchorNodePosition(document, () => {
  comments.insertAdjacentHTML('beforeend', newCommentHtml)
})
```

You can use your own anchor node if you don't want to rely on scroll anchoring's internal heuristic.

```js
import {preservePosition} from 'scroll-anchoring'

const button = document.getElementById('button.expand-contents')
button.addEventListener('click', () => {
  const contents = document.getElementById('contents')

  // keep position locked to the button they just clicked after revealing the contents
  preservePosition(button, () => {
    contents.hidden = false
  })
})
```

## Browser support

- Chrome
- Firefox
- Safari
- Internet Explorer 11
- Microsoft Edge

## Development

```
npm install
npm test
```

## See Also

- [CSS Scroll Anchoring Module Level 1](https://drafts.csswg.org/css-scroll-anchoring/)
- [WICG/ScrollAnchoring](https://github.com/WICG/ScrollAnchoring)
- [Chrome Platform Status - Intervention: Scroll Anchoring](https://www.chromestatus.com/feature/5700102471548928)

## License

Distributed under the MIT license. See LICENSE for details.
