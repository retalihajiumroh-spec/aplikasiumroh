# SA'YA Umroh UI Design System

## Overview

This design system creates a premium, luxury experience for the SA'YA Umroh application. Every element reflects elegance, spirituality, and high-end service quality through carefully chosen colors, typography, and interactive patterns.

## 🎨 Color Palette

### Primary Gold
- **#d4a574** - Main luxury gold (used for gradients, accents, highlights)
- Represents spirituality, prestige, and timeless elegance

### Gold Variations
```
Gold 50:   #fef9f0 (lightest highlight)
Gold 100:  #fef3e6 (subtle background)
Gold 200:  #fce8cd (borders, dividers)
Gold 300:  #f9d7a0 (hover states)
Gold 400:  #f5c170 (gradient highlight)
Gold 500:  #d4a574 (primary)
Gold 600:  #c89350 (hover)
Gold 700:  #a67338 (active)
Gold 800:  #8a5c2f (dark)
Gold 900:  #6d4727 (darkest)
```

### Supporting Colors
- **Cream**: `#faf8f5` - Premium background (calm, sophisticated)
- **Charcoal**: `#1a1a1a` - Text and dark elements (high contrast)
- **White**: Pure white for cards and content areas

## 🔤 Typography

### Font Families
- **Display**: Georgia (serif) - Headlines and brand
- **Body**: Inter (sans-serif) - Content and UI

### Sizes & Weights
- H1: 56-72px, Bold
- H2: 42-48px, Bold
- H3: 28-32px, Bold
- Body: 16px, Regular
- Caption: 12-14px, Regular

## 🎯 Component Guidelines

### Buttons
- **Primary**: Gold gradient, white text, scale on hover
- **Secondary**: Gold background, dark text
- **Outline**: Transparent with gold border
- **Ghost**: No background, text-only

All have focus states with gold ring and smooth transitions.

### Cards
- **Luxury**: Gradient background, gold border, premium shadow
- **Default**: White background, gold border
- **Minimal**: Cream background, subtle border

### Badges
- **Premium**: Gold gradient with border, used for highlights
- **Gold**: Solid gold background
- **Default**: Light gold background
- **Success**: Green variant for confirmations

## ✨ Effects & Animations

### Shadows
- **Gold Shadows**: Tinted with gold color for luxury feel
- Small, Medium, Large variants based on elevation

### Animations
- **Shimmer**: 2s opacity pulse for attention
- **Float**: 6s vertical movement for decoration
- **Glow**: 3s shadow intensity pulse

### Transitions
- All interactive elements use 300ms ease transitions
- Smooth color, shadow, and scale changes
- Focus states provide clear accessibility

## 📱 Responsive Design

- **Mobile First**: Start with mobile, enhance for larger screens
- **Breakpoints**: SM (640px), MD (768px), LG (1024px)
- **Spacing**: Consistent gutters and sections
- **Touch Targets**: Minimum 44px for buttons

## 🌐 Layout System

### Container
- Max-width: 1280px (80rem)
- Horizontal padding: 1rem
- Centered with auto margins

### Spacing
- Gutter: 1rem
- Section: 4rem (py-24)
- Grid gaps: 8px-32px

## ♿ Accessibility

- **Color Contrast**: WCAG AA compliant (gold on white, etc.)
- **Focus States**: Clear gold ring outlines
- **Semantic HTML**: Proper heading hierarchy
- **Icon Labels**: All icons have aria-labels
- **Motion**: Prefers-reduced-motion support

## 🚀 Usage Examples

### Premium Button
```tsx
<Button variant="primary" size="lg" className="hover:shadow-gold-lg">
  Book Premium Package
</Button>
```

### Luxury Card
```tsx
<Card variant="luxury" className="gold-glow">
  <h3 className="font-display text-gold-600">Premium Experience</h3>
  <p className="font-body text-charcoal-700">Luxury content here</p>
</Card>
```

### Premium Badge
```tsx
<Badge variant="premium" className="animate-shimmer">
  ✨ Most Popular
</Badge>
```

### Hero Section Pattern
```tsx
<section className="bg-gradient-to-br from-cream-50 to-gold-50">
  <div className="absolute opacity-20 blur-3xl animate-float w-96 h-96 bg-gold-200" />
  {/* Content */}
</section>
```

## 🎨 Dark Mode Considerations

Current implementation uses light luxury theme. For dark mode extension:
- Use charcoal-900 as background
- Light gold accents remain for contrast
- White text on dark backgrounds
- Reduce blur effects for performance

## 📊 Design Tokens

All design tokens are defined in `tailwind.config.ts` for consistency:
- Colors: Complete palette with naming convention
- Shadows: Gold-tinted at multiple elevations
- Typography: Font families with weights
- Spacing: Consistent scale
- Animation: Predefined keyframes
- Border Radius: Luxury border-radius value

## 🔄 Extending the Design

When adding new components:
1. Use existing color tokens
2. Follow animation patterns
3. Maintain shadow hierarchy
4. Keep typography consistent
5. Ensure accessibility standards
6. Test responsive behavior

---

**Design Philosophy**: Luxury through simplicity, elegance through consistency, spirituality through color and typography.
