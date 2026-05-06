# MicroMouse @ OCC Website

This is a static, easily editable website for Orange Coast College's MicroMouse club.

## Edit the content

Most site copy lives in `content.js`.

- Update meeting time, room, contact links, and policy details in the `club` object.
- Update curriculum cards in the `modules` array.
- Update the academic-year pacing in the `schedule` array.
- Update events, logistics, and join instructions in their matching arrays.

## Preview locally

Open `index.html` directly in a browser, or run a tiny local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Source inspiration

The technical curriculum was adapted and rewritten for OCC students from the public IEEE at UCLA MicroMouse project documentation:

https://projects.ieeebruins.com/micromouse/
