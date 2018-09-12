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

## Origins

Circa 2012, I was implementing ajax and live updates for GitHub's Issue and PR discussion pages. So when you typed a comment and hit submit we'd dynamically insert it on the page without a full page refresh. In addition, any comments left by others would be inserted into the discussion thread in real time.

One usability annoyance with the initial concept was that inserting new comments and updating other elements would cause the user scroll position to unexpectedly jump up or down. You might be reading a comment while a new one came in and pushed it out the viewport. Or you'd be typing in the textarea and new comments would push the field out of the viewport. Pretty annoying.

The idea was to detect an anchor node on the screen that we thought the user would most care about. Then keep that node at the same viewport offsets after applying a page update. If you're actively typing in a field, pick that input or textarea as the anchor node. Or if you're scrolling around the page with a mouse over a comment while reading, we choose that element.

The affect is that the page appears to grow up or down depending on how your interacting with it as the update comes in.

While reading the comment timeline, new comments are appended to the bottom of the thread with no viewport adjusts.

<img width="400" src="https://user-images.githubusercontent.com/137/45395949-6d464b00-b5ed-11e8-9240-600daf4935ea.gif">

But, while focused on the comment textarea, the comment timeline appears to grow upwards instead.

<img width="400" src="https://user-images.githubusercontent.com/137/45395943-6ae3f100-b5ed-11e8-94cf-32eb89aedad2.gif">

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
