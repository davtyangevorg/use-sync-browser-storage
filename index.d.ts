import { Dispatch, SetStateAction } from "react";

interface SyncOptions<T> {
  storageKey: string;
  initialState: T;
}

/**
 * Hook to synchronize state with localStorage
 * @param options Configuration options
 * @returns Tuple of [state, setState]
 */
export function useSyncWithLocalStorage<T>(
  options: SyncOptions<T>
): [T, Dispatch<SetStateAction<T>>];

/**
 * Hook to synchronize state with sessionStorage
 * @param options Configuration options
 * @returns Tuple of [state, setState]
 */
export function useSyncWithSessionStorage<T>(
  options: SyncOptions<T>
): [T, Dispatch<SetStateAction<T>>];

declare const _default: {
  useSyncWithLocalStorage: typeof useSyncWithLocalStorage;
  useSyncWithSessionStorage: typeof useSyncWithSessionStorage;
};
export default _default;
