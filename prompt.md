# User Prompts Log

This document records all user prompts provided to build and configure the **Metro Transit Wayfinding** project in chronological order.

---

## Prompt 1: Initial App Creation & Design System Specification

```text
Build me an app with screens that look like this. You can hotlink images from the html
```

### Attached Design Specification:

```yaml
name: Metro Transit Wayfinding
colors:
  surface: '#f8f9ff'
  surface-dim: '#d2dbea'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5eefe'
  surface-container-high: '#e0e9f8'
  surface-container-highest: '#dae3f2'
  on-surface: '#131c27'
  on-surface-variant: '#50434d'
  inverse-surface: '#28313d'
  inverse-on-surface: '#eaf1ff'
  outline: '#82737e'
  outline-variant: '#d4c1ce'
  surface-tint: '#8f3e8e'
  primary: '#4f0053'
  on-primary: '#ffffff'
  primary-container: '#6b1d6d'
  on-primary-container: '#e68ce2'
  inverse-primary: '#ffaaf9'
  secondary: '#a73b00'
  on-secondary: '#ffffff'
  secondary-container: '#fe6b27'
  on-secondary-container: '#5a1c00'
  tertiary: '#192a48'
  on-tertiary: '#ffffff'
  tertiary-container: '#30405f'
  on-tertiary-container: '#9bacd1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd6f8'
  primary-fixed-dim: '#ffaaf9'
  on-primary-fixed: '#37003a'
  on-primary-fixed-variant: '#732574'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#d7e2ff'
  tertiary-fixed-dim: '#b6c7ec'
  on-tertiary-fixed: '#081b38'
  on-tertiary-fixed-variant: '#364766'
  background: '#f8f9ff'
  on-background: '#131c27'
  surface-variant: '#dae3f2'
  surface-canvas: '#F4F6F9'
  surface-subtle: '#E5E9F0'
  surface-white: '#FFFFFF'
  mrt-nel-purple: '#7B1FA2'
  mrt-dtl-blue: '#005BAA'
  mrt-ewl-green: '#009640'
  mrt-nsl-red: '#D42E12'
  mrt-tel-brown: '#9D5B25'
  arrival-imminent: '#137333'
  arrival-moderate: '#D97706'
  arrival-crowded: '#C5221F'
  whatsapp-green: '#25D366'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  bus-number-display:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Public Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
  timing-badge:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system is tailored for large-scale municipal public transit, serving millions of daily commuters, bus operators, tourists, and city operations teams. The brand personality balances civic dependability and speed with high visual clarity under bright outdoor conditions. The emotional response is one of reassurance, instant legibility, and effortless wayfinding.

The design movement combines **Modern Civic Minimalism** with **Wayfinding Precision**:
- High-contrast color coding rooted in standard transit operations.
- Clean, open-counter typography engineered for glancing at glanceable arrival times on the move.
- Functional structural borders and pill tags designed for rapid parsing of dense timetable data, train connections, and bus service identifiers.
- Uncluttered, purpose-driven surfaces that prioritize real-time updates, accessibility indicators (such as barrier-free and wheelchair boarding), and immediate communication pathways.

## Colors

The palette directly honors Singapore transit heritage, combining iconic civic purple with energetic transit orange to drive user attention toward critical live status actions.

### Roles & Semantic Application
- **Primary (`#6B1D6D`)**: Represents the signature brand heritage, master app bars, primary category selection (Bus/Rail active indicators), and primary brand anchors.
- **Secondary (`#E65A15`)**: High-visibility call-to-action color, used for arrival timing search triggers, live departure prompts, journey planning buttons, and urgent alerts.
- **Tertiary (`#1A2B49`)**: Grounding navy slate for header bars, structural navigation backgrounds, and deep typographic hierarchy.
- **Surface Neutrals (`#F4F6F9`, `#E5E9F0`, `#FFFFFF`)**: Form crisp, anti-glare commuter interfaces suited for midday mobile outdoor viewing and indoor digital displays.

### Transit & Service Identification Palette
- **MRT Line Identifiers**: Official line-specific colors (`#7B1FA2` North East Line, `#005BAA` Downtown Line, `#009640` East West Line, `#D42E12` North South Line, `#9D5B25` Thomson-East Coast Line) are reserved strictly for train service tags and interchange indicators.
- **Dynamic Arrival Status**: Green (`#137333`) denotes arriving now/seats available, Amber (`#D97706`) denotes standing room available, and Crimson (`#C5221F`) denotes crowded conditions.
- **Platform Action**: Dedicated `#25D366` is reserved for one-touch WhatsApp transit sharing.

## Typography

The typographic hierarchy is engineered around high glanceability and numerical legibility:
- **Headline Font (`Space Grotesk`)**: Geometric, structural, and tech-forward sans-serif with distinct numeral cutouts. Used for page headers, major bus service badges, interchange headers, and arrival timing numbers.
- **Body & Label Font (`Public Sans`)**: An accessible, institutional, ultra-clear neutral sans-serif created for public civic interfaces. Used across schedule tables, route sequences, bus stop names, and alert announcements.

Numerals in timetable cells must render with tabular figures (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during live arrival second-by-second refreshes.

## Layout & Spacing

The layout is built upon an 8pt rhythmic fluid grid with strong vertical alignment to mirror transit schedules:
- **Mobile (< 768px)**: 4-column fluid layout with `1rem` margins and gutters. Real-time arrival results take up 100% card widths with quick-tap sticky bottom bars.
- **Tablet (768px - 1024px)**: 8-column layout with `1.5rem` margins and gutters. Search panels and live bus arrivals display side-by-side or stacked in dense modular blocks.
- **Desktop (> 1024px)**: 12-column layout with max-width container capped at `1280px` centered, allowing persistent multi-route monitoring, map view panels, and service announcement feeds.

Spacing relies strictly on the `space-*` scale:
- `space-xs` (4px) and `space-sm` (8px) govern micro-alignments inside arrival pill tags, wheelchair icons, and badge counters.
- `space-md` (16px) defines standard card padding, text-field vertical padding, and list item separators.
- `space-lg` (24px) to `space-xl` (32px) handle section grouping and modal dialogues.

## Elevation & Depth

This design system avoids excessive skeuomorphic shadows or complex glass reflections in favor of direct **Tonal Layering** and **Subtle Structural Outlines**:

- **Level 0 (Flat Ground)**: Base backdrop at `#F4F6F9`. Clean, non-distracting canvas.
- **Level 1 (Card Surfaces & Timetable Rows)**: `#FFFFFF` panels framed by a 1px solid hairline border in `#E5E9F0`. Dropshadow is minimal and atmospheric: `0 1px 3px rgba(26, 43, 73, 0.06)`.
- **Level 2 (Active Dropdowns & Interactive Search Blocks)**: Elevated white containers using `0 4px 12px rgba(26, 43, 73, 0.08)`.
- **Level 3 (Sticky Transit Banners & Overlays)**: `#1A2B49` slate backdrops with `0 8px 24px rgba(26, 43, 73, 0.16)` providing definitive visual separation above map surfaces.

## Shapes

The interface adopts a calibrated roundedness level of `2` (medium-rounded):
- **Base Components**: Text inputs, service selection tiles, and timetable containers use `0.5rem` (8px) radius.
- **Cards & Modals**: Container surfaces use `rounded-lg` (1rem / 16px) for an approachable, modern feel.
- **Transit Pills & Wayfinding Badges**: Pill-shaped (`9999px`) rounded ends are reserved exclusively for live arrival countdowns (e.g., `Arr`, `3 min`, `12 min`), bus number badges, and MRT acronym chips.

## Components

### Bus Service & Train Line Badges
- **Bus Service Badges**: Bold, rounded rectangular tags (`border-radius: 8px`, minimum width `54px`, height `38px`) with solid `#6B1D6D` background and white `Space Grotesk` bold typography. Express and Chinatown Direct variants utilize high-contrast inverse borders.
- **MRT Line Badges**: Pill chips (`rounded-full`) displaying 2-letter codes and station numbers (e.g., `NE1`, `DT19`, `EW12`) filled with official MRT line hex codes and sharp white tabular text.

### Arrival Timing Badges
- Compact pill badges displaying status (`Arr`, `4 min`, `12 min`).
- Background color dynamically indicates capacity:
  - Green (`#137333` on `#E6F4EA` light tint): Seats Available.
  - Amber (`#D97706` on `#FEF3C7` light tint): Standing Available.
  - Red (`#C5221F` on `#FCE8E6` light tint): Limited Standing.
- Accompanied by inline accessibility markers (e.g., wheelchair symbol in `#1A2B49` or `#5B6471`).

### Buttons & Quick Actions
- **Primary Action (Estimate / Search)**: `#E65A15` solid fill, white text, uppercase bold tracking, subtle hover shift to `#CF4E0F`. Height `48px` minimum touch target.
- **Category Tabs (Bus / Rail Switchers)**: Deep purple `#6B1D6D` for selected state; soft grey `#E5E9F0` with slate text `#1A2B49` for inactive state.
- **Instant Transit Share Button**: Emerald pill button (`#25D366`) featuring official WhatsApp glyph, letting commuters share ETA and live stop info in one tap.

### Input Fields & Search Bars
- Framed in `#E5E9F0` border with `#FFFFFF` background.
- Focus state activates a 2px outer ring in brand purple `#6B1D6D`.
- Integrated chevron dropdown icons and clear button ("X") for immediate route filtering.

### Timetable Cards & Stop Lists
- Vertical route lines in `#E5E9F0` punctuated by solid node circles indicating stops.
- Active or current stop node expands with an orange center dot (`#E65A15`) and bolded arrival estimates.
```

---

## Prompt 2: GitHub Repository Push

```text
git push
https://<GITHUB_PERSONAL_ACCESS_TOKEN>@https://github.com/SohKinWei/mcp-bus.git
```

---

## Prompt 3: Backend API Integration & LTA DataMall v3 Bus Arrival Service

```text
1) create a /api folder under the project main to store all the apis
2) create a /api/health.js to monitor if the apis are working
3) integrate the LTA bus information api endpoint GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
Header:  AccountKey: 7LSmRIxXTQmd+4o2KB4tFg==

# BusStopCode is the only required parameter.
# Add &ServiceNo=7 to ask about one service only.
# Refreshes every 20 seconds. JSON comes back by default.
I will add the LTA_ACCOUNT_KEY in vercel environment variables later
```

---

## Prompt 4: Prompts Documentation

```text
create a prompt.md containing all my prompts located at project main
```
