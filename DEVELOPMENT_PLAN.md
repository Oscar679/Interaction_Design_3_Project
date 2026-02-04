# Development Plan - 1ME333 Project

## Current Status: ~45% Complete (targeting VG)

---

## Completed

- [x] External data fetching (SMHI API + Google Sheets sensor data)
- [x] Object-oriented codebase (AbstractService pattern)
- [x] Multiple views (index, dashboard, docs, info)

---

## Remaining Tasks

### G Grade Requirements

#### 1. User-Facing Error Handling
- Show error message in UI when API calls fail
- Currently only logs to console - user sees nothing
- **Files:** `SMHIChart.js`, `SensorChart.js`

#### 2. Microinteractions
- Add loading spinners while fetching data
- Button hover/click animations
- Smooth transitions between states
- Consider: skeleton loaders, success/error feedback

#### 3. Google Closure Compiler
- Install: `npm install google-closure-compiler --save-dev`
- Add build script to `package.json`
- Compile JS to single minified file

#### 4. UML Diagram (for report)
- Class diagram showing AbstractService, SheetService, SMHIService
- Component diagram showing Web Components

---

### VG Grade Requirements

#### 5. User Settings Storage (localStorage)
Options to implement:
- Theme preference (dark/light mode)
- Preferred temperature unit (C/F)
- Dashboard layout preferences
- Last viewed station/sensor

#### 6. PWA Setup
- Install `vite-plugin-pwa`
- Create app icons (192x192, 512x512)
- Configure manifest.json (name, icons, theme color)
- Configure service worker with runtime caching for API data

---

## Suggested Order

| Priority | Task | Estimated Effort |
|----------|------|------------------|
| 1 | Error handling | Low |
| 2 | Microinteractions | Medium |
| 3 | localStorage settings | Low |
| 4 | PWA setup | Medium |
| 5 | Closure Compiler | Low |
| 6 | UML diagram | Low (report) |

---

## Notes

- DHT11 sensor cannot measure below 0°C - consider upgrading to DHT22
- Chart x-axis date formatting needs fixing (from commit history)
- `info.html` is empty - decide if needed or remove
