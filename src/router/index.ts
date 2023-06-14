/* eslint-disable prettier/prettier */
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import ApiService from "@/core/services/ApiService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/LayoutBuilder.vue"),
        meta: {
          pageTitle: "Layout Builder",
          breadcrumbs: ["Layout"],
        },
      },
      {
        path: "/account/employees",
        name: "employees",
        component: () => import("@/views/account/employees/EmployeePage.vue"),
        meta: {
          pageTitle: "Employees",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",

            name: "employees.listing",
            component: () =>
              import("@/views/account/employees/EmployeeListing.vue"),
          },
          {
            path: "create",

            name: "employees.create",
            component: () =>
              import("@/views/account/employees/EmployeeCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "employees.update",
            component: () =>
              import("@/views/account/employees/EmployeeUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/account/customers",
        name: "customers",
        component: () => import("@/views/account/customers/CustomerPage.vue"),
        meta: {
          pageTitle: "Customers",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",

            name: "customers.listing",
            component: () =>
              import("@/views/account/customers/CustomerListing.vue"),
          },
          {
            path: "create",

            name: "customers.create",
            component: () =>
              import("@/views/account/customers/CustomerCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "customers.update",
            component: () =>
              import("@/views/account/customers/CustomerUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/garage/datacar",
        name: "datacar",
        component: () => import("@/views/garage/datacar/DatacarPage.vue"),
        meta: {
          pageTitle: "Datacar",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",
            name: "datacar.listing",
            component: () =>
              import("@/views/garage/datacar/DatacarListing.vue"),
          },
          {
            path: "create",
            name: "datacar.create",
            component: () => import("@/views/garage/datacar/DatacarCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "datacar.update",
            component: () => import("@/views/garage/datacar/DatacarUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/articles/forfaits",
        name: "forfaits",
        component: () => import("@/views/articles/forfait/ForfaitPage.vue"),
        meta: {
          pageTitle: "Forfaits",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",
            name: "forfaits.listing",
            component: () =>
              import("@/views/articles/forfait/ForfaitListing.vue"),
          },
          {
            path: "create",
            name: "forfaits.create",
            component: () =>
              import("@/views/articles/forfait/ForfaitCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "forfaits.update",
            component: () =>
              import("@/views/articles/forfait/ForfaitUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/articles/sale_prices",
        name: "sale_prices",
        component: () =>
          import("@/views/articles/sale_prices/SalePricesPage.vue"),
        meta: {
          pageTitle: "Sale prices",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",
            name: "sale_prices.listing",
            component: () =>
              import("@/views/articles/sale_prices/SalePricesListing.vue"),
          },
          {
            path: "create",
            name: "sale_prices.create",
            component: () =>
              import("@/views/articles/sale_prices/SalePricesCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "sale_prices.update",
            component: () =>
              import("@/views/articles/sale_prices/SalePricesUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/articles/discounts",
        name: "discounts",
        component: () => import("@/views/articles/discounts/DiscountsPage.vue"),
        meta: {
          pageTitle: "Discounts",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",
            name: "discounts.listing",
            component: () =>
              import("@/views/articles/discounts/DiscountsListing.vue"),
          },
          {
            path: "create",
            name: "discounts.create",
            component: () =>
              import("@/views/articles/discounts/DiscountsCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "discounts.update",
            component: () =>
              import("@/views/articles/discounts/DiscountsUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/articles/products",
        name: "products",
        component: () => import("@/views/articles/products/ProductPage.vue"),
        meta: {
          pageTitle: "Products",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",
            name: "products.listing",
            component: () =>
              import("@/views/articles/products/ProductListing.vue"),
            meta: {
              breadcrumbs: ["Listing"],
            },
          },
          {
            path: "create",
            name: "products.create",
            component: () =>
              import("@/views/articles/products/ProductCreate.vue"),
            meta: {
              breadcrumbs: ["create"],
            },
          },

          {
            path: ":id/edit",
            name: "products.update",
            component: () =>
              import("@/views/articles/products/ProductUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/articles/packs",
        name: "packs",
        component: () => import("@/views/articles/packs/PackPage.vue"),
        meta: {
          pageTitle: "Packs",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",
            name: "packs.listing",
            component: () => import("@/views/articles/packs/PackListing.vue"),
          },
          {
            path: "create",
            name: "packs.create",
            component: () => import("@/views/articles/packs/PackCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "packs.update",
            component: () => import("@/views/articles/packs/PackUpdate.vue"),
            props: true,
          },
        ],
      },

      {
        path: "/garage/vehicles",
        name: "vehicles",
        component: () => import("@/views/garage/vehicle/VehiclePage.vue"),
        meta: {
          pageTitle: "Vehicles",
          breadcrumbs: ["Listing"],
        },
        //========================//

        children: [
          {
            path: "",
            name: "vehicle.listing",
            component: () =>
              import("@/views/garage/vehicle/VehicleListing.vue"),
          },
          {
            path: "create",
            name: "vehicle.create",
            component: () => import("@/views/garage/vehicle/VehicleCreate.vue"),
          },
          {
            path: ":id/edit",
            name: "vehicle.update",
            component: () => import("@/views/garage/vehicle/VehicleUpdate.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/administration/settings/Settings.vue"),
        meta: {
          pageTitle: "Settings",
          breadcrumbs: ["settings"],
        },
        children: [
          {
            path: "",
            name: "general-settings",
            component: () =>
              import(
                "@/views/administration/settings/general-settings/GeneralSettings.vue"
              ),
            meta: {
              pageTitle: "Genral Settings",
            },
          },
          {
            path: "general",
            name: "general-settings",
            component: () =>
              import(
                "@/views/administration/settings/general-settings/GeneralSettings.vue"
              ),
            meta: {
              pageTitle: "Genral Settings",
            },
          },
          {
            path: "roles",
            name: "roles-settings",
            component: () =>
              import("@/views/administration/settings/roles/RolesPage.vue"),
            meta: {
              pageTitle: "Roles",
            },
            children: [
              {
                path: "",

                name: "roles-listing",
                component: () =>
                  import(
                    "@/views/administration/settings/roles/RolesListing.vue"
                  ),
              },
              {
                path: ":id/edit",
                name: "updateRole",
                component: () =>
                  import(
                    "@/views/administration/settings/roles/RolesUpdate.vue"
                  ),
                props: true,
                meta: {
                  breadcrumbs: ["Update Roles"],
                },
              },
            ],
          },
          {
            path: "articles",
            name: "articles.settings",
            component: () =>
              import(
                "@/views/administration/settings/articles/ArticlePage.vue"
              ),
            meta: {
              pageTitle: "Article settings",
            },
            children: [
              {
                path: "",

                name: "articles.settings",
                component: () =>
                  import(
                    "@/views/administration/settings/articles/natures/NatureListing.vue"
                  ),
              },
              {
                path: "natures",

                name: "natures.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/articles/natures/NatureListing.vue"
                  ),
              },
              {
                path: "create",
                name: "natures.create",
                component: () =>
                  import(
                    "@/views/administration/settings/articles/natures/NatureCreate.vue"
                  ),
                props: true,
                meta: {
                  breadcrumbs: ["Create Nature"],
                },
              },
              {
                path: "natures/:id/edit",
                name: "natures.update",
                component: () =>
                  import(
                    "@/views/administration/settings/articles/natures/NatureUpdate.vue"
                  ),
                props: true,
                meta: {
                  breadcrumbs: ["Update Nature"],
                },
              },
              {
                path: "product-categories",
                name: "product-categories.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/articles/product-categories/ProductCatgoryListing.vue"
                  ),
                props: true,
              },
              {
                path: "product-categories/:id/edit",
                name: "product-categories.update",
                component: () =>
                  import(
                    "@/views/administration/settings/articles/product-categories/ProductCategoryUpdate.vue"
                  ),
                props: true,
                meta: {
                  breadcrumbs: ["Update Category"],
                },
              },
            ],
          },

          {
            path: "companies",
            name: "companies",
            component: () =>
              import(
                "@/views/administration/settings/companies/CompanyPage.vue"
              ),
            meta: {
              pageTitle: "Companies",
            },
            children: [
              {
                path: "",
                name: "companies.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/companies/CompanyListing.vue"
                  ),
              },
              {
                path: "create",
                name: "companies.create",
                component: () =>
                  import(
                    "@/views/administration/settings/companies/CompanyCreate.vue"
                  ),
              },
              {
                path: ":id/edit",
                name: "companies.update",
                component: () =>
                  import(
                    "@/views/administration/settings/companies/CompanyUpdate.vue"
                  ),
                props: true,
              },
            ],
          },
          {
            path: "branches",
            name: "branches",
            component: () =>
              import("@/views/administration/settings/branches/BranchPage.vue"),
            meta: {
              pageTitle: "Branches",
            },
            children: [
              {
                path: "",
                name: "branches-listing",
                component: () =>
                  import(
                    "@/views/administration/settings/branches/BranchListing.vue"
                  ),
              },
              {
                path: "create",
                name: "branch.create",
                component: () =>
                  import(
                    "@/views/administration/settings/branches/BranchCreate.vue"
                  ),
              },
              {
                path: ":id/edit",
                name: "branch.edit",
                component: () =>
                  import(
                    "@/views/administration/settings/branches/BranchUpdate.vue"
                  ),
              },
            ],
          },
          {
            path: "centers",
            name: "centers",
            component: () =>
              import("@/views/administration/settings/centers/CenterPage.vue"),
            meta: {
              pageTitle: "Centers",
            },
            children: [
              {
                path: "",
                name: "centers.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/centers/CenterListing.vue"
                  ),
              },
              {
                path: "create",
                name: "centers.create",
                component: () =>
                  import(
                    "@/views/administration/settings/centers/CenterCreate.vue"
                  ),
                meta: {
                  breadcrumbs: ["Create center"],
                },
              },
              {
                path: ":id/edit",
                name: "centers.update",
                component: () =>
                  import(
                    "@/views/administration/settings/centers/CenterUpdate.vue"
                  ),
                props: true,
                meta: {
                  breadcrumbs: ["Update center"],
                },
              },
            ],
          },
          {
            path: "vehicle_brands",
            name: "vehicle_brands",
            component: () =>
              import("@/views/administration/settings/brands/BrandPage.vue"),
            meta: {
              pageTitle: "Branches",
            },
            children: [
              {
                path: "",
                name: "vehicle_brands.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/brands/BrandListing.vue"
                  ),
              },
            ],
          },
          {
            path: "vehicle_models",
            name: "vehicle_models",
            component: () =>
              import("@/views/administration/settings/models/ModelPage.vue"),
            meta: {
              pageTitle: "Models",
            },
            children: [
              {
                path: "",
                name: "vehicle_models.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/models/ModelListing.vue"
                  ),
              },
            ],
          },
          {
            path: "vehicle_energies",
            name: "vehicle_energies",
            component: () =>
              import("@/views/administration/settings/energies/EnergyPage.vue"),
            meta: {
              pageTitle: "Energies",
            },
            children: [
              {
                path: "",
                name: "vehicle_energies.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/energies/EnergyListing.vue"
                  ),
              },
            ],
          },
          {
            path: "vehicle_periods",
            name: "vehicle_periods",
            component: () =>
              import("@/views/administration/settings/periods/PeriodPage.vue"),
            meta: {
              pageTitle: "Periods",
            },
            children: [
              {
                path: "",
                name: "vehicle_periods.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/periods/PeriodListing.vue"
                  ),
              },
            ],
          },
          {
            path: "vehicle_lengths",
            name: "vehicle_lengths",
            component: () =>
              import("@/views/administration/settings/lengths/LengthPage.vue"),
            meta: {
              pageTitle: "Lengths",
            },
            children: [
              {
                path: "",
                name: "lengths.listing",
                component: () =>
                  import(
                    "@/views/administration/settings/lengths/LengthListing.vue"
                  ),
              },
            ],
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
            meta: {
              pageTitle: "Documents",
            },
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
            meta: {
              pageTitle: "Connections",
            },
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
            meta: {
              pageTitle: "Activity",
            },
          },
        ],
      },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/components/page-layouts/Profile.vue"),
        meta: {
          breadcrumbs: ["Pages", "Profile"],
        },
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () =>
              import("@/views/crafted/pages/profile/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () =>
              import("@/views/crafted/pages/profile/Projects.vue"),
            meta: {
              pageTitle: "Projects",
            },
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () =>
              import("@/views/crafted/pages/profile/Campaigns.vue"),
            meta: {
              pageTitle: "Campaigns",
            },
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
            meta: {
              pageTitle: "Documents",
            },
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
            meta: {
              pageTitle: "Connections",
            },
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
            meta: {
              pageTitle: "Activity",
            },
          },
        ],
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
        meta: {
          pageTitle: "Horizontal",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/pages/wizards/vertical",
        name: "vertical-wizard",
        component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
        meta: {
          pageTitle: "Vertical",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          breadcrumbs: ["Crafted", "Account"],
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
            meta: {
              pageTitle: "Settings",
            },
          },
        ],
      },
      {
        path: "/apps/customers/getting-started",
        name: "apps-customers-getting-started",
        component: () => import("@/views/apps/customers/GettingStarted.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/customers/customer-details",
        name: "apps-customers-details",
        component: () => import("@/views/apps/customers/CustomerDetails.vue"),
        meta: {
          pageTitle: "Customers Details",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/subscriptions/getting-started",
        name: "apps-subscriptions-getting-started",
        component: () =>
          import("@/views/apps/subscriptions/GettingStarted.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/subscription-list",
        name: "apps-subscriptions-subscription-list",
        component: () =>
          import("@/views/apps/subscriptions/SubscriptionList.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/add-subscription",
        name: "apps-subscriptions-add-subscription",
        component: () =>
          import("@/views/apps/subscriptions/AddSubscription.vue"),
        meta: {
          pageTitle: "Add Subscription",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/view-subscription",
        name: "apps-subscriptions-view-subscription",
        component: () =>
          import("@/views/apps/subscriptions/ViewSubscription.vue"),
        meta: {
          pageTitle: "View Subscription",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/calendar",
        name: "apps-calendar",
        component: () => import("@/views/apps/Calendar.vue"),
        meta: {
          pageTitle: "Calendar",
          breadcrumbs: ["Apps"],
        },
      },
      {
        path: "/apps/chat/private-chat",
        name: "apps-private-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
          pageTitle: "Private Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/apps/chat/group-chat",
        name: "apps-group-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
          pageTitle: "Group Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/apps/chat/drawer-chat",
        name: "apps-drawer-chat",
        component: () => import("@/views/apps/chat/DrawerChat.vue"),
        meta: {
          pageTitle: "Drawer Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () =>
          import("@/views/crafted/modals/general/InviteFriends.vue"),
        meta: {
          pageTitle: "Invite Friends",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
        meta: {
          pageTitle: "View User",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () =>
          import("@/views/crafted/modals/general/UpgradePlan.vue"),
        meta: {
          pageTitle: "Upgrade Plan",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () =>
          import("@/views/crafted/modals/general/ShareAndEarn.vue"),
        meta: {
          pageTitle: "Share And Earn",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
        meta: {
          pageTitle: "New Target",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
        meta: {
          pageTitle: "New Card",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
        meta: {
          pageTitle: "New Address",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
        meta: {
          pageTitle: "Create Api Key",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () =>
          import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
        meta: {
          pageTitle: "Two Factory Auth",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
        meta: {
          pageTitle: "Create App",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () =>
          import("@/views/crafted/modals/wizards/CreateAccount.vue"),
        meta: {
          pageTitle: "Create Account",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/views/crafted/widgets/Lists.vue"),
        meta: {
          pageTitle: "Lists",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/views/crafted/widgets/Statistics.vue"),
        meta: {
          pageTitle: "Statistics",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/views/crafted/widgets/Charts.vue"),
        meta: {
          pageTitle: "Charts",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/views/crafted/widgets/Mixed.vue"),
        meta: {
          pageTitle: "Mixed",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/views/crafted/widgets/Tables.vue"),
        meta: {
          pageTitle: "Tables",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/views/crafted/widgets/Feeds.vue"),
        meta: {
          pageTitle: "Feeds",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),

        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.isAuthenticated) {
            next(false);
          } else {
            next();
          }
        },
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  ApiService.setHeader();
  // authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
