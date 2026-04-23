# LuxeVogue Boutique (Static Demo)

A 4-page boutique storefront with premium styling, local images, and a minimal JavaScript cart demo that tracks a single active product selection. Built with plain HTML/CSS plus Bootstrap for the About/Cart pages.

## Pages
- **Home (`index.html`)**: Hero, categories, CTA to shop.
- **Shop (`shop.html`)**: Category tiles with local images; handbags link to a detailed page; other categories show products. Handbag cards carry product metadata for the cart.
- **Handbags (`handbags.html`)**: Detailed handbag grid with local images and add-to-cart buttons (each tagged with its product data).
- **About (`about.html`)**: Bootstrap layout for brand story and values.
- **Cart (`cart.html`)**: Shows the last product added, quantity controls, and a dynamic summary (subtotal, shipping, tax, total). Includes local product image, name, and description.

## Styling
- Custom CSS in `css/home.css` and `css/shop.css` for layout, gradients, hover states, and cards.
- Bootstrap 5 is used on About and Cart for fast layout.
- Images are stored locally in `/images` (e.g., `structured_tote_bag.jpeg`, `soft_shoulder_bag.jpeg`, `sunglasses.jpeg`, etc.).

## Cart Behavior (minimal JS)
- Script: `js/cart.js` (small, dependency-free).
- Persists a **single active product** in `localStorage` under `luxe_cart_state` with fields: name, price, img, desc, count.
- Buttons with class `.btn-add` carry data attributes: `data-product`, `data-price`, `data-img`, `data-desc`. Adding sets that product as active and increments its count.
- Cart page binds to IDs: `cart-items-count`, `cart-line-img`, `cart-line-name`, `cart-line-desc`, `line-qty`, `line-total`, `summary-subtotal`, `summary-shipping`, `summary-tax`, `summary-total`.
- Plus/Minus buttons (`.btn-plus`, `.btn-minus`) adjust quantity; summary recomputes.
- Currency is formatted in **₹**.

## Data Flow
1) User clicks **Add to cart** on a product (shop or handbags). The button’s data attributes define the product stored.
2) State saved to `localStorage`; badges and cart page update.
3) On the cart page, plus/minus adjusts the stored count; totals recalc live.

## Limitations
- Single active product model: adding a new product replaces the previous one (no multi-line cart).
- No backend; everything is static except localStorage-based cart state.
- No form/checkout integration; prices are demo values.

## How to Run
- Open `index.html` (or any page) in a modern browser. No build step required.
- Ensure the `images/` folder remains alongside the HTML files.

## Customizing
- Add products: include new images in `/images`, then add cards with proper `data-*` attributes so the cart picks them up.
- Change prices/currency: adjust values in HTML and `PRICE` usage in `js/cart.js` (prices are read per-button data now; currency symbol is set in `fmt`).
- Turn off JS cart: remove the `<script src="js/cart.js"></script>` tag from pages.

## File Map (key files)
- `index.html`, `shop.html`, `handbags.html`, `about.html`, `cart.html`
- `css/home.css`, `css/shop.css`
- `js/cart.js`
- `images/` (all local product/category images)

## Notes
- Cart badge starts at 0 and syncs across pages.
- Shipping flat: ₹12 if count > 0. Tax: 8% of subtotal. Totals recalc on each change.
- All text and styling are customizable; adjust CSS variables in `home.css`/`shop.css` for theme tweaks.
