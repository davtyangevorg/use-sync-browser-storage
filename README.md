# use-sync-browser-storage

A lightweight React hook library for seamlessly synchronizing state with browser storage (localStorage and sessionStorage).

## Installation

```bash
npm install use-sync-browser-storage
```

## Features

- 🔄 Automatic synchronization with browser storage
- 💾 Support for both localStorage and sessionStorage
- 🪝 Simple hook-based API
- 📦 Zero dependencies

## Available Hooks

- `useSyncWithLocalStorage`: Syncs state with localStorage (persists after browser restart)
- `useSyncWithSessionStorage`: Syncs state with sessionStorage (cleared after browser restart)

## Usage

### `useSyncWithLocalStorage`

```jsx
import { useSyncWithLocalStorage } from "use-sync-browser-storage";

function Counter() {
  const [count, setCount] = useSyncWithLocalStorage({
    storageKey: "counter",
    initialState: 0,
  });

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
```

### `useSyncWithSessionStorage`

```jsx
import { useSyncWithSessionStorage } from "use-sync-browser-storage";

function UserPreferences() {
  const [theme, setTheme] = useSyncWithSessionStorage({
    storageKey: "theme",
    initialState: "light",
  });

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}
```

