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