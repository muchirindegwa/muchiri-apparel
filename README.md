# Muchiri's Apparel

Muchiri's Apparel is a modern, single-page clothing storefront built with plain HTML, CSS, and JavaScript. The site showcases products, supports a shopping cart experience, and includes a simple admin dashboard for viewing orders, contact messages, and styling bookings.

## Overview

This project is designed as a lightweight, no-build, static website that can be hosted easily on GitHub Pages. It is ideal for a small fashion brand, boutique, or personal storefront that wants a polished online presence without needing a full backend.

## Current functionality

The website currently includes:

- A hero section and branded landing page for Muchiri's Apparel
- A product catalog with featured items and pricing
- A shopping cart that stores items in the browser using local storage
- A checkout flow that prompts for a phone number and opens WhatsApp for order confirmation
- A contact form that sends messages through WhatsApp
- A styling appointment booking form
- A dark/light theme toggle
- A WhatsApp floating action button for quick customer contact
- A dynamic footer that automatically updates the copyright year to the current year
- An admin page that lets you view orders, messages, and bookings after entering a password

## Project structure

- index.html - The main storefront experience
- styles.css - The storefront stylesheet moved out of the HTML
- script.js - The storefront JavaScript logic moved out of the HTML
- admin.html - The admin login and dashboard page
- admin-styles.css - The admin page stylesheet moved out of the HTML
- admin-script.js - The admin page JavaScript logic moved out of the HTML
- README.md - Project documentation

## How it works

The site is fully client-side:

- Product data, cart behavior, and storefront interactions are handled in the external JavaScript file for the main page
- Cart and theme preferences are persisted locally in the browser with localStorage
- Orders, contact messages, and bookings are also stored in localStorage for the admin dashboard
- The storefront uses WhatsApp links for customer communication and order handling
- The admin page uses its own separated stylesheet and script files for cleaner maintenance

Because there is no backend database or server-side processing, this is best suited for a demo, portfolio site, or low-complexity storefront.

## Dependencies

This project has no package manager dependencies and does not require installation steps.

It uses:

- Font Awesome for icons via CDN
- Images from Unsplash/Picsum via direct remote URLs
- Modern browser support for localStorage and ES6 JavaScript features

## Running locally

You can preview the site locally by opening the HTML files directly in a browser.

### Option 1: Open directly in a browser

- Open index.html in your browser to view the storefront
- Open admin.html in your browser to access the admin dashboard

### Option 2: Use a local static server

If you prefer a local server for a more realistic preview, run:

```bash
python3 -m http.server 8000
```

Then visit:

- http://localhost:8000/index.html
- http://localhost:8000/admin.html

## Deploying to GitHub Pages

This project is ready to be hosted on GitHub Pages.

### Steps

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to Settings > Pages.
4. Under Source, select Deploy from a branch.
5. Choose Branch: main and Folder: / (root).
6. Click Save.

GitHub Pages will build and publish the site. After a few minutes, your site will be available at:

```text
https://<your-github-username>.github.io/muchiris-apparel/
```

### Important note

Because the site is static and uses localStorage, the admin dashboard and cart data will only exist in the browser of each visitor. There is no centralized backend or user account system.

## Recommended improvements

If you want to expand the project later, good next steps include:

- Replacing the WhatsApp-only workflow with a real backend or form service
- Adding a proper database for orders and customer data
- Securing the admin dashboard with a stronger authentication flow
- Adding product images and inventory management
- Connecting the storefront to a CMS or e-commerce platform

## Security note

The admin password is currently hardcoded in admin.html. For a production deployment, consider moving authentication to a more secure backend-based solution.
