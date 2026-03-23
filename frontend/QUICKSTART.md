# Quick Start Guide

Get the landing page running in 3 minutes!

## Prerequisites Check

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

## Step 1: Install Dependencies

```bash
cd landing-page
npm install
```

Expected output: `added XXX packages in XXs`

## Step 2: Run Development Server

```bash
npm run dev
```

You should see:

```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Step 3: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the landing page with:

- ✅ Animated hero section
- ✅ Navigation bar
- ✅ Feature cards
- ✅ Architecture section
- ✅ Stats and CTA
- ✅ Footer

## Troubleshooting

### Port Already in Use

If port 3000 is busy:

```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

If you see TypeScript errors, run:

```bash
npm run build
```

This will show any type errors that need fixing.

## Next Steps

### Customize Content

1. **Update Hero Text**: Edit `components/Hero.tsx`
2. **Modify Features**: Edit `components/Features.tsx`
3. **Change Colors**: Edit `tailwind.config.js`
4. **Update Footer Links**: Edit `components/Footer.tsx`

### Build for Production

```bash
npm run build
npm run start
```

The optimized build will be in `.next/` folder.

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy!

## File Structure Quick Reference

```
📁 landing-page/
├── 📁 app/
│   ├── layout.tsx       # ← Site-wide layout & metadata
│   ├── page.tsx         # ← Main page (combines all sections)
│   └── globals.css      # ← Global styles
├── 📁 components/
│   ├── Navbar.tsx       # ← Top navigation
│   ├── Hero.tsx         # ← Hero banner
│   ├── Features.tsx     # ← 8 feature cards
│   ├── Architecture.tsx # ← 4-layer system
│   ├── StatsAndCTA.tsx  # ← Metrics & CTA
│   └── Footer.tsx       # ← Bottom footer
└── 📄 tailwind.config.js # ← Theme colors & fonts
```

## Common Customizations

### Change Brand Name

Find and replace `EmplifAI` in:

- `components/Navbar.tsx`
- `components/Footer.tsx`
- `app/layout.tsx`

### Update Social Links

Edit `components/Footer.tsx` line ~20:

```tsx
const socialLinks = [
  { icon: Github, href: "YOUR_GITHUB_URL", label: "GitHub" },
  { icon: Twitter, href: "YOUR_TWITTER_URL", label: "Twitter" },
  // ...
];
```

### Modify Colors

Edit `tailwind.config.js`:

```js
colors: {
  'accent-cyan': '#YOUR_COLOR',
  'accent-blue': '#YOUR_COLOR',
  // ...
}
```

## Performance Tips

- Images: Use Next.js `<Image>` component for optimization
- Fonts: Already optimized with `display=swap`
- Animations: Using Framer Motion (already optimized)
- Bundle: Automatically code-split by Next.js

## Need Help?

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- ✨ [Framer Motion Docs](https://www.framer.com/motion/)
- 🔍 Check the main `README.md` for detailed information

---

**You're all set!** Start customizing and building your landing page. 🚀
