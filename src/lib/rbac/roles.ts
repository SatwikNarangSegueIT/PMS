// Role → permission mapping is owned by the backend; the frontend only needs labels.
export const ROLES = [
  "PHARMACIST",
  "DISPENSARY_TECHNICIAN",
  "PHARMACY_ASSISTANT",
  "STORE_MANAGER",
  "GROUP_ADMIN",
  "PRICING_MANAGER",
  "CATEGORY_MANAGER",
  "REPORTING_USER",
  "SYSTEM_ADMIN",
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  PHARMACIST: "Pharmacist",
  DISPENSARY_TECHNICIAN: "Dispensary Technician",
  PHARMACY_ASSISTANT: "Pharmacy Assistant",
  STORE_MANAGER: "Store Manager",
  GROUP_ADMIN: "Group Administrator",
  PRICING_MANAGER: "Pricing Manager",
  CATEGORY_MANAGER: "Category Manager",
  REPORTING_USER: "Reporting User",
  SYSTEM_ADMIN: "System Administrator",
};
