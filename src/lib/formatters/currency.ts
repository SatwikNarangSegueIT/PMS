const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

/** Money is stored as integer cents; format for display. */
export function formatCents(cents: number | null | undefined): string {
  if (cents == null || Number.isNaN(cents)) return "—";
  return audFormatter.format(cents / 100);
}
