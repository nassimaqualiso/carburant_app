import { getAssetPath } from "@/core/helpers/assets";

export interface SettingsMenu {
  heading?: string;

  route?: string;
  pages?: Array<SettingsMenu>;

  fontIcon?: string;
}

const SettingsMenuConfig: Array<SettingsMenu> = [
  {
    pages: [
      {
        heading: "general",
        route: "/settings/general",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "roles",
        route: "/settings/roles",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "articles",
        route: "/settings/articles",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "Companies",
        route: "/settings/companies",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "centers",
        route: "/settings/centers",
        fontIcon: "bi bi-gear",
      },

      {
        heading: "Brands",
        route: "/settings/vehicle_brands",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "Models",
        route: "/settings/vehicle_models",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "Periods",
        route: "/settings/vehicle_periods",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "Energies",
        route: "/settings/vehicle_energies",
        fontIcon: "bi bi-gear",
      },
      {
        heading: "Lengths",
        route: "/settings/vehicle_lengths",
        fontIcon: "bi bi-gear",
      },
    ],
  },
];

export default SettingsMenuConfig;
