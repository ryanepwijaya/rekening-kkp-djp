import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon-32.png", "apple-touch-icon.png", "robots.txt"],
      manifest: {
        id: "/",
        name: "Rekening & KKP — Direktorat Jenderal Pajak",
        short_name: "Rekening KKP",
        description: "Referensi internal Rekening & Kartu Kredit Pemerintah (KKP) untuk satker DJP.",
        lang: "id",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#f6f3ec",
        theme_color: "#0b2545",
        categories: ["finance", "productivity", "reference"],
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        shortcuts: [
          { name: "Format Dokumen Giro", url: "/#/giro/format", icons: [{ src: "/pwa-192.png", sizes: "192x192" }] },
          { name: "Format Dokumen Virtual", url: "/#/virtual/format", icons: [{ src: "/pwa-192.png", sizes: "192x192" }] },
          { name: "Format Dokumen KKP", url: "/#/kkp/format", icons: [{ src: "/pwa-192.png", sizes: "192x192" }] },
          { name: "Serah Terima saat Mutasi", url: "/#/mutasi/rekening", icons: [{ src: "/pwa-192.png", sizes: "192x192" }] },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2,txt}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
