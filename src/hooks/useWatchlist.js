import { useSyncExternalStore, useCallback } from "react";

const STORAGE_KEY = "cryptopulse:watchlist";
const listeners = new Set();

const readStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

let cache = readStore();

const writeStore = (ids) => {
  cache = ids;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => cache;

const useWatchlist = () => {
  const ids = useSyncExternalStore(subscribe, getSnapshot);

  const toggle = useCallback(
    (id) => {
      const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
      writeStore(next);
    },
    [ids]
  );

  const isWatched = useCallback((id) => ids.includes(id), [ids]);

  return { ids, toggle, isWatched };
};

export default useWatchlist;
