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

- Part Two: CSS Architectural Rules and Design Additions

This document profiles the CSS extensions appended to style.css to structure the Green Earth Nursery digital storefront expansion. The updates implement responsive layouts, structural forms, and components aligned with contemporary accessibility practices while preserving your core styling foundation.

## 1. Global Typography Adjustments & Form Standardisation
To reconcile text readability with standard browser controls, basic accessibility parameters were established:

*   **Font Contrast Refinement:** While keeping the signature decorative cursive 'Dancing Script', structural form labels, placeholder prompts, input lists, and card interfaces have fallback typography parameters implemented natively to ensure maximum clarity on small touch interfaces.
*   **Footer Realignment:** A baseline container style was injected to guarantee text legibility against complex content blocks:
    ```css
    footer {
        background-color: #111827;
        color: #ffffff;
        text-align: center;
        padding: 20px;
        margin-top: 40px;
        font-size: 14px;
    }
    ```

## 2. Flexbox/Grid Architectural Additions
To shift the local plant nursery into an enterprise-ready eCommerce portal, multi-column configurations were mapped to manage content without overlapping layout errors:

*   **The E-Commerce Product Grid (`.product-grid`):** Built as an auto-fitting grid engine that shifts rows automatically according to viewport limitations.
    ```css
    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 25px;
        padding: 20px 0;
    }
    .product-card {
        background-color: #f9f9f9;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        transition: transform 0.2s ease;
    }
    .product-card:hover {
        transform: translateY(-5px);
    }
    ```
*   **The Contact Split View (`.contact-grid`):** Leverages responsive flex arrangements to lock down geographic map coordinates parallel to incoming data input channels.
    ```css
    .contact-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
    }
    .contact-info, .contact-form-container {
        flex: 1 1 400px;
    }
    ```

## 3. UI Components & Structured Interactive Forms
Interactive blocks were assigned properties to match form submission structures across desktop and mobile screens:

*   **Universal Button Element (`.btn`):** Standardised button appearance with interactive feedback transitions:
    ```css
    .btn {
        background-color: #00ff6a;
        color: #111827;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        transition: background-color 0.3s ease;
    }
    .btn:hover {
        background-color: #00cc55;
    }
    ```
*   **Stacked Entry Forms (`.stacked-form`):** Establishes explicit row spacing for standard structural forms like your customer contact and consultation intake fields.
    ```css
    .stacked-form label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #1f2937;
    }
    .stacked-form input, 
    .stacked-form select, 
    .stacked-form textarea {
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 16px;
    }
    ```

## 4. Mobile Responsiveness Controls & Media Query Fixes
Your CSS template utilizes an interactive `#menu-toggle:checked ~ nav` checkbox routine to slide out hidden navigation arrays on screens smaller than 767px wide. 

To bridge this with the improved semantic framework, the standard CSS token parameters were extended to resolve missing asset exceptions:
*   **Root Variable Fallbacks:** Added CSS variables to prevent rendering breaks if components look for `--white` or `--primary-color`.
*   **Responsive Media Fixes:** Embedded explicit frame constraints to stop third-party assets like Google Maps or layout images from breaking horizontal margins.
    ```css
    /* Responsive Map Container */
    .map-container {
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        margin-top: 15px;
    }
    .map-container iframe {
        width: 100% !important;
        height: 300px;
    }
    ```
    ==================================================================================================================================================================================================================================================================================================