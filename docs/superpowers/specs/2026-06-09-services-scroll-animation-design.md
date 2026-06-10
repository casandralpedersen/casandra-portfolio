# Services Scroll Animation Design

## Goal
Replace the current `Det her laver jeg` presentation in `NytPortfolio-kopi` with a scroll-driven sticky stack for the five existing text boxes.
The new behavior should feel calm and editorial:
- the section is tall enough to support multiple deliberate scroll steps
- one text box is pinned in the center at a time
- each box stays centered for about two scroll steps before changing
- the current box fades out while moving upward
- the next box fades in from below while moving into the center
- the heading stays outside the sticky animation area

## Existing Context
The `Services` component in `src/pages/Home.jsx` already derives the five content items needed for this section. The current presentation in this repo should be fully replaced rather than blended with the older zigzag and curve layout.
This work should stay localized to the existing services section instead of introducing a new page structure or splitting the content into separate components unless implementation pressure clearly requires it.

## Chosen Approach
Use a `sticky stack` layout:
- a tall scroll container creates the pacing
- a single sticky viewport stays centered during the sequence
- all five boxes render in the same visual stack
- scroll progress determines which box is active and whether the next box is entering

This approach is preferred over snap-like stepping or broader multi-card overlap because it best matches the requested pinned center behavior while preserving a calm reading rhythm.

## Interaction Model
The full scroll range is divided into five card phases, one for each box.
Inside each phase:
1. The active box enters from slightly below with a soft fade in.
2. The box remains fixed in the center for the majority of the phase.
3. Near the end of the phase, it fades out while moving upward.
4. At the same time, the next box fades in from below and settles into the center.

Only the active box and, during the transition window, the next box should be visible. All other boxes remain hidden so the section always reads as one focused message at a time.

## Scroll Timing — Concrete Values
The scroll container is exactly `600vh` tall. Each of the five boxes owns an equal `120vh` segment of that scroll range.

Within each `120vh` segment:
- **Hold phase: 80vh** — the box is fully visible, `opacity: 1`, `translateY(0)`. This corresponds to approximately two deliberate trackpad scroll gestures on a Mac.
- **Transition phase: 40vh** — the current box fades out from `opacity: 1, translateY(0)` to `opacity: 0, translateY(-40px)` while the next box simultaneously fades in from `opacity: 0, translateY(40px)` to `opacity: 1, translateY(0)`.

The first box should already be fully visible (`opacity: 1, translateY(0)`) when the user reaches the top of the scroll container, with no enter animation required for box one. The last box should remain at `opacity: 1, translateY(0)` after its hold phase ends and never exit — it stays visible until the user scrolls past the section entirely.

## Motion Values
- Enter: `translateY(40px)` → `translateY(0)`, `opacity: 0` → `opacity: 1`
- Exit: `translateY(0)` → `translateY(-40px)`, `opacity: 1` → `opacity: 0`
- No easing curve applied in JavaScript — the scroll position itself acts as the easing input. CSS `transition` should not be used on these properties; all values are set directly from scroll progress.

## Layout
- The section heading remains above the sticky scroll area
- The sticky area is `height: 100vh`, `position: sticky`, `top: 0`, centered vertically and horizontally
- Card width is constrained to a readable line length (suggested max-width: `600px`)
- All five boxes are `position: absolute` inside the sticky area, centered with `top: 50%`, `left: 50%`, `transform-origin: center center`
- Hidden boxes use `opacity: 0` and must not be visible or affect layout outside the active overlap window

## Implementation Notes
Update `Services` in `src/pages/Home.jsx` to:
- keep the existing derived `items` array for the five boxes
- attach a `scroll` event listener scoped to `window`, reading `sectionRef.getBoundingClientRect()` or `scrollY` relative to the section's `offsetTop`
- compute a single `scrollProgress` value from `0` to `1` across the full `600vh`
- derive each box's `opacity` and `translateY` from that shared progress value using the phase math above
- set styles directly via `ref.style.opacity` and `ref.style.transform` on each box — no React state updates on scroll
- remove event listener on component unmount

The phase math for box `i` (zero-indexed, five boxes total):
- Each box owns the range `[i/5, (i+1)/5]` of the normalized `0–1` progress
- Within that range, hold ends at `i/5 + 0.8/5` and transition ends at `(i+1)/5`
- During hold: `opacity = 1`, `translateY = 0`
- During transition: interpolate linearly from hold-end to phase-end

## Verification
Verify locally in browser that:
- box one is fully visible the moment the sticky area enters the viewport
- each box holds long enough to feel like two deliberate scroll steps
- transitions are smooth and calm without flicker
- the next box enters from below while the current exits upward
- the final box remains visible and does not exit
- no other boxes are visible outside the active transition window

## Out of Scope
This change does not:
- rewrite the service copy
- reorder the five boxes
- add pagination dots, arrows, or buttons
- keep any part of the old zigzag and curve presentation in this repo copy
- introduce mobile-specific breakpoints or reduced motion values at this stage
