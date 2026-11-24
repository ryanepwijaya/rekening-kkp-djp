import { useCallback, useEffect, useState } from "react";

function readStored(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* penyimpanan tidak tersedia — abaikan */
  }
}

/** Tema terang/gelap. Default selalu terang; pilihan pengguna diingat. */
export function useTheme() {
  const [theme, setTheme] = useState(() => (readStored("rkkp-theme") === "dark" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#071426" : "#0b2545");
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      writeStored("rkkp-theme", next);
      return next;
    });
  }, []);

  return [theme, toggle];
}

/** Prompt install PWA (Chrome/Edge/Android) + deteksi iOS. */
export function useInstall() {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(
    () => window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true
  );

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;

  const install = useCallback(async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice.catch(() => null);
    setDeferred(null);
  }, [deferred]);

  return { canInstall: !!deferred && !installed, install, installed, isIOS };
}

/** Pintasan keyboard Ctrl/⌘ + K dan "/" untuk membuka pencarian. */
export function useSearchShortcut(open) {
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
}
