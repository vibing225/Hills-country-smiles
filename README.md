# Hill Country Smiles — Spec Website

Premium static redesign based on the supplied content from the existing Hill Country Smiles website.

## Pages
- Home
- Our Practice
- Your First Visit
- Services
- Meet The Staff
- Reviews
- Contact

Photo Gallery is intentionally omitted for this version.

## Asset workflow
The demo currently uses remote Unsplash images for visualization. When the real business photos/logo are available, place them in `assets/images/` and `assets/logo/`, then update only `config.js` image paths (and logo). The component/page structure does not need to change.

## Important
Hours and email were not supplied in the source content, so the demo does not invent them. The hours component displays “Hours not provided” until real hours are added to `config.js`.
