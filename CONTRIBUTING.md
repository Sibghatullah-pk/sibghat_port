# Contributing to Sibghatullah's Portfolio

Thank you for your interest in contributing! This portfolio is a personal project, but contributions are welcome.

## How to Contribute

### Reporting Issues
- **Found a bug?** Open an issue with:
  - Clear description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots (if applicable)
  - Browser/environment details

### Suggesting Improvements
- **New feature idea?** 
  - Open an issue with title: `[FEATURE] Brief description`
  - Describe the use case and benefits
  - Provide mockups if applicable

### Code Contributions
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes following the style guide
4. **Test** thoroughly in multiple browsers
5. **Commit** with clear messages: `git commit -m "feat: add amazing feature"`
6. **Push** to your fork: `git push origin feature/your-feature`
7. **Open** a Pull Request with detailed description

## Development Guidelines

### HTML/CSS/JS Standards
- Use **semantic HTML5** elements
- Follow **BEM** naming convention for CSS classes
- Write **vanilla JavaScript** (no frameworks for main site)
- Ensure **WCAG 2.1 AA** accessibility compliance
- Add proper **ARIA labels** and roles
- Test on mobile devices (320px+ width)

### Commit Message Format
```
type(scope): subject

body

footer
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore

**Example:**
```
feat(projects): add project modal animation

Added smooth entrance animation for project modal with
fade and scale effects. Uses CSS transitions for performance.

Closes #42
```

### Testing Checklist
Before submitting a PR, verify:
- ✅ Works on desktop (Chrome, Firefox, Safari, Edge)
- ✅ Works on mobile (iOS Safari, Chrome Mobile)
- ✅ Responsive at all breakpoints (320px, 480px, 768px, 1024px)
- ✅ Keyboard navigation working
- ✅ Screen reader compatible
- ✅ No console errors or warnings
- ✅ Performance is maintained (Lighthouse 95+)

## Code Style

### CSS
- Use CSS custom properties for colors
- Mobile-first approach
- Prefer flexbox/grid over floats
- Include comments for complex logic

### JavaScript
- Use `const` by default, `let` if reassignment needed
- Avoid global variables
- Use descriptive variable names
- Comment complex functions
- Use console for debugging (remove before commit)

### Comments
```javascript
// Single-line comment for simple statements

/**
 * Multi-line comment for functions
 * @param {type} paramName - Description
 * @return {type} Description
 */
```

## Pull Request Process
1. Update **README.md** with any new features
2. Update **CHANGELOG.md** with changes
3. Ensure all checks pass (CI/CD)
4. Request review from maintainer
5. Squash commits if requested

## Project Structure
```
sibghat_port/
├── index.html          # Main page
├── README.md           # Documentation
├── .github/workflows/  # GitHub Actions
└── assets/
    ├── css/            # Stylesheets
    ├── js/             # JavaScript
    ├── data/           # projects.json
    ├── images/         # Screenshots
    └── icons/          # UI icons
```

## Questions?
- 💬 Open a discussion
- 🐛 Report issues clearly
- 📧 Contact: sibghatullah1a2a3a@gmail.com

---

**Thank you for contributing to make this portfolio better!** 🙏
