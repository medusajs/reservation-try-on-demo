/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "card-hover-dark":
          "0px 0px 0px 1px rgba(255, 255, 255, 0.1), 0px 1px 2px -1px rgba(255, 255, 255, 0.16), 0px 2px 8px 0px rgba(0, 0, 0, 0.32)",
        "card-hover-light":
          "0px 0px 0px 1px rgba(17, 24, 28, 0.08), 0px 1px 2px -1px rgba(17, 24, 28, 0.08), 0px 2px 8px 0px rgba(17, 24, 28, 0.1)",
        "explainer": 
          "0px 0px 0px 1px rgba(17, 24, 28, 0.08), 0px 16px 32px rgba(17, 24, 28, 0.08), 0px 2px 24px rgba(17, 24, 28, 0.08)",
        "card-rest": 
          "0px 0px 0px 1px rgba(17, 24, 28, 0.08), 0px 1px 2px -1px rgba(17, 24, 28, 0.08), 0px 2px 4px rgba(17, 24, 28, 0.04)"
      },
      backgroundColor: {
        "base-dark": "#1C1C1C",
        "base-light": "#FFFFFF",
        "code": "#272822",
        "border-dark": "#2E2E32",
        "border-light": "#E6E8EB",
        "field-dark": "#232326",
        "field-light": "#F8F9FA",
        "subtle-dark": "#161618",
        "subtle-light": "#F8F9FA",
        "overlay-dark": "rgba(22, 22, 24, 0.7)",
        "overlay-light": "rgba(17, 24, 28, 0.4)",
        "tag-neutral-dark": "#28282C",
        "tag-neutral-light": "#F1F3F5",
        "tag-blue-dark": "#102A4C",
        "tag-blue-light": "#E1F0FF",
        focus: "#6E56CF",
      },
      borderColor: {
        "base-dark": "#2E2E32",
        "base-light": "#E6E8EB",
        "neutral-button-dark": "rgba(255, 255, 255, 0.12)",
        "neutral-button-light": "rgba(17, 24, 28, 0.1)",
        "color-button-dark": "#FFFFFF",
        "color-button-light": "#11181C",
        "tag-neutral-dark": "#34343A",
        "tag-neutral-light": "#DFE3E6",
        "tag-purple-dark": "#9056f5",
        "tag-purple-light": "#5746AF",
        "tag-blue-dark": "#0D3868",
        "tag-blue-light": "#B7D9F8",
        focus: "#6E56CF",
      },
      textColor: {
        "base-dark": "#FFFFFF",
        "base-light": "#11181C",
        "muted-dark": "#706F78",
        "muted-light": "#889096",
        "subtle-dark": "#7E7D86",
        "subtle-light": "#4B5563",
        "error-dark": "#E5484D",
        "error-light": "#E5484D",
        "tag-neutral-dark": "#A09FA6",
        "tag-neutral-light": "#687076",
        "tag-blue-dark": "#52A9FF",
        "tag-blue-light": "#006ADC",
        "tag-purple-dark": "#9056f5",
        "tag-purple-light": "#5746AF",
        "icon-base-dark": "#EDEDEF",
        "icon-base-light": "#11181C",
        "icon-subtle-dark": "#7E7D86",
        "icon-subtle-light": "#687076",
        "icon-muted-dark": "#706F78",
        "icon-muted-light": "#889096",
      },
      outlineColor: {
        focus: "#6E56CF",
      },
      fontSize: {
        "labels-large": ["16px", "20px"],
        "labels-regular": ["14px", "20px"],
        "labels-small": ["13px", "20px"],
        "labels-xsmall": ["12px", "20px"],
        "code": ["12px", "18px"],
        "code-xsmall": ["10px", "14px"],
        "body-regular": ["16px", "28px"],
        "headers-h2": ["42px", "44px"],
        "headers-h2.5": ["32px", "44px"],
        "headers-h3": ["24px", "32px"],
        "headers-h4": ["18px", "28px"],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        enterFade: {
          "0%": {  opacity: 0 },
          "100%": {  opacity: 1 },
        },
        leaveFade: {
          "0%": {  opacity: 1 },
          "100%": {  opacity: 0 },
        },
        slideEnter: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0%)", opacity: 1 },
        },
        slideLeave: {
          "0%": { transform: "translateX(100%)", opacity: 1 },
          "100%": { transform: "translateX(0%)", opacity: 0 },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        enter: "enter 200ms ease-out",
        leave: "leave 150ms ease-in forwards",
        enterFade: "enterFade 200ms ease-out",
        leaveFade: "leaveFade 150ms ease-in forwards",
        enterSlide: "slideEnter 200ms ease-in",
        leaveSlide: "slideLeave 150ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
