# aboutme

my personal page. nothing special, just html/css/js.

has a bio, links to where you can find me, a projects section that cycles through stuff i made, and a music widget that pulls track info from spotify.

## what's in it

- `index.html` - the page itself
- `style.css` - all the styling, dark theme with some hand-drawn vibe
- `script.js` - renders the projects carousel and fetches spotify track names/covers via oembed
- `src/` - favicon and background texture

## running it

just open `index.html` in a browser. no build step, no node, nothing.

if you want a local server for whatever reason:

```
npx serve
```

or just double-click the file honestly

## stuff used

- vanilla html/css/js, no frameworks
- google fonts (Shadows Into Light, Special Elite)
- spotify oembed api for the music widget (no token needed)
