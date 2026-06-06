import { openDB } from "idb";

export function getDB() {
  return openDB("ecotransgo", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("auth")) db.createObjectStore("auth");
      if (!db.objectStoreNames.contains("profile"))
        db.createObjectStore("profile");
    },
  });
}
