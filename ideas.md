# Nonogram Story — Design Brainstorm

## Project Context
A romantic single-player Nonogram puzzle game as a surprise gift. 40 levels across 3 chapters, with a story arc from meeting to love confession. Must feel retro like nonograms.org / printed puzzle books. No modern UI patterns.

---

<response>
## Idea 1: "Newspaper Puzzle Page"

<text>
**Design Movement:** Editorial / Newsprint Aesthetic — inspired by newspaper puzzle sections from the 1980s-90s.

**Core Principles:**
1. Everything looks like it was printed on slightly aged newsprint paper
2. Typography is strictly utilitarian — monospace for puzzles, serif for story text
3. No color except black, white, and a faded sepia/cream background
4. Layouts mimic newspaper column structures

**Color Philosophy:** Cream (#F5F0E8) background simulating aged paper, pure black (#1A1A1A) for all lines and text, a muted red (#8B4513) for rare accents like hearts or chapter markers. The emotional intent is nostalgia and warmth through simplicity.

**Layout Paradigm:** Single-column centered layout with generous margins, like a puzzle book page. The map screen uses a vertical scroll with level nodes arranged in a winding dotted path.

**Signature Elements:**
1. Dotted separator lines between sections (like newspaper column dividers)
2. Small decorative dingbats (❧, ✦, ♥) as section markers
3. "Torn paper" edges on story cards (CSS clip-path)

**Interaction Philosophy:** Clicks feel like pencil marks — immediate, no animation. Wrong answers get an X like a teacher's correction mark. No hover states, no transitions.

**Animation:** None. Static transitions between screens with simple fade-in of text content only. Page changes are instant.

**Typography System:**
- Headings: "Playfair Display" serif, bold
- Body/Story: "Lora" serif, regular
- Puzzle clues/numbers: "IBM Plex Mono" monospace
- UI labels: "IBM Plex Mono" monospace, small caps
</text>
<probability>0.06</probability>
</response>

---

<response>
## Idea 2: "Retro Japanese Puzzle Magazine"

<text>
**Design Movement:** Japanese puzzle magazine aesthetic (Nikoli-style) — clean, precise, with subtle warmth.

**Core Principles:**
1. Ultra-clean grid with mathematical precision
2. Warm off-white with subtle grid patterns
3. Minimal decoration — let the puzzle be the star
4. Soft, warm typography that feels handwritten but readable

**Color Philosophy:** Warm white (#FAF8F5) base, charcoal (#2C2C2C) for grids and text, soft terracotta (#C4725A) for accents and hearts, muted sage (#8B9E7E) for completed states. Emotional intent: calm focus, like sitting in a quiet café solving puzzles.

**Layout Paradigm:** Centered puzzle area with clues forming an L-shape frame. Map screen uses a winding path with small circular nodes connected by a thin dotted line, scrolling vertically.

**Signature Elements:**
1. Thin double-line borders around major sections
2. Small stamp-like chapter markers ("CH.1", "CH.2")
3. Tiny pixel-art icons next to level titles

**Interaction Philosophy:** Precise and satisfying. Cells fill with a solid black square instantly. X marks are thin and elegant. No hover, no glow — just clean state changes.

**Animation:** Minimal. A subtle 150ms opacity transition when navigating between screens. Completed clues get a gentle strikethrough. Nothing else moves.

**Typography System:**
- Headings: "Crimson Pro" serif
- Story text: "Crimson Pro" serif, italic for emotional moments
- Puzzle numbers: "JetBrains Mono" or "Source Code Pro" monospace
- UI: "Source Code Pro" monospace, uppercase for labels
</text>
<probability>0.08</probability>
</response>

---

<response>
## Idea 3: "Love Letter Sketchbook"

<text>
**Design Movement:** Handcrafted sketchbook / personal journal aesthetic — as if the game itself is a handmade gift.

**Core Principles:**
1. Feels like opening someone's personal notebook
2. Subtle paper texture and ruled lines in the background
3. Mix of "handwritten" and clean typefaces
4. Warm, intimate color palette

**Color Philosophy:** Soft ivory (#FDF8F0) like journal paper, dark brown ink (#3B2F2F) for text and grids, dusty rose (#C9A0A0) for hearts and romantic accents, soft gold (#D4A574) for completion stamps. Emotional intent: intimacy, as if each page was written by hand for the recipient.

**Layout Paradigm:** Pages that feel like turning through a journal. The map is a vertical timeline with small sketched nodes. Story screens have text that appears line by line as if being written.

**Signature Elements:**
1. Faint ruled lines in the background of story screens
2. Small hand-drawn style icons (CSS/SVG, not actual images)
3. A wax-seal stamp effect for completed chapters

**Interaction Philosophy:** Gentle and personal. Filling a cell feels like inking a square. Mistakes get a soft X. The whole experience should feel quiet and private.

**Animation:** Text on story screens fades in line by line (300ms stagger). Screen transitions use a gentle 200ms fade. Grid interactions are instant — no animation on cells.

**Typography System:**
- Headings: "Playfair Display" serif, italic
- Story text: "Lora" serif, with generous line-height
- Puzzle numbers: "Fira Code" or "IBM Plex Mono" monospace
- Romantic accents: "Playfair Display" italic for quotes and the final letter
</text>
<probability>0.07</probability>
</response>
