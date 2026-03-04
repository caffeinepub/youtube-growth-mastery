# YouTube Growth Mastery

## Current State
New project. No existing backend or frontend code.

## Requested Changes (Diff)

### Add
- Full homepage with the following sections:
  1. **Hero Section**: Bold headline with value proposition ("Grow Your YouTube Channel Faster"), subheadline, and two CTAs ("Start Here" + "Get Free Checklist")
  2. **Start Here Guide**: Step-by-step beginner guide with numbered cards (e.g., Set Up Your Channel, Optimize for SEO, Design Thumbnails, Understand the Algorithm, Monetize)
  3. **Resource Grid**: Three resource cards — SEO Tools, Thumbnail Design, Equipment — each with icon, title, short description, and a link button
  4. **Lead Capture Form**: Email capture form offering a free "Viral Checklist" download — fields: name, email, submit button; backend stores leads
  5. **Blog Section**: Categorized blog posts with tabs/filters for "Algorithm Updates," "Monetization," and "Gear Reviews"; each post card shows title, category badge, date, excerpt, and read more link
  6. **Footer**: Links, newsletter credit, copyright

- Backend:
  - Store email leads (name, email, timestamp)
  - Store blog posts (id, title, category, date, excerpt, content, imageUrl)
  - Query leads (admin use)
  - Query blog posts by category

### Modify
- None (new project)

### Remove
- None (new project)

## Implementation Plan
1. Write spec.md (this file) and rename project
2. Select no third-party components (no auth, blob storage, or email needed)
3. Generate Motoko backend with:
   - Lead capture: submitLead(name, email) → Result
   - Blog: addPost / getPosts / getPostsByCategory
   - Seed sample blog posts in init
4. Build React frontend:
   - Navigation bar with logo and nav links
   - Hero section with bold headline, subheadline, dual CTAs
   - Start Here section with numbered step cards
   - Resources grid (SEO Tools, Thumbnail Design, Equipment)
   - Lead capture form wired to backend submitLead
   - Blog section with category filter tabs and post cards
   - Footer
   - Mobile-responsive layout
   - Bold Red (#E50914 / similar), Dark Grey (#1A1A1A), White palette
