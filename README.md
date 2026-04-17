# ESC 311 Web Design Practical (2024/2025)

This folder is an **exam-ready** multi-page website that answers the questions on the practical sheet:

- Home (`index.html`)
- About / Biography (`about.html`)
- Contact (`contact.html`)
- ESC page with **3 labeled photos** (`esc.html`)
- Advertisement page with **many adverts + CSCU logo + ESC logo** (`advertisement.html`)

## How to run

Just **double-click** `index.html` to open it in your browser.

## What you must edit (very easy)

### 1) Group members table (Home)
Open `index.html` and replace:

- `Member One`, `Member Two`, etc
- `ESC/2024/0001`, etc
- Department names

### 2) Member biographies (About)
Open `about.html` and replace each biography paragraph with the real one.

### 3) Contacts (Contact page)
Open `contact.html` and replace:

- Phone numbers (use international format)
- Emails
- Social handles (optional)

If you want the contact form to email your group, change:

```html
data-mailto="group@example.com"
```

to your real group email.

### 4) Add your photos (required)

Put your images here:

- Member photos: `assets/members/`
  - `member-1.jpg`
  - `member-2.jpg`
  - `member-3.jpg`
  - `member-4.jpg`

- ESC photos: `assets/esc/`
  - `esc-1.jpg`
  - `esc-2.jpg`
  - `esc-3.jpg`

If you don’t add photos yet, the site shows clean placeholders (no broken images).

## Notes

- The look & feel is controlled by `styles.css` (shared across all pages).
- Theme toggle is handled in `script.js` (shared across all pages).
- `services.html` redirects to `about.html` (left for compatibility with your old template).
