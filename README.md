# Sibghatullah Portfolio

[![Deploy to GitHub Pages](https://github.com/Sibghatullah-pk/sibghat_port/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sibghatullah-pk/sibghat_port/actions/workflows/deploy.yml)

Ubuntu-inspired personal portfolio website showcasing web development, Android apps, security projects, and networking work.

🌐 **Live Site:** [sibghatullah-pk.github.io/sibghat_port](https://sibghatullah-pk.github.io/sibghat_port/)

---

## 🚀 Quick Start

### Running Locally

No build step required! Simply open the HTML file:

```bash
# Option 1: Open directly in browser
# Just double-click index.html

# Option 2: Use a local server (recommended for development)
# Using Python
python -m http.server 8000

# Using Node.js (if you have npx)
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```
sibghat_port/
├── index.html                 # Main HTML file
├── SIBGHATULLAH_BSIT_resume.pdf # Resume download
├── README.md                  # This file
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
└── assets/
    ├── css/
    │   └── styles.css         # Main stylesheet
    ├── js/
    │   └── main.js            # JavaScript functionality
    ├── data/
    │   └── projects.json      # Project data (add/edit projects here)
    ├── icons/
    │   ├── github.png
    │   ├── linkedin.png
    │   ├── ins.png
    │   ├── web-developer.gif
    │   ├── responsive.gif
    │   └── font.gif
    └── images/
        ├── img.jpg            # Profile photo
        ├── prj1.jpg           # Console Chess project
        ├── new.jpg            # Maze Solver project
        ├── blog.jpg           # Blog App project
        ├── phising .jpg       # Phishing Tool project
        └── cn.png             # Network Simulation project
```

---

## ✏️ How to Customize

### Adding/Editing Projects

Projects are loaded from `assets/data/projects.json`. To add a new project:

1. Open `assets/data/projects.json`
2. Add a new object to the `projects` array:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "shortDesc": "Brief one-line description.",
  "fullDesc": "Full detailed description for the modal.",
  "tags": ["web-dev", "react", "full-stack"],
  "tech": ["React", "Node.js", "MongoDB"],
  "image": "./assets/images/my-project.jpg",
  "imagePlaceholder": "linear-gradient(135deg, #e95420, #77216f)",
  "demoUrl": "https://example.com/demo",
  "repoUrl": "https://github.com/username/repo",
  "year": 2025,
  "role": "Lead Developer",
  "contributions": [
    "Built the frontend with React",
    "Designed the database schema",
    "Implemented authentication"
  ],
  "featured": true
}
```

3. Add the project image to `assets/images/`
4. Optionally add a new filter tag in the `filters` array

### Updating Skills

Edit the skill bars in `index.html` under the Skills section. Each skill bar has a `data-level` attribute (0-100):

```html
<div class="skill-bar__fill" data-level="70" style="width: 0%;"></div>
```

### Changing Colors

The color palette is defined in CSS custom properties in `assets/css/styles.css`:

```css
:root {
  --ubuntu-orange: #e95420;      /* Primary accent */
  --ubuntu-purple: #77216f;      /* Secondary accent */
  --ubuntu-purple-dark: #300a24; /* Dark background */
  /* ... more variables */
}
```

### Contact Form Setup

The contact form uses [Formspree](https://formspree.io/) for handling submissions.

1. Create a free account at [formspree.io](https://formspree.io/)
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in two places:
   - `index.html` (form action attribute)
   - `assets/js/main.js` (CONFIG.formEndpoint)

```javascript
// In main.js
const CONFIG = {
  formEndpoint: 'https://formspree.io/f/YOUR_ACTUAL_FORM_ID',
  // ...
};
```

---

## 🖼️ Image Guidelines

For optimal performance, use these recommended sizes:

| Image Type | Recommended Size | Format |
|------------|-----------------|--------|
| Profile Photo | 400×400px | JPG/WebP |
| Project Thumbnails | 800×450px | JPG/WebP |
| Social Icons | 48×48px | PNG |
| Favicon | 32×32px | ICO/PNG |

### Optimizing Images

```bash
# Using ImageMagick
convert input.jpg -resize 800x450 -quality 85 output.jpg

# Using squoosh.app (web-based)
# Visit https://squoosh.app for easy image optimization
```

---

## 🌐 Deployment

### GitHub Pages (Automatic)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on push to `main`.

1. Go to your repository Settings → Pages
2. Source: "GitHub Actions"
3. Push to `main` branch - deployment happens automatically

### Manual Deployment

For other hosting platforms:

```bash
# The entire folder can be deployed as-is
# No build step required - it's static HTML/CSS/JS

# Netlify
# Drag and drop the folder to netlify.com

# Vercel
vercel deploy

# Hostinger / cPanel
# Upload all files via FTP to public_html
```

---

## 🛠️ Development

### File Responsibilities

- **index.html** - Structure and content
- **assets/css/styles.css** - All styling (mobile-first responsive)
- **assets/js/main.js** - Interactivity (theme toggle, navigation, projects, modal, form)
- **assets/data/projects.json** - Project data (easily editable)

### Key Features

- ✅ Mobile-first responsive design (breakpoints: 480px, 768px, 1024px)
- ✅ Accessible hamburger menu for mobile
- ✅ Dark/light theme with localStorage persistence
- ✅ Dynamic project loading from JSON
- ✅ Project filter by category
- ✅ Modal with full project details
- ✅ Animated skill progress bars
- ✅ Contact form with validation
- ✅ Skip link for keyboard navigation
- ✅ ARIA labels and semantic HTML
- ✅ JSON-LD structured data for SEO
- ✅ Open Graph meta tags

### Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### No Build Required

This is a vanilla HTML/CSS/JS project. No npm, no bundlers, no frameworks (beyond what's loaded via CDN). This keeps it:

- Easy to understand and modify
- Fast to load
- Simple to deploy anywhere

---

## 🔄 Migrating to React (Future)

If you want to convert this to a React project later:

1. Create a new React project: `npx create-react-app sibghat-portfolio`
2. Convert HTML sections to React components
3. Move CSS to CSS modules or styled-components
4. Convert `projects.json` to a data file imported in React
5. Use React state for theme toggle, modal, etc.

Key components to create:
- `<Header />` - Navigation
- `<Hero />` - Hero section
- `<Skills />` - Skill bars
- `<Projects />` - Project grid with filtering
- `<ProjectModal />` - Modal component
- `<Contact />` - Contact form
- `<Footer />` - Footer

---

## 📄 License

MIT License - Feel free to use this as a template for your own portfolio!

---

## 👤 Author

**Sibghatullah**

- GitHub: [@Sibghatullah-pk](https://github.com/Sibghatullah-pk)
- LinkedIn: [Sibghat Ullah](https://www.linkedin.com/in/sibghat-ullah-8490aa279)
- Fiverr: [sibghatullah1a2a3a](https://www.fiverr.com/sibghatullah1a2a3a)
- Email: sibghatullah1a2a3a@gmail.com

---

## 🙏 Acknowledgments

- Ubuntu theme inspiration from [Canonical](https://design.ubuntu.com/)
- Icons from various free sources
- Fonts: [Ubuntu Font Family](https://fonts.google.com/specimen/Ubuntu)
