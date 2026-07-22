---
version: "alpha"
name: "Nexus Core - Autonomous Systems"
description: "Nexus Core Onboarding Section is designed for building reusable UI components in modern web projects. Key features include reusable structure, responsive behavior, and production-ready presentation. It is suitable for component libraries and responsive product interfaces."
colors:
  primary: "#00E5FF"
  secondary: "#0A0A0A"
  tertiary: "#0A3BFF"
  neutral: "#0A0A0A"
  background: "#00E5FF"
  surface: "#0A0A0A"
  text-primary: "#FFFFFF"
  text-secondary: "#00E5FF"
  border: "#FFFFFF"
  accent: "#00E5FF"
typography:
  display-lg:
    fontFamily: "Bricolage Grotesque"
    fontSize: "52px"
    fontWeight: 300
    lineHeight: "52px"
    letterSpacing: "-0.05em"
    textTransform: "uppercase"
  body-md:
    fontFamily: "System Font"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22.75px"
  label-md:
    fontFamily: "SFMono-Regular"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "1.2px"
    textTransform: "uppercase"
rounded:
  md: "4px"
spacing:
  base: "4px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "14px"
  gap: "8px"
  card-padding: "32px"
  section-padding: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "14px"
  button-secondary:
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "8px"
  button-link:
    textColor: "{colors.text-primary}"
    rounded: "0px"
    padding: "0px"
  card:
    rounded: "0px"
    padding: "32px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Bounded
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses dark mode with #00E5FF as the main accent and #0A0A0A as the neutral foundation.

- **Primary (#00E5FF):** Main accent and emphasis color.
- **Secondary (#0A0A0A):** Supporting accent for secondary emphasis.
- **Tertiary (#0A3BFF):** Reserved accent for supporting contrast moments.
- **Neutral (#0A0A0A):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #00E5FF; Surface: #0A0A0A; Text Primary: #FFFFFF; Text Secondary: #00E5FF; Border: #FFFFFF; Accent: #00E5FF

- **Gradients:** bg-gradient-to-b from-white/20 to-transparent

## Typography

Typography pairs Bricolage Grotesque for display hierarchy with System Font for supporting content and interface copy.

- **Display (`display-lg`):** Bricolage Grotesque, 52px, weight 300, line-height 52px, letter-spacing -0.05em, uppercase.
- **Body (`body-md`):** System Font, 14px, weight 400, line-height 22.75px.
- **Labels (`label-md`):** SFMono-Regular, 12px, weight 600, line-height 16px, letter-spacing 1.2px, uppercase.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, bounded structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / bounded composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Bounded
- **Base unit:** 4px
- **Scale:** 4px, 8px, 12px, 14px, 16px, 20px, 24px, 32px
- **Section padding:** 32px, 56px
- **Card padding:** 32px, 56px
- **Gaps:** 8px, 16px, 24px, 32px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF
- **Shadows:** rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px; rgb(0, 229, 255) 0px 0px 8px 0px
- **Blur:** 4px

## Shapes

Shapes rely on a tight radius system anchored by 2px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 2px, 4px, 20px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles. Reuse the existing card surface recipe for content blocks.

### Buttons
- **Primary:** background #00E5FF, text #000000, radius 4px, padding 14px, border 0px solid rgb(229, 231, 235).
- **Secondary:** text #FFFFFF, radius 4px, padding 8px, border 1px solid rgba(255, 255, 255, 0.2).
- **Links:** text #FFFFFF, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Cards and Surfaces
- **Card surface:** radius 0px, padding 32px, shadow none.

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 2px, 4px, 20px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected moderate motion intensity without a deliberate reason.

## Motion

Motion feels controlled and interface-led across text, layout, and section transitions. Timing clusters around 150ms and 2000ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and color changes.

**Motion Level:** moderate

**Durations:** 150ms, 2000ms

**Easings:** ease, cubic-bezier(0.4, 0, 1), 0.2, 0.6

**Hover Patterns:** text, color, stroke

## WebGL

Reconstruct the graphics as a inset 3d accent using webgl, renderer, alpha, antialias. The effect should read as retro-futurist, technical, and meditative: dot-matrix particle field with green on black and sparse spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Inset 3D accent
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** WebGL, Renderer, alpha, antialias

**Techniques:** Dot matrix, Breathing pulse, Pointer parallax, DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <canvas width="1200" height="1344" style="display: block; width: 600px; height: 672px;"></canvas>
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      document.addEventListener('DOMContentLoaded', () => {
          const container = document.getElementById('webgl-container');
          if (!container) return;

          // Scene setup
          const scene = new THREE.Scene();

          // Isometric Camera setup
      â€¦
      ```
  - **Renderer setup:**
    - **Language:** js
    - **Snippet:**
      ```
      const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
      camera.position.set(20, 20, 20);
      camera.lookAt(scene.position);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      ```
  - **Scene setup:**
    - **Language:** js
    - **Snippet:**
      ```
      const container = document.getElementById('webgl-container');
      if (!container) return;

      // Scene setup
      const scene = new THREE.Scene();

      // Isometric Camera setup
      const aspect = container.clientWidth / container.clientHeight;
      â€¦
      ```

## ThreeJS

Reconstruct the Three.js layer as a inset 3d accent that feels retro-futurist and technical. Use alpha, antialias renderer settings, orthographic projection, box geometry, meshstandardmaterial materials, and ambient + directional + point lighting. Motion should read as slow orbital drift, with poster frame + dom fallback.

**Id:** threejs

**Label:** ThreeJS

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Inset 3D accent
  - **Render:**
    - **Value:** alpha, antialias
  - **Camera:**
    - **Value:** Orthographic projection
  - **Lighting:**
    - **Value:** ambient + directional + point
  - **Materials:**
    - **Value:** MeshStandardMaterial
  - **Geometry:**
    - **Value:** box
  - **Motion:**
    - **Value:** Slow orbital drift

**Techniques:** PBR shading, Timeline beats, alpha, antialias, Poster frame + DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <canvas width="1200" height="1344" style="display: block; width: 600px; height: 672px;"></canvas>
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      document.addEventListener('DOMContentLoaded', () => {
          const container = document.getElementById('webgl-container');
          if (!container) return;

          // Scene setup
          const scene = new THREE.Scene();

          // Isometric Camera setup
      â€¦
      ```
  - **Renderer setup:**
    - **Language:** js
    - **Snippet:**
      ```
      const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
      camera.position.set(20, 20, 20);
      camera.lookAt(scene.position);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      ```
  - **Scene setup:**
    - **Language:** js
    - **Snippet:**
      ```
      const container = document.getElementById('webgl-container');
      if (!container) return;

      // Scene setup
      const scene = new THREE.Scene();

      // Isometric Camera setup
      const aspect = container.clientWidth / container.clientHeight;
      â€¦
      ```
