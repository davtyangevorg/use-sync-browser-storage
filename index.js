import { useSyncExternalStore } from "react";

// Utility function to get an item from localStorage
const getItemFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item !== "undefined" ? JSON.parse(item) : undefined;
};

// Utility function to get an item from sessionStorage
const getItemFromSessionStorage = (key) => {
  const item = sessionStorage.getItem(key);
  return item !== "undefined" ? JSON.parse(item) : undefined;
};

// Utility function to set an item to localStorage
const setItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
// Utility function to set an item to sessionStorage
const setItemToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// Utility function to check if an item exists in localStorage
const isItemInLocalStorage = (key) =>
  key in localStorage && localStorage.getItem(key) !== null;

// Utility function to check if an item exists in sessionStorage

const isItemInSessionStorage = (key) =>
  key in sessionStorage && sessionStorage.getItem(key) !== null;

// Function to create a state and sync it with localStorage
const createStateInStorage = ({
  storageKey,
  initialState,
  storageFunctions,
}) => {
  const listeners = new Set();
  const storedState = storageFunctions.getItem(storageKey);
  let state = storageFunctions.isItemInStorage(storageKey)
    ? storedState
    : initialState;

  if (!storageFunctions.isItemInStorage(storageKey)) {
    storageFunctions.setItem(storageKey, initialState);
  }

  const updateState = (newState) => {
    state = newState;
    storageFunctions.setItem(storageKey, newState);
    listeners.forEach((listener) => listener());
  };

  const getSnapShot = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getSnapShot, subscribe, updateState };
};

// Global store to keep track of state instances
const store = {};

// Hook to sync state with localStorage
const useSyncWithBrowserStorage = ({
  storageKey,
  initialState,
  storageFunctions,
}) => {
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
};

const useSyncWithLocalStorage = ({ storageKey, initialState }) => {
  return useSyncWithBrowserStorage({
    storageKey,
    initialState,
    storageFunctions: {
      getItem: getItemFromLocalStorage,
      setItem: setItemToLocalStorage,
      isItemInStorage: isItemInLocalStorage,
    },
  });
};

const useSyncWithSessionStorage = ({ storageKey, initialState }) => {
  return useSyncWithBrowserStorage({
    storageKey,
    initialState,
    storageFunctions: {
      getItem: getItemFromSessionStorage,
      setItem: setItemToSessionStorage,
      isItemInStorage: isItemInSessionStorage,
    },
  });
};

export { useSyncWithLocalStorage, useSyncWithSessionStorage };
