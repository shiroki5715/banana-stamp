# Project Rules

Implementation and collaboration rules for **line-stamp (Nanobanana Pro)**.
This file is referenced by the `review_code` skill.

## 1. Design Principles (Pop & Cute)
- **Concept**: A playful, approachable, "Sunday Morning" vibe.
- **Colors**:
    - Primary: Banana Yellow `#F7E017`
    - Secondary: LINE Green `#06C755` (Use `#05A545` for text/buttons for better contrast)
    - Warning/Error: Red/Orange (Avoid harsh pure red)
- **Typography**:
    - **Font**: `Zen Maru Gothic` (Rounded) is mandatory for headings and body text to ensure cuteness.
    - **No System Fonts**: Do not rely on default sans-serif.
- **UI Components**:
    - **Rounded Corners**: Use `rounded-2xl` or `rounded-3xl` (16px+).
    - **Shadows**: Soft, diffuse shadows (e.g., `box-shadow: 0 4px 12px rgba(...)`).
    - **Backgrounds**: Dotted patterns or subtle gradients. Avoid plain white if possible for main areas.

## 2. Tech Stack Patterns (Next.js App Router)
- **CSS**:
    - Use **CSS Modules** (`*.module.css`) for all component styling.
    - Avoid global CSS for component-specific styles.
    - Avoid Tailwind (unless specifically requested for prototyping).
- **React**:
    - Use Functional Components with Hooks.
    - Explicitly mark Client Components with `"use client"`.
    - Minimize client-side Javascript where possible (use Server Components for static content).
- **Clean Code**:
    - No direct DOM manipulation (use Refs).
    - clear separation of `utils` (logic) and `components` (UI).

## 3. Accessibility (Quality Guard)
- **Contrast**: Text must meet WCAG AA contrast ratio. Use darker greens/oranges on yellow backgrounds.
- **Alt Text**: All images must have meaningful `alt` attributes.
- **Keyboard Nav**: Interactive elements must be focusable.

## 4. Git & Workflow
- **Commit Messages**: Follow conventional commits (feat, fix, docs, style, refactor).
- **Branching**: `feature/xxx`, `fix/xxx`.
