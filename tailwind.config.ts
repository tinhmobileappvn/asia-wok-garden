import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#fdfcff",
        "on-primary-fixed": "#002118",
        "on-surface-variant": "#3d4944",
        "tertiary-container": "#71757b",
        "on-surface": "#1a1c1c",
        "surface-bright": "#f9f9f8",
        "surface-dim": "#dadad9",
        "surface": "#f9f9f8",
        "outline-variant": "#bccac3",
        "on-tertiary-fixed-variant": "#43474c",
        "on-secondary-fixed": "#40000f",
        "secondary-container": "#da2e54",
        "on-tertiary": "#ffffff",
        "primary-container": "#008468",
        "error": "#ba1a1a",
        "on-error-container": "#93000a",
        "surface-container": "#eeeeed",
        "on-secondary-fixed-variant": "#91002e",
        "surface-container-highest": "#e2e2e2",
        "secondary-fixed": "#ffdadb",
        "tertiary-fixed-dim": "#c3c7cd",
        "outline": "#6d7a74",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#e0e2e9",
        "primary-fixed-dim": "#6cdab7",
        "surface-container-high": "#e8e8e7",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#fffbff",
        "surface-variant": "#e2e2e2",
        "primary-fixed": "#89f7d3",
        "background": "#f9f9f8",
        "primary": "#006952",
        "on-primary-container": "#f5fff9",
        "on-tertiary-fixed": "#181c21",
        "tertiary": "#585c62",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "on-primary-fixed-variant": "#00513f",
        "secondary": "#b70a3d",
        "error-container": "#ffdad6",
        "inverse-on-surface": "#f1f1f0",
        "surface-container-low": "#f3f4f3",
        "on-background": "#1a1c1c",
        "secondary-fixed-dim": "#ffb2b9",
        "inverse-primary": "#6cdab7",
        "surface-tint": "#006b54",
        "inverse-surface": "#2f3130"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "space-2xs": "0.25rem",
        "container-max": "1280px",
        "space-sm": "0.75rem",
        "space-xs": "0.5rem",
        "space-xl": "2rem",
        "space-3xl": "4.5rem",
        "gutter-desktop": "2rem",
        "space-2xl": "3rem",
        "space-lg": "1.5rem",
        "space-md": "1rem",
        "gutter-mobile": "1rem",
        "space-4xl": "6rem"
      },
      fontFamily: {
        "label-lg": ["Plus Jakarta Sans"],
        "body-sm": ["Plus Jakarta Sans"],
        "label-sm": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "headline-xl-mobile": ["Space Grotesk"],
        "body-lg": ["Plus Jakarta Sans"],
        "headline-sm": ["Space Grotesk"],
        "headline-md": ["Space Grotesk"],
        "display-lg-mobile": ["Space Grotesk"],
        "display-lg": ["Space Grotesk"],
        "headline-xl": ["Space Grotesk"]
      },
      fontSize: {
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.04em", fontWeight: "600" }],
        "body-sm": ["13px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "400" }],
        "label-sm": ["11px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "600" }],
        "body-md": ["15px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" }],
        "headline-xl-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-sm": ["18px", { lineHeight: "26px", letterSpacing: "0em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-lg-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "600" }]
      }
    }
  }
};

export default config;
