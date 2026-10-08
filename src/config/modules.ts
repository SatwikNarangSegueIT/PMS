import {
  Activity,
  Boxes,
  Building2,
  ChartColumn,
  CirclePlus,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileSpreadsheet,
  FileText,
  History,
  KeyRound,
  Landmark,
  LayoutDashboard,
  ListOrdered,
  Megaphone,
  Network,
  Package,
  Pill,
  Receipt,
  RefreshCw,
  ScanLine,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Store,
  Tags,
  Truck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Permission } from "@/lib/rbac";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Match the href exactly (for module index pages). */
  exact?: boolean;
  /** Visible if the user has any of these. Omitted = visible to all signed-in users. */
  perm?: Permission[];
};

export type ModuleKey = "DISPENSE" | "POS" | "OFFICE" | "HQ" | "ADMIN";

export type AppModule = {
  key: ModuleKey;
  label: string;
  path: string;
  icon: LucideIcon;
  nav: NavItem[];
};

export const MODULES: Record<ModuleKey, AppModule> = {
  DISPENSE: {
    key: "DISPENSE",
    label: "Dispense",
    path: "/dispense",
    icon: Pill,
    nav: [
      {
        href: "/dispense",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
        perm: ["dispense.scripts.read"],
      },
      {
        href: "/dispense/new",
        label: "New script",
        icon: CirclePlus,
        perm: ["dispense.scripts.write"],
      },
      {
        href: "/dispense/scripts",
        label: "Script queue",
        icon: ListOrdered,
        perm: ["dispense.scripts.read"],
      },
      {
        href: "/dispense/patients",
        label: "Patients",
        icon: Users,
        perm: ["dispense.patients.read"],
      },
      {
        href: "/dispense/reports",
        label: "Reports",
        icon: ChartColumn,
        perm: ["dispense.reports.read"],
      },
    ],
  },
  POS: {
    key: "POS",
    label: "POS",
    path: "/pos",
    icon: ShoppingCart,
    nav: [
      {
        href: "/pos",
        label: "Register",
        icon: ScanLine,
        exact: true,
        perm: ["pos.sell"],
      },
      {
        href: "/pos/sales",
        label: "Sales & returns",
        icon: Receipt,
        perm: ["pos.sell"],
      },
      {
        href: "/pos/shift",
        label: "Cash & balancing",
        icon: Wallet,
        perm: ["pos.sell"],
      },
      {
        href: "/pos/laybys",
        label: "Laybys",
        icon: ClipboardList,
        perm: ["pos.layby"],
      },
      {
        href: "/pos/hire",
        label: "Equipment hire",
        icon: Wrench,
        perm: ["pos.hire"],
      },
    ],
  },
  OFFICE: {
    key: "OFFICE",
    label: "Office",
    path: "/office",
    icon: Building2,
    nav: [
      {
        href: "/office",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
        perm: ["office.reports.read"],
      },
      {
        href: "/office/products",
        label: "Products",
        icon: Package,
        perm: ["office.products.read"],
      },
      {
        href: "/office/inventory",
        label: "Inventory",
        icon: Boxes,
        perm: ["office.products.read"],
      },
      {
        href: "/office/orders",
        label: "Purchasing",
        icon: Truck,
        perm: ["office.products.read"],
      },
      {
        href: "/office/suppliers",
        label: "Suppliers",
        icon: Landmark,
        perm: ["office.products.read"],
      },
      {
        href: "/office/pricing",
        label: "Pricing review",
        icon: Tags,
        perm: ["office.products.read"],
      },
      {
        href: "/office/accounts",
        label: "Customer accounts",
        icon: CreditCard,
        perm: ["office.products.read"],
      },
      {
        href: "/office/stocktake",
        label: "Stocktake",
        icon: ClipboardCheck,
        perm: ["office.products.read"],
      },
      {
        href: "/office/reports",
        label: "Reports",
        icon: ChartColumn,
        perm: ["office.reports.read"],
      },
    ],
  },
  HQ: {
    key: "HQ",
    label: "HQ",
    path: "/hq",
    icon: Network,
    nav: [
      {
        href: "/hq",
        label: "Group dashboard",
        icon: LayoutDashboard,
        exact: true,
        perm: ["hq.reports.read"],
      },
      {
        href: "/hq/stores",
        label: "Stores & groups",
        icon: Store,
        perm: ["hq.config.read"],
      },
      {
        href: "/hq/dispense-pricing",
        label: "Dispense pricing",
        icon: Pill,
        perm: ["hq.config.read"],
      },
      {
        href: "/hq/drug-ranking",
        label: "Drug ranking",
        icon: ListOrdered,
        perm: ["hq.config.read"],
      },
      {
        href: "/hq/retail-pricing",
        label: "Retail pricing",
        icon: Tags,
        perm: ["hq.config.read"],
      },
      {
        href: "/hq/promotions",
        label: "Promotions",
        icon: Megaphone,
        perm: ["hq.config.read"],
      },
      {
        href: "/hq/price-files",
        label: "Supplier price files",
        icon: FileSpreadsheet,
        perm: ["hq.config.read"],
      },
      {
        href: "/hq/sync",
        label: "Publishing & sync",
        icon: RefreshCw,
        perm: ["hq.config.read"],
      },
      {
        href: "/hq/reports",
        label: "Reports",
        icon: FileText,
        perm: ["hq.reports.read"],
      },
      {
        href: "/hq/audit",
        label: "Change log",
        icon: History,
        perm: ["hq.config.read"],
      },
    ],
  },
  ADMIN: {
    key: "ADMIN",
    label: "Admin",
    path: "/admin",
    icon: Settings,
    nav: [
      {
        href: "/admin/users",
        label: "Users & roles",
        icon: Users,
        perm: ["platform.users.manage"],
      },
      { href: "/admin/licence", label: "Licence & modules", icon: ShieldCheck },
      { href: "/admin/integrations", label: "Integrations", icon: Activity },
      {
        href: "/admin/audit",
        label: "Audit log",
        icon: History,
        perm: ["platform.audit.read"],
      },
      { href: "/admin/security", label: "My sessions", icon: KeyRound },
    ],
  },
};

export const MODULE_LIST: AppModule[] = Object.values(MODULES);

export function isNavItemActive(item: NavItem, pathname: string) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function getModuleForPath(pathname: string): AppModule | undefined {
  return MODULE_LIST.find(
    (m) => pathname === m.path || pathname.startsWith(`${m.path}/`),
  );
}
