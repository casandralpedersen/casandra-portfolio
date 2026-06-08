# Services Scroll Animation Design

## Goal

Refine the existing `Det her laver jeg` section so the five existing service boxes behave like a pinned scroll story:

- The section stays tall enough to create multiple deliberate scroll steps.
- One card is centered and pinned at a time.
- Each card holds in the center for about two scroll steps.
- During transitions, the current card moves upward and fades out while the next card rises from below and fades in.
- Outside the transition window, only one card is visible.

## Existing Context

The current `Services` component in `src/pages/Home.jsx` already uses:

- `useScroll` tied to the section
- a tall container with a sticky center layer
- `useTransform` per card for `opacity` and `y`

That means the work is primarily a behavior retune, not a structural rewrite.

## Approach

Use scroll progress from the existing section and split it into five equal card phases. Within each phase:

- an entry segment brings the next card from below into center
- a hold segment keeps that card fixed and fully visible
- an exit segment moves it upward while fading out

To make each card feel present for about two steps, the section height and phase timing will be calibrated together. The hold segment will be materially longer than the entry and exit segments.

## Component Changes

Update `Services` in `src/pages/Home.jsx` to:

- keep the existing five derived items
- centralize the timing math so all cards share the same progression model
- tighten visibility so non-active cards stay hidden outside the transition overlap
- keep the card stack rendered in a single sticky center layer

The section heading remains outside the sticky story area so the animation begins after the title is introduced.

## Motion Model

Per card, use a normalized timeline with four states:

1. Hidden below
2. Visible in center
3. Still visible in center
4. Hidden above

The transforms will be:

- `opacity`: `0 -> 1 -> 1 -> 0`
- `y`: positive offset -> `0` -> `0` -> negative offset

The hold window will be larger than the transition windows so the card visibly rests before changing.

## Layout

Adjust the services scroll area so:

- the outer section keeps the current visual language
- the story container is tall enough for all five cards to each get a hold period
- the sticky stage stays vertically centered on desktop and mobile
- card width remains constrained for readable text

## Mobile Behavior

On smaller screens:

- keep the same one-card-at-a-time behavior
- reduce card padding and vertical travel slightly
- preserve the pinned center feel without requiring oversized scroll distance

## Verification

Verify locally in browser that:

- exactly one card is readable at rest
- transitions overlap cleanly with no flashing
- the first and last cards enter and exit naturally
- the section feels deliberate on both desktop and mobile widths

## Out of Scope

This change does not alter the text content, reorder the five service items, or introduce additional controls such as pagination dots or buttons.
