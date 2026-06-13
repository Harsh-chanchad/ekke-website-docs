import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Ekke Docs",
  tagline: "White-label e-commerce frontend on Fynd Platform",
  favicon: "img/favicon.png",

  url: "https://akke-docs.vercel.app",
  baseUrl: "/",

  organizationName: "harshchanchad",
  projectName: "akke-docs",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "../docs",
          routeBasePath: "/docs",
          sidebarPath: "./sidebars.ts",
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Ekke",
      logo: {
        alt: "Ekke Logo",
        src: "img/ekke-logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://partners.fynd.com",
          label: "Fynd Partner Portal",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "Overview", to: "/docs/overview/overview" },
            { label: "Getting Started", to: "/docs/getting-started/getting-started" },
            { label: "Architecture", to: "/docs/architecture/architecture" },
          ],
        },
        {
          title: "Reference",
          items: [
            { label: "Sections", to: "/docs/reference/sections" },
            { label: "Pages", to: "/docs/reference/pages" },
            { label: "Components", to: "/docs/reference/components" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "Contributing", to: "/docs/contributing/contributing" },
            { label: "Operations", to: "/docs/operations/operations" },
            { label: "ADRs", to: "/docs/decisions/adr-001-fdk-react-theme" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ekke. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json"],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
