import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: "category",
      label: "Overview",
      collapsed: false,
      items: ["overview/overview"],
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: ["getting-started/getting-started"],
    },
    {
      type: "category",
      label: "Architecture",
      items: ["architecture/architecture"],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/sections",
        "reference/pages",
        "reference/components",
        "reference/hooks",
        "reference/contexts",
        "reference/queries",
        "reference/utilities",
      ],
    },
    {
      type: "category",
      label: "How-To Runbooks",
      items: ["how-to/runbooks"],
    },
    {
      type: "category",
      label: "Operations",
      items: ["operations/operations"],
    },
    {
      type: "category",
      label: "Decisions (ADRs)",
      items: [
        "decisions/adr-001-fdk-react-theme",
        "decisions/adr-002-hybrid-styling",
      ],
    },
    {
      type: "category",
      label: "Quality",
      items: ["quality/quality"],
    },
    {
      type: "category",
      label: "Contributing",
      items: ["contributing/contributing"],
    },
    {
      type: "category",
      label: "Theme Guide",
      items: ["theme/theme-guide"],
    },
    {
      type: "category",
      label: "Business Requirements",
      items: ["business-requirement/business-requirements"],
    },
  ],
};

export default sidebars;
