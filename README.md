# GREEN-NURSERY
=================================================================================================
# Luphiwo Msebi
# ST10523156
=================================================================================================
# 1. Organisation Overview

Green Earth Nursery

Background:
Green Earth Nursery is a small plant nursery started in 2020.  Specializes in indoor plants, garden plants, gardening equipment, and landscaping services. Building a loyal customer base on quality products and great customer service. The owner now interest in expanding the business by having it go online.

Mission Statement:
Offer good, affordable plants and related products while being environmentally responsible.

Vision Statement:
To become an recognizable online plant nursery, making gardening accessible to everyone.

Target Audience:
 . Homeowners
 . Garden enthusiasts
 . Schools
 . Businesses
 . Landscapers
 . People aged 20–65 interested in gardening

===========================================================================================================================================
# 2. Goals and Objectives
The website aims to:
. Increase online visibility.
. Attract new customers.
. Allow customers to browse products online.
. Increase sales.
. Provide gardening tips and advice.
. Improve communication with customers.

Key Performance Indicators:
. Increase site traffic by 30% within six months.
. Increase online enquiries by 25%.
. Receive at least 100 online orders within the first year.
. Reduce customer response time to less than 24 hours.
. Achieve customer satisfaction rate of 90%.

========================================================================================================================================
# 3. Current Website Analysis
For now, Green Earth Nursery does not have a website. Lacking

Strengths:
1.Strong local customer base.
2.Good reputation.
3.High-quality products.
Weaknesses:
1.No online presence.
2.Customers cannot order online.
3.Limited marketing.
4.Difficult for customers outside the local area to find the business.


Areas for Improvement

Develop a professional website that includes:
. Online product catalogue
. Contact forms
. Location map
. Gardening blog
. Online ordering system

======================================================================================================================================
# 4. Proposed Website Features and Functionality

The website will include:
. Home Page
. About Us
. Products Page
. Services Page
. Gardening Blog
. Contact Us Page
. Frequently Asked Questions
. Customer Reviews
. Google Maps location
. Contact Form
. Newsletter Subscription
. Mobile-friendly design
. Search function
=======================================================================================================================================

# Timeline and Milestones

| Week   | Task                  |
| ------ | --------------------- |
| Week 1 | Research organisation |
| Week 2 | Write proposal        |
| Week 3 | Design wireframes     |
| Week 4 | Develop HTML pages    |
| Week 5 | Add CSS styling       |
| Week 6 | Add JavaScript        |
| Week 7 | Testing               |
| Week 8 | Final improvements    |
| Week 9 | Submit project        

==========================================================================================================================================

# PART 1: IMPROVEMENTS - HTML (Part 1 Improvements)

## 1.1 Problems Found in Original HTML
1. Internal <style> tags in every page (300 lines) - violated external CSS rule
2. Typo class="sit-header" / "sit-logo" instead of site-header - broke CSS
3. Wrong paths: ../pages/about.html while already in /pages/ folder
4. Invalid nesting: <section id="story"> inside another <section id="story">
5. Missing accessibility: no aria-label, no title on iframe, duplicate IDs
6. width:100vw causing horizontal slide on mobile phones
7. No active class, no meta description, inconsistent footer

## 1.2 Improvements Made

A. Removed all internal CSS:
Before: <style>...300 lines...</style>
After: <link rel="stylesheet" href="../css/style.css">
Result: 100% external CSS, meets marking rubric.

B. Fixed Header & Navigation (Now Responsive):
<header class="site-header">
  <a href="../index.html" class="site-logo">🌿 GREEN NURSERY</a>
  <input type="checkbox" id="menu-toggle" class="menu-toggle" aria-label="Toggle menu">
  <label for="menu-toggle" class="hamburger"><span></span><span></span><span></span></label>
  <nav aria-label="Main navigation">
    <a class="nav-link active" href="./about.html">ABOUT US</a>
    <a class="nav-link" href="./products.html">PRODUCTS</a>
    <a class="nav-link" href="./services.html">SERVICES</a>
    <a class="nav-link" href="./contact.html">CONTACT US</a>
    <a class="nav-link" href="./inquiry.html">INQUIRY</a>
  </nav>
</header>

C. Fixed Accessibility:
- aria-label="Main navigation" on nav
- title="Green Nursery Location Map" on iframe
- autocomplete="name" and autocomplete="email" on forms
- Unique IDs: contact-name, inquiry-name (no duplicates)

D. Standardized Head for SEO:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Green Nursery - affordable plants and landscaping">


# PART 2: ADDITION OF CSS - How CSS Was Used (Part 2: Addition of CSS)

## 2.1 CSS Structure
One file: /css/style.css controls all pages. Uses variables:
:root {
  --primary-color: #0f4c5c;
  --secondary-color: #06d6a0;
  --white: #ffffff;
  --light-bg: linear-gradient(135deg, #f4f9f4 0%, #e8f5e9 100%);
}

## 2.2 CSS Code Used

1. Responsive Header & Hamburger Menu (Checkbox hack - no JavaScript):
.site-header {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  position: sticky; top: 0; z-index: 1000;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.2rem 5%;
}
.hamburger { display: none; }
@media (max-width: 767px) {
  .hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; }
  nav {
    position: fixed; top: 0; right: -100%;
    width: 70%; height: 100vh;
    background: var(--white);
    flex-direction: column;
    transition: right 0.4s ease-in-out;
  }
  #menu-toggle:checked ~ nav { right: 0; }
}

2. Sections - Mobile First Grid:
section {
  background: var(--white);
  border-radius: 20px;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  section { grid-template-columns: 1fr 1fr; gap: 4rem; }
}

3. Products Grid:
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
.product-card:hover { transform: translateY(-5px); }

4. Forms & Buttons:
input:focus { border-color: var(--primary-color); box-shadow: 0 0 0 4px rgba(15,76,92,0.1); }
.btn-submit { background: var(--primary-color); color: white; border-radius: 10px; }
.btn-submit:hover { background: #17657a; transform: translateY(-2px); }

5. Anti-Slide Fix for Phone/Tablet (Fixes your current bug):
html, body { overflow-x: hidden !important; max-width: 100% !important; }
img, iframe { max-width: 100% !important; }
.info-item { word-break: break-word; flex-wrap: wrap; }
@media (max-width: 400px) {
  .products-grid { grid-template-columns: 1fr !important; }
}

## 2.3 Responsive Result
- Phone 320px-767px: 1 column, hamburger slides from right, no horizontal scroll
- Tablet 768px-1024px: 2 columns, sidebar + form layout
- Desktop 1025px+: 3 columns, sticky sidebar, hover animations
- Full CSS file: /css/style.css (~280 lines)

# Testing
- W3C Validator: No errors
- Mobile test: iPhone SE, iPad - no slide left
- 100% external CSS compliant

=============================================================================================
Part 1 and 2 imporvements !!!
=============================================================================================

==========================================================================================================================================

# PART 1: IMPROVEMENTS - HTML

## 1.1 Problems Found in Original HTML
1. Internal `<style>` tags in every page (violating external CSS rules).
2. Typo class names (`sit-header` / `sit-logo`) instead of `site-header` which broke styling.
3. Incorrect relative asset/page paths.
4. Invalid semantic nesting (e.g., sections inside sections improperly nested).
5. Missing accessibility attributes (`aria-labels`, iframe titles, and proper form autocomplete attributes).
6. Viewport overflow bugs causing horizontal scrolling on small mobile screens.
7. Missing active state classes, meta descriptions, and inconsistent footers.

## 1.2 Improvements Made

A. **Externalized CSS Structure:**
Removed all internal blocks and linked a unified stylesheet across all pages:
```html
<link rel="stylesheet" href="./css/style.css"> <!-- Root pages -->
<link rel="stylesheet" href="../css/style.css"> <!-- Subpages -->
B. Responsive Header & Navigation (Checkbox Hack):
Implemented a robust, accessible mobile menu toggle using pure CSS:

HTML
<header class="site-header">
  <a href="./index.html" class="site-logo">🌿 GREEN NURSERY</a>
  <input type="checkbox" id="menu-toggle" class="menu-toggle" aria-label="Toggle navigation menu">
  <label for="menu-toggle" class="hamburger" aria-hidden="true">
      <span></span><span></span><span></span>
  </label>
  <nav aria-label="Main navigation">
    <a class="nav-link active" href="./index.html" aria-current="page">HOME</a>
    <a class="nav-link" href="./pages/about.html">ABOUT US</a>
    <a class="nav-link" href="./pages/products.html">PRODUCTS</a>
    <a class="nav-link" href="./pages/services.html">SERVICES</a>
    <a class="nav-link" href="./pages/contact.html">CONTACT US</a>
    <a class="nav-link" href="./pages/inquiry.html">INQUIRY</a>
  </nav>
</header>
C. Accessibility & Semantic Enhancements:

Added aria-label attributes to navigation landmarks.

Included descriptive title attributes on map iframes.

Added proper autocomplete="name", autocomplete="email", and input labels across forms.

D. SEO Metadata Standardization:
Added responsive viewport tags and rich descriptive meta tags to every page head:

HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Green Nursery - Bring your space to life with our plants and gardening services">
==========================================================================================================================================

PART 2: ADDITION OF CSS - Styling Architecture
2.1 CSS Structure & Variables
Controlled entirely via /css/style.css using modern custom properties:

CSS
:root {
    --primary-color: #0f4c5c;
    --primary-hover: #17657a;
    --secondary-color: #06d6a0;
    --dark-color: #1d2d44;
    --light-bg: linear-gradient(135deg, #f4f9f4 0%, #e8f5e9 100%);
    --white: #ffffff;
    --font-stack: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
2.2 Key CSS Implementations
Responsive Hamburger Navigation: Hidden on desktop, transitions smoothly from the right using CSS transforms on mobile devices (max-width: 1199px).

Mobile-First CSS Grid Layouts: Sections dynamically shift from single-column stack views on phones to two-column alternating grids on tablets and desktops (min-width: 768px).

Products & Search Grids: Utilizes auto-fill flexible grid tracks (grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr))) with hover elevations.

Anti-Slide Fixes: Enforced overflow-x: hidden and max-width: 100% on body, images, and frames to eliminate accidental horizontal scrolling on mobile viewports.

==========================================================================================================================================

PART 3: JAVASCRIPT FUNCTIONALITY & INTERACTIVITY
3.1 Modular JavaScript Architecture
Scripts are modularized into dedicated files loaded with the defer attribute to ensure non-blocking DOM parsing:

script.js: Core global behaviors (back-to-top button, general utilities).

cart.js: E-commerce shopping cart management system.

global-search.js: Cross-page product search modal and lookup.

products.js: Live autocomplete dropdown and card filtering on the products page.

contact.js & Inquiry.js: Real-time input validation and EmailJS cloud submission integration.

3.2 Core Feature Highlights
Persistent Shopping Cart (cart.js): Stores cart items in browser localStorage, supporting quantity increments, decrements, item removal, and a slide-out drawer (<dialog>) modeled after modern gaming and retail stores.

Global Search Modal (global-search.js): Injects a search button into all page headers, opening a searchable modal dialog with live matching results and quick-add capabilities.

Form Validation & EmailJS (contact.js / Inquiry.js): Real-time error handling with dynamic aria-invalid toggles and direct asynchronous dispatch to email inboxes using the EmailJS browser SDK (service_jmifnur, template_3ltbtxv).

==========================================================================================================================================

SEARCH ENGINE OPTIMIZATION (SEO) & TECHNICAL REQUIREMENTS
4.1 On-Page SEO
Keyword Integration: Strategically embedded local keywords (plant care, gardening tools, Johannesburg nursery) across page titles, headers, and descriptions.

Meta Tags & Titles: Unique titles and descriptions for every page (index.html, about.html, products.html, services.html, contact.html, inquiry.html).

Semantic Structure: Proper heading hierarchy (<h1>, <h2>) and descriptive image file naming with alternative text (alt tags).

4.2 Off-Page SEO & Local Search
Backlink Strategy: Outlining organic outreach toward local landscaping directories and gardening blogs.

Social Media: Cross-promoting store collections on social networks.

Local SEO: Optimizing for local geographic queries by setting up a Google Business Profile targeting Johannesburg region map results.

4.3 Technical SEO & Supplemental Files
A. robots.txt (Root Directory)
Instructs search engine crawlers on indexing boundaries and references the XML sitemap:

Plaintext
User-agent: *
Allow: /

Sitemap: [https://www.greennursery.co.za/sitemap.xml](https://www.greennursery.co.za/sitemap.xml)
B. sitemap.xml (Root Directory)
Maps all primary site routes with defined update frequencies and priorities:


C. Page Speed Optimization
WebP Image Formats: Utilizing lightweight image compression to accelerate render times.

Deferred Scripts: All JavaScript files are loaded with defer to prevent render-blocking.

D. Security Measures
Client-Side Validation: Real-time checking and sanitization of form submissions.

HTTPS Enforcement: Standardized secure protocols for encrypted data transmission on production servers.