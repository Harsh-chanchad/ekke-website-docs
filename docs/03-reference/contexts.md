---
sidebar_label: Contexts & Providers
sidebar_position: 5
---

# Contexts & Providers

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

React contexts provide cross-component state that doesn't fit in the FPI global store (which is primarily for server-fetched data).

**Location:** `theme/contexts/` and `theme/providers/`

---

## ThemeProvider

**Location:** `theme/providers/`

The root provider that wraps the entire application. It supplies:
- Global UI state (cart drawer open/close, modals)
- Locale/language context
- Any cross-cutting theme configuration

```jsx
// Exported from theme/index.jsx and consumed by the FDK platform
export { ThemeProvider };
```

---

## Available Contexts

### Logo Visibility Context
Controls whether the header logo is visible. Used on pages where the logo should be hidden (e.g., custom landing pages with their own branding).

```js
import { useLogoVisibility } from "../contexts/logo-visibility";

function Header() {
  const { isLogoVisible } = useLogoVisibility();
  return isLogoVisible ? <img src={logo} /> : null;
}
```

### Profile Tabs Context
Manages the active tab state on the user profile/account dashboard (Profile, Orders, Addresses, Wishlist, etc.). Prevents prop drilling across multiple nested components.

```js
import { useProfileTabs } from "../contexts/profile-tabs";

function ProfileNav() {
  const { activeTab, setActiveTab } = useProfileTabs();
  // ...
}
```

### Radio Player Context
State for the radio player feature (a specialized CMS section). Manages play/pause, current track, and volume state that needs to persist across navigation within the same session.

```js
import { useRadioPlayer } from "../contexts/radio-player";

function RadioControls() {
  const { isPlaying, currentTrack, toggle } = useRadioPlayer();
  // ...
}
```

---

## Rules for Contexts

- **Contexts are for UI state only** — not business logic or data fetching
- Use FPI global store (`useGlobalStore`) for server-fetched data instead
- Each context has its own file: `theme/contexts/context-name.jsx`
- Export a custom hook (`useContextName`) alongside the Provider — never export the raw Context object

```jsx
// theme/contexts/logo-visibility.jsx

const LogoVisibilityContext = createContext({ isLogoVisible: true });

export function LogoVisibilityProvider({ children }) {
  const [isLogoVisible, setLogoVisible] = useState(true);
  return (
    <LogoVisibilityContext.Provider value={{ isLogoVisible, setLogoVisible }}>
      {children}
    </LogoVisibilityContext.Provider>
  );
}

// ✅ Export the hook, not the context
export function useLogoVisibility() {
  return useContext(LogoVisibilityContext);
}
```
