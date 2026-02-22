self.addEventListener("install", (event) => {
    console.log("Service worker installed.");
});

self.addEventListener("fetch", (event) => {
    // Pass-through for now. Can be configured for aggressive caching later.
});
