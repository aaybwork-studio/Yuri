---
phase: 1
slug: design-system-setup
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-06-10
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Browser Console & Manual Verification |
| **Config file** | none |
| **Quick run command** | `theme-check` (Shopify theme linting) |
| **Full suite command** | `shopify theme check` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run theme-check
- **After every plan wave:** Verify in local development preview
- **Before `/gsd-verify-work`:** Visual and functional audits green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | FR 6.1 | — | N/A | manual | browser inspection | N/A | ⬜ pending |
| 01-01-02 | 01 | 1 | FR 6.1 | — | N/A | manual | check preload tags | N/A | ⬜ pending |
| 01-01-03 | 01 | 1 | FR 6.1 | — | N/A | manual | run theme compilation | N/A | ⬜ pending |
| 01-01-04 | 01 | 1 | FR 6.1 | — | N/A | manual | inspect active hovers | N/A | ⬜ pending |

---

## Wave 0 Requirements

*Existing theme linting infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Google Font Preload Verification | FR 6.1 | External asset waterfall loading | Inspect Network panel in browser DevTools. The preload font links should fire immediately and load woff2 files with status 200 from fonts.gstatic.com before yuri-styles.css is parsed. |
| CSS Variable Compilation | FR 6.1 | CSS variables runtime rendering | Open browser console in storefront preview and run: `window.getComputedStyle(document.body).backgroundColor === 'rgb(238, 236, 211)'` to verify body background color and text color. |
| Dawn Schemes Alignment | FR 6.1 | Editor schema synchronization | Open customizer, assign Scheme 1, 2, 3, or 4 to standard sections, and verify the background and text color render in Ivory, Dark Brown, Rose, or Gold respectively. |
| Button curtain-up hover animation | FR 6.1 | Micro-interaction visual behavior | Hover primary button, verify background color curtain slides up from the bottom and text color flips smoothly. |
| Navigation Double Text Slide hover | FR 6.1 | Micro-interaction visual behavior | Hover header links, verify original link text slides up and is replaced by a duplicate text sliding up from below. |
| Reduced Motion override | FR 6.1 | Accessibility guidelines | Set OS preferences to "Reduce Motion" and verify the transitions are instant without animation delays. |

---

## Validation Sign-Off

- [x] All tasks have manual/automated verify steps mapped
- [x] Sampling continuity: theme check run frequently
- [x] Wave 0 covers all lints
- [x] No watch-mode flags in test commands
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
