# PRODUCTION CHECKLIST - AFODAMS Consultancy Platform

## 🎯 MUST-HAVE PAGES (Consultancy MVP)

### Public Pages
- ✅ Home `/` - Advisory + Government Bids + Secure Documentation messaging
- ✅ Services `/services` - 4 core services with CTAs
- ✅ Industries `/industries` - Government, Institutions, Private sectors
- ✅ Process `/process` - 4-step engagement process
- ✅ Case Studies `/case-studies` - Anonymized success stories
- ✅ About `/about` - Company credentials (no property language)
- ✅ Contact `/contact` - Professional contact form
- ✅ Privacy Policy `/privacy` - Confidentiality commitments
- ✅ Book Consultation `/book-consultation` - Lead capture form
- ✅ Secure Documents `/secure-docs` - Auth-gated file upload (premium feature)

### Auth Pages (Keep existing)
- Login `/login`
- Signup `/signup` (generic, not role-specific)

---

## ❌ MUST-REMOVE (Property Platform UI)

### Routes to DISABLE (comment out in App.tsx)
- `/properties` - Property listings
- `/property/:id` - Property details
- `/landlord-signup`, `/tenant-signup`, `/investor-signup`, `/agent-signup`
- `/landlord-dashboard`, `/tenant-dashboard`, `/investor-dashboard`, `/agent-dashboard`

### Text/UI to REPLACE
Search and replace across all frontend files:
- ❌ "Find your dream home" → ✅ "Professional advisory services"
- ❌ "List Property" → ✅ "Book Consultation"
- ❌ "Properties Sold" → ✅ "Successful Engagements"
- ❌ "Real estate platform" → ✅ "Consultancy platform"
- ❌ Remove: bedrooms, bathrooms, rent, buy, sell, villa, apartment mentions

### Navigation to UPDATE
- **Navbar links:** Home, Services, Industries, Process, Case Studies, About, Contact
- **CTA button:** "Book Consultation" (not "List Property")
- **Footer:** Remove property categories, add consultancy service links
- **Tagline:** "Advisory & Documentation" (not "Luxury Real Estate")

### Images to REPLACE
- Hero images: boardroom meetings, professional consultation
- Service cards: document review, compliance paperwork
- Remove: house/building icons suggesting property listings
- Use Unsplash with proper sizing: `?w=1920&auto=format&fit=crop&q=80`

---

## 🏗️ BUILD + DEPLOY STEPS

### Frontend (Vite + React + HashRouter)

**Local Development:**
```powershell
cd c:\Users\HP\Desktop\afodamspropertylimited\frontend-react
npm install
npm run dev
```
Access: http://localhost:5173

**Production Build:**
```powershell
cd frontend-react
npm run build
```
Output: `frontend-react/dist/`

**Deployment Targets:**
- **Vercel:** Auto-detects Vite, uses BrowserRouter (add `vercel.json` with rewrites)
- **GitHub Pages:** Requires HashRouter (URLs have `#`)
- **Cloudflare Pages:** Use BrowserRouter + `_redirects` file

**Current Router:** Check `App.tsx` - likely HashRouter for static hosting

### Backend (Node.js + Express)

**Local Development:**
```powershell
cd c:\Users\HP\Desktop\afodamspropertylimited\backend
npm install
npm run dev
```
Access: http://localhost:5000

**Production:**
```powershell
npm start
```

---

## 🔐 ENVIRONMENT VARIABLES REQUIRED

### Frontend (`frontend-react/.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=AFODAMS Property Limited
```

### Backend (`backend/.env`)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://...
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SENDGRID_API_KEY=...
PAYSTACK_SECRET_KEY=...
```

**Safe Defaults for Local Testing:**
- MongoDB: Use local instance or MongoDB Atlas free tier
- JWT_SECRET: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## ✅ QA CHECKS (Before Client Demo)

### Functional Testing
- [ ] Homepage loads in < 2 seconds
- [ ] "Advisory + Government Bids + Secure Documentation" visible in hero (first screen)
- [ ] All nav links work (Home, Services, Industries, Process, Case Studies, About, Contact)
- [ ] "Book Consultation" form submits successfully
- [ ] "Secure Docs" redirects to login if not authenticated
- [ ] No broken links (test all footer links)
- [ ] No 404 pages on navigation

### Visual QA
- [ ] **Mobile responsive** (test on 375px, 768px, 1920px)
- [ ] Images load properly (not blurry, correct aspect ratios)
- [ ] No property-related imagery visible
- [ ] Professional color scheme (no bright real estate colors)
- [ ] CTAs clearly visible ("Book Consultation" buttons)

### Content Audit
- [ ] No "property", "bedrooms", "bathrooms", "rent", "buy", "sell" in public UI
- [ ] No "List Property" buttons/links
- [ ] No "Find your dream home" messaging
- [ ] Confidentiality language present on sensitive pages
- [ ] Privacy policy accessible from footer

### Technical Checks
- [ ] `npm run build` succeeds with 0 errors
- [ ] Zero console errors on homepage
- [ ] Zero console warnings (TypeScript strict mode)
- [ ] Network tab: No failed API calls on page load
- [ ] SEO: Title tag present (`<title>AFODAMS - Advisory & Documentation</title>`)
- [ ] SEO: Meta description present (mention consultancy, government bids, confidentiality)

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] Images optimized (WebP format preferred)
- [ ] No layout shift on page load
- [ ] Smooth page transitions (if using animations)

---

## 🎬 CLIENT DEMO SCRIPT (Video Call Flow)

### Preparation (Before Call)
1. Clear browser cache
2. Close all unnecessary tabs
3. Have homepage loaded at `http://localhost:5173` or deployed URL
4. Have admin credentials ready (if demoing secure features)
5. Prepare 1-2 sample documents for file upload demo

### Demo Flow (10-15 minutes)

**1. Homepage Tour (2 min)**
- "Here's the new AFODAMS platform. Notice immediately: we're positioned as a consultancy firm."
- Point out hero: "Advisory, Government Bids Support, and Secure Documentation"
- Scroll to services section: "Four core offerings clearly presented"
- Show trust indicators: industries served, process transparency

**2. Services Deep Dive (3 min)**
- Click "Services" in nav
- Expand each service card: Consultation, Government Bids, Documentation, Partnerships
- "Each service has a clear CTA to book a consultation"
- Show FAQ section on confidentiality

**3. Industries + Process (2 min)**
- Click "Industries" - show government, institutional, private sector focus
- Click "Process" - walk through 4-step engagement flow
- "This builds trust by showing clients exactly what to expect"

**4. Case Studies (1 min)**
- Click "Case Studies"
- "Anonymized examples that demonstrate capability without violating confidentiality"

**5. Consultation Booking (3 min)**
- Click "Book Consultation" button (from hero or nav)
- Fill out form live: Name, Email, Organization Type, Service Needed
- Submit form
- Show success confirmation: "We will contact you within 24 hours"
- (If backend connected) Show admin notification

**6. Secure Documents Feature (2 min)**
- Click "Submit Documents Securely"
- Show login gate: "Only authenticated clients can upload"
- (If logged in) Demo file upload: drag & drop PDFs
- Show upload progress
- Show success receipt: "Documents received securely"

**7. Mobile Responsiveness (1 min)**
- Resize browser to mobile view (DevTools)
- Show nav menu collapses to hamburger
- Show cards stack vertically
- "Fully responsive for mobile professionals"

**8. Closing + Q&A (2 min)**
- "Notice: zero property language. This is now a pure consultancy platform."
- "All property features are disabled but not deleted - we can re-enable if needed."
- Open floor for questions

### Backup Slides (If Demo Fails)
- Screenshots of each page
- Recorded video of successful flow
- Printable brochure (export homepage to PDF)

---

## 📋 POST-DEMO ACTION ITEMS

### If Client Approves
- [ ] Point custom domain (e.g., afodams.com)
- [ ] Set up SSL certificate
- [ ] Configure production database
- [ ] Enable real email notifications (consultation requests)
- [ ] Set up file storage (AWS S3 or Cloudinary for document uploads)
- [ ] Add analytics (Google Analytics or Plausible)
- [ ] Add live chat widget (optional)

### If Client Requests Changes
- [ ] Document requested changes in this file (append section below)
- [ ] Prioritize changes (critical, high, nice-to-have)
- [ ] Provide time estimates
- [ ] Schedule follow-up demo

---

## 🔍 MARKDOWN FILES AUDIT

**Total .md files in repo:** 50+

**Safe to Delete (Not Referenced in Code):**
Most documentation files (WEEK_*.md, DEPLOY_*.md, etc.) are NOT referenced in:
- package.json scripts
- Vite config
- CI/CD pipelines
- Runtime code

**Files to KEEP:**
- This file: `PRODUCTION_CHECKLIST.md`
- `README.md` (standard practice)
- `backend/README.md` (if exists)

**Recommendation:**
Archive all other .md files to a `docs-archive/` folder for reference, but they're not required for runtime.

---

## ✅ COMPLETION CRITERIA

**Project is "Production Ready" when:**
1. ✅ `npm run dev` works in frontend-react/
2. ✅ `npm run build` succeeds with 0 errors
3. ✅ Homepage shows consultancy messaging in < 5 seconds
4. ✅ All new routes render without console errors
5. ✅ Book Consultation form functional (localStorage or backend)
6. ✅ Secure Docs auth-gated
7. ✅ Zero property references in public UI
8. ✅ Mobile responsive on all pages
9. ✅ Client can share URL for stakeholder review
10. ✅ Demo script validated with successful run-through

---

**Last Updated:** February 9, 2026  
**Status:** In Progress  
**Next Milestone:** Client Demo (Today)
