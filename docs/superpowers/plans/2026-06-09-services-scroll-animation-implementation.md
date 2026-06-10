# Services Scroll Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current `Det her laver jeg` presentation with a five-step sticky scroll story where one text box stays pinned in the center, holds for `80vh`, and transitions over `40vh`.

**Architecture:** Keep the implementation inside the existing `Services` function in `src/pages/Home.jsx`, where the five service items are already derived. Use one section-level scroll listener plus direct style updates on the box refs, and keep layout constants in `src/styles/global.css` so the sticky scene height and initial hidden state stay predictable.

**Tech Stack:** React 18, Vite 6, Framer Motion, Tailwind CSS v4, Playwright

---

## File Structure

- Modify: `src/pages/Home.jsx`
  - Own the `Services` section structure, scroll math, and per-box style updates.
- Modify: `src/styles/global.css`
  - Own the sticky scene height, sticky viewport sizing, and initial box transform state.
- Reference: `docs/superpowers/specs/2026-06-09-services-scroll-animation-design.md`
  - Source of truth for timing, height, and movement values.

### Task 1: Lock Layout Constants

**Files:**
- Modify: `src/styles/global.css`
- Reference: `docs/superpowers/specs/2026-06-09-services-scroll-animation-design.md`

- [ ] **Step 1: Confirm the current services scene CSS before editing**

Run: `sed -n '40,120p' src/styles/global.css`
Expected: existing `.services-scroll-stage`, `.services-scroll-sticky`, `.services-scroll-stack`, and `.services-scroll-box` rules are visible.

- [ ] **Step 2: Update the sticky scene dimensions and base hidden state**

Replace the services rules in `src/styles/global.css` with:

```css
.services-scroll-stage {
  position: relative;
  height: 600vh;
}

.services-scroll-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.services-scroll-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.services-scroll-box {
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) translateY(40px);
  transform-origin: center center;
  will-change: transform, opacity;
}
```

- [ ] **Step 3: Run a build to catch CSS or import issues early**

Run: `npm run build`
Expected: Vite build completes successfully.

- [ ] **Step 4: Commit the layout baseline**

```bash
git add src/styles/global.css
git commit -m "Adjust services sticky scene layout"
```

### Task 2: Implement Shared Scroll Phase Math

**Files:**
- Modify: `src/pages/Home.jsx`
- Reference: `docs/superpowers/specs/2026-06-09-services-scroll-animation-design.md`

- [ ] **Step 1: Inspect the current `Services` implementation before editing**

Run: `sed -n '120,280p' src/pages/Home.jsx`
Expected: `Services` contains the `items` array, section ref, box refs, and the current scroll effect.

- [ ] **Step 2: Replace the current per-box scroll math with the spec values**

Inside `Services`, use this effect structure:

```jsx
  useEffect(() => {
    const section = ref.current
    const boxes = boxRefs.current.filter(Boolean)

    if (!section || boxes.length === 0) {
      return undefined
    }

    const segmentCount = boxes.length
    const holdRatio = 80 / 120
    const travel = 40
    let rafId = 0

    const applyBoxState = (box, opacity, translateY) => {
      box.style.opacity = String(opacity)
      box.style.transform = `translate(-50%, -50%) translateY(${translateY}px)`
    }

    const updateBoxes = () => {
      const rect = section.getBoundingClientRect()
      const totalScrollable = Math.max(section.offsetHeight - window.innerHeight, 1)
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable)
      const progress = scrolled / totalScrollable
      const segmentSize = 1 / segmentCount

      boxes.forEach(box => {
        applyBoxState(box, 0, travel)
      })

      const activeIndex = Math.min(
        segmentCount - 1,
        Math.floor(progress / segmentSize)
      )
      const segmentStart = activeIndex * segmentSize
      const holdEnd = segmentStart + segmentSize * holdRatio
      const segmentEnd = segmentStart + segmentSize
      const currentBox = boxes[activeIndex]
      const nextBox = boxes[activeIndex + 1]

      if (!currentBox) {
        return
      }

      if (activeIndex === segmentCount - 1) {
        applyBoxState(currentBox, 1, 0)
        return
      }

      if (progress <= holdEnd) {
        applyBoxState(currentBox, 1, 0)
        return
      }

      const transitionProgress = (progress - holdEnd) / (segmentEnd - holdEnd)

      applyBoxState(
        currentBox,
        1 - transitionProgress,
        -travel * transitionProgress
      )

      if (nextBox) {
        applyBoxState(
          nextBox,
          transitionProgress,
          travel * (1 - transitionProgress)
        )
      }
    }

    const requestUpdate = () => {
      cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(updateBoxes)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])
```

- [ ] **Step 3: Preserve upward exit state for previous boxes**

After the `boxes.forEach(box => { ... })` reset, add a second pass so completed boxes stay hidden above instead of snapping back below:

```jsx
      boxes.forEach((box, index) => {
        if (index < activeIndex) {
          applyBoxState(box, 0, -travel)
        }
      })
```

- [ ] **Step 4: Keep the JSX centered and readable**

Ensure the sticky section markup remains:

```jsx
      <div className="services-scroll-stage">
        <div className="services-scroll-sticky">
          <div className="services-scroll-stack">
            {items.map((item, index) => (
              <div
                key={item.number}
                ref={element => {
                  boxRefs.current[index] = element
                }}
                className="services-scroll-box mx-auto w-full max-w-[600px] border border-[var(--color-text)]/10 bg-[var(--color-base)]/88 px-6 py-8 shadow-[0_0_0_1px_rgba(41,92,125,0.04)] backdrop-blur-[1px] md:px-8 md:py-10"
              >
```

- [ ] **Step 5: Run a build to verify the effect compiles**

Run: `npm run build`
Expected: build passes without React or syntax errors.

- [ ] **Step 6: Commit the scroll behavior**

```bash
git add src/pages/Home.jsx
git commit -m "Implement services sticky scroll timing"
```

### Task 3: Verify the Story Flow in Browser

**Files:**
- Modify: `src/pages/Home.jsx` if timing or visibility needs adjustment
- Modify: `src/styles/global.css` if layout or centering needs adjustment

- [ ] **Step 1: Start the local dev server**

Run: `npm run dev`
Expected: Vite serves the app locally, typically on `http://127.0.0.1:5174/` in this repo copy.

- [ ] **Step 2: Capture automated browser evidence for the services section**

Run:

```bash
node -e "import('playwright').then(async ({ chromium }) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Det her laver jeg' }).scrollIntoViewIfNeeded();
  for (let i = 0; i < 10; i++) {
    if (i > 0) {
      await page.mouse.wheel(0, 180);
      await page.waitForTimeout(120);
    }
    const data = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.services-scroll-box')).map((box, index) => ({
        index,
        opacity: getComputedStyle(box).opacity,
        transform: getComputedStyle(box).transform,
        text: box.querySelector('h3')?.textContent,
      }))
    );
    console.log(JSON.stringify({ step: i + 1, data }, null, 2));
  }
  await browser.close();
})"
```

Expected:
- only one box is at or near full opacity at rest
- during transitions, current and next box overlap briefly
- transforms move from `translateY(40px)` to `0` to `translateY(-40px)`

- [ ] **Step 3: Check mobile centering**

Run:

```bash
node -e "import('playwright').then(async ({ chromium }) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Det her laver jeg' }).scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 260);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'tmp/services-mobile.png', fullPage: false });
  await browser.close();
})"
```

Expected: the active box remains visually centered and readable on mobile width.

- [ ] **Step 4: If needed, make one timing or centering adjustment and rebuild**

Run: `npm run build`
Expected: build still passes after any final tweak.

- [ ] **Step 5: Commit the verified polish**

```bash
git add src/pages/Home.jsx src/styles/global.css
git commit -m "Polish services scroll animation"
```
