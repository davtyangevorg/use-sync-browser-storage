import { useSyncExternalStore } from "react";

// Utility function to get an item from localStorage
function getItemFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  return item !== "undefined" ? JSON.parse(item) : undefined;
}

// Utility function to get an item from sessionStorage
function getItemFromSessionStorage(key) {
  const item = sessionStorage.getItem(key);
  return item !== "undefined" ? JSON.parse(item) : undefined;
}

// Utility function to set an item to localStorage
function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Utility function to set an item to sessionStorage
function setItemToSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

// Utility function to check if an item exists in localStorage
function isItemInLocalStorage(key) {
  return key in localStorage && localStorage.getItem(key) !== null;
}

// Utility function to check if an item exists in sessionStorage

function isItemInSessionStorage(key) {
  return key in sessionStorage && sessionStorage.getItem(key) !== null;
}

// Function to create a state and sync it with localStorage
function createStateInStorage({ storageKey, initialState, storageFunctions }) {
  const listeners = new Set();
  const storedState = storageFunctions.getItem(storageKey);
  let state = storageFunctions.isItemInStorage(storageKey)
    ? storedState
    : initialState;

  if (!storageFunctions.isItemInStorage(storageKey)) {
    storageFunctions.setItem(storageKey, initialState);
  }

  function updateState(newState) {
    state = newState;
    storageFunctions.setItem(storageKey, newState);
    listeners.forEach((listener) => listener());
  }

  function getSnapShot() {
    return state;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getSnapShot, subscribe, updateState };
}

// Global store to keep track of state instances
const store = {};

// Hook to sync state with localStorage
function useSyncWithBrowserStorage({
  storageKey,
  initialState,
  storageFunctions,
}) {
  if (!store[storageKey]) {
    store[storageKey] = createStateInStorage({
      storageKey,
      initialState,
      storageFunctions,
    });
  }
  const { getSnapShot, subscribe, updateState } = store[storageKey];

  const currentState = useSyncExternalStore(subscribe, getSnapShot);

  return [currentState, updateState];
}

function useSyncWithLocalStorage({ storageKey, initialState }) {
  return useSyncWithBrowserStorage({
    storageKey,
    initialState,
    storageFunctions: {
      getItem: getItemFromLocalStorage,
      setItem: setItemToLocalStorage,
      isItemInStorage: isItemInLocalStorage,
    },
  });
}

function useSyncWithSessionStorage({ storageKey, initialState }) {
  return useSyncWithBrowserStorage({
    storageKey,
    initialState,
    storageFunctions: {
      getItem: getItemFromSessionStorage,
      setItem: setItemToSessionStorage,
      isItemInStorage: isItemInSessionStorage,
    },
  });
}

export { useSyncWithLocalStorage, useSyncWithSessionStorage };

// For CommonJS compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    useSyncWithLocalStorage,
    useSyncWithSessionStorage,
  };
}
