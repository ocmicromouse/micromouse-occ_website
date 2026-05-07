# MicroMouse @ OCC Website

This is a static, easily editable website for Orange Coast College's MicroMouse club.

## Edit the content

Most site copy lives in `content.js`.

- Update meeting time, room, contact links, and policy details in the `club` object.
- Update intro and join text in the `intro` and `join` arrays.
- Add new sections later when the club is ready to publish its own material.

## Preview locally

Open `index.html` directly in a browser, or run a tiny local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Current scope

This site currently keeps only the landing page, club information, and sign-up content.
Curriculum-style material has been removed so OCC can publish its own information later.
