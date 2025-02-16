import { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.startsWith("favorites/")
    ) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(store.getState().favorites)
      );
    }

    return result;
  };
