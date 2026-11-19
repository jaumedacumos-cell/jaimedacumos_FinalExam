# Thread & Lane - Clothing Apparel Catalog

A responsive, frontend-only clothing catalog built with HTML, CSS, JavaScript and Bootstrap 5.
Login and payment are **not real**: the checkout is a frontend demonstration and nothing is sent to a server.

**Student name:** ______________________  **Section:** ______________

## Target users and objectives
- **Users:** Students and young professionals who want to browse everyday clothing quickly on a phone or laptop.
- **Problem:** Clothing lists are hard to scan. Shoppers need to narrow by size, price and type.
- **Objectives:** (1) show products clearly, (2) let users search, filter and sort, (3) save a cart and wishlist, (4) collect delivery details with validated input.

## Features
- Home, Catalog and Cart/Checkout pages with working navigation
- Search, category filter, size filter, max price slider, sorting, wishlist-only view
- Cart with quantity change, removal and totals (free shipping over ₱2,000), saved in `localStorage`
- Wishlist saved in `localStorage`
- Product details window (Bootstrap modal) with size selection
- Checkout form with Bootstrap validation and a custom mobile-number rule
- Accessible labels, skip link, visible focus, readable contrast

## Technologies
HTML5, CSS3, JavaScript (ES6), Bootstrap 5.3.3 (CDN), Google Font "Archivo" (CDN). Product pictures are inline SVG drawn by JavaScript, so no image files can break.

## Folder structure
```
thread-and-lane/
├── index.html
├── pages/catalog.html, cart.html
├── assets/css/style.css
├── assets/js/data.js      (sample products)
├── assets/js/script.js    (all features)
├── docs/screenshots/, docs/SCREENSHOTS_CHECKLIST.md
├── README.md
└── PROMPT_LOG.md
```

## How to run in VS Code
1. Open VS Code > **File > Open Folder** > choose `thread-and-lane`.
2. Install the **Live Server** extension (Extensions icon, search "Live Server").
3. Right-click `index.html` > **Open with Live Server**. (Double-clicking `index.html` also works.)
4. An internet connection is needed for Bootstrap and the font.

## Git and GitHub commands (Git Bash or CMD)
Replace `YOUR-USERNAME` with your GitHub username. First create an empty repository named `thread-and-lane` on github.com (no README, no .gitignore).

```bash
cd path/to/thread-and-lane
git init
git config user.name "Your Name"
git config user.email "you@example.com"
git branch -M main

# Commit 1 - structure and page layouts
git add index.html pages assets/css docs README.md
git commit -m "Add project structure, pages and Bootstrap styling"

# Commit 2 - JavaScript features
git add assets/js
git commit -m "Add product data, search, filters, sorting, cart and wishlist"

# Commit 3 - documentation
git add PROMPT_LOG.md docs/screenshots
git commit -m "Add prompt log, testing notes and screenshots"

git remote add origin https://github.com/YOUR-USERNAME/thread-and-lane.git
git push -u origin main
git log --oneline
```
If GitHub asks you to sign in, use the browser prompt or a Personal Access Token as the password. In your repository **Settings > Collaborators** (or keep it public) so the instructor can open it.
Note: `assets/images` and `docs/screenshots` hold only `.gitkeep` files until you add screenshots, so `git add` them in commit 3 after adding images.

## Important code to explain
- `data.js`: the `PRODUCTS` array. Every product is an object (id, name, category, price, sizes, color).
- `art(p)`: builds an SVG garment from the product's `type` and `color`.
- `card(p)`: returns the HTML for one product card.
- `rerender`: each page sets this function. After any click (wishlist, quantity), the page redraws itself.
- Click handler: one `document.addEventListener("click")` reads `data-action` on buttons (event delegation).
- `initCatalog()`: reads all filter inputs, uses `Array.filter` and `Array.sort`, then draws results.
- Cart functions: `addToCart`, `changeQty`, `removeItem` save to `localStorage` with `JSON.stringify`.
- `initCart()`: calculates subtotal, shipping and total, and validates the form with `checkValidity()`.

## AI tools used and contributions
(Write the tool name(s) you used. Example: Claude generated the first version of the HTML, CSS and JavaScript and explained the code. I tested it, changed ______, and wrote the commit messages myself.)

## Testing performed and corrections made
Fill this table with what you actually tested.

| Test | Expected | Result | Correction made |
|---|---|---|---|
| Navigation links on all 3 pages | Each page opens, current page highlighted | | |
| Search "hoodie" | Only hoodies shown | | |
| Filters + sort + reset | List updates; reset restores all | | |
| Wishlist heart, reload page | Heart stays selected | | |
| Add to cart, reload page | Cart and badge count persist | | |
| Checkout: empty form | Error messages appear, focus moves to first error | | |
| Checkout: phone `12345` | Rejected | | |
| Checkout: valid data | Success message, cart cleared | | |
| Phone, tablet, desktop widths | No overlap or sideways scrolling | | |
| Console (F12) | No red errors | | |

## Known limitations
- No real login, payment, or server; orders are not saved anywhere.
- Cart and wishlist live in one browser only and disappear if site data is cleared.
- Product pictures are simple drawings, not photos.
- Needs internet for Bootstrap and the font.

## Credits
Bootstrap 5.3.3 (getbootstrap.com), Google Fonts - Archivo, and AI assistance as listed above.
