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

## Motion Direction

The motion should be restrained rather than dramatic:

- moderate vertical travel
- soft opacity changes
- no hard cuts or aggressive parallax
- no extra decorative motion competing with the text

The last box should end cleanly and remain readable at the end of the sequence instead of disappearing abruptly.

## Layout

The section should keep the current visual language of the homepage while shifting the content into a centered storytelling frame:

- the section heading remains above the sticky scroll area
- the sticky area is vertically centered on desktop and mobile
- card width stays constrained for readable line length
- the scroll container is tall enough that each card clearly gets a hold period

The existing service copy and ordering stay unchanged.

## Implementation Notes

Update `Services` in `src/pages/Home.jsx` to:

- keep the existing derived `items` array for the five boxes
- drive animation from the section's own scroll progress
- centralize the phase math so every box uses the same timing model
- apply opacity and vertical translation directly to each box based on its phase state
- ensure hidden boxes do not remain visually present outside the active overlap

The implementation should remain simple and readable, with timing logic shared rather than hand-tuned separately per box.

## Mobile Behavior

Mobile should preserve the same one-box-at-a-time story:

- the sticky center behavior remains
- card padding can reduce slightly
- vertical travel can shorten slightly
- the scroll distance should still feel intentional, not cramped

## Verification

Verify locally in browser that:

- one box is clearly readable at rest
- each box holds in the center long enough to feel deliberate
- transitions are smooth and calm, without flicker
- the next box enters from below while the current one exits upward
- the final box lands cleanly
- the section works at both desktop and mobile widths

## Out of Scope

This change does not:

- rewrite the service copy
- reorder the five boxes
- add pagination dots, arrows, or buttons
- keep any part of the old zigzag and curve presentation in this repo copy
