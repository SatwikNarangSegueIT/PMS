export const PERMISSIONS = [
  "dispense.patients.read",
  "dispense.patients.write",
  "dispense.prescribers.write",
  "dispense.scripts.read",
  "dispense.scripts.write",
  "dispense.scripts.check",
  "dispense.reports.read",
  "pos.sell",
  "pos.refund",
  "pos.discount.override",
  "pos.shift.manage",
  "pos.layby",
  "pos.hire",
  "office.products.read",
  "office.products.write",
  "office.inventory.adjust",
  "office.suppliers.write",
  "office.purchasing.write",
  "office.pricing.write",
  "office.accounts.write",
  "office.stocktake.write",
  "office.reports.read",
  "hq.config.read",
  "hq.stores.manage",
  "hq.pricing.write",
  "hq.drugconfig.write",
  "hq.promotions.write",
  "hq.pricefiles.write",
  "hq.publish",
  "hq.reports.read",
  "platform.users.manage",
  "platform.audit.read",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/** True if `granted` contains at least one of `required`. Empty `required` = public. */
export function hasAnyPermission(
  granted: readonly Permission[],
  required: readonly Permission[] = [],
) {
  return required.length === 0 || required.some((p) => granted.includes(p));
}

/** True if `granted` contains every permission in `required`. */
export function hasAllPermissions(
  granted: readonly Permission[],
  required: readonly Permission[],
) {
  return required.every((p) => granted.includes(p));
}
