import { describe, expect, it } from "vitest";
import { formatCents } from "../currency";

describe("formatCents", () => {
  it("formats cents as AUD", () => {
    expect(formatCents(123456)).toBe("$1,234.56");
    expect(formatCents(0)).toBe("$0.00");
  });

  it("shows a dash for missing values", () => {
    expect(formatCents(null)).toBe("—");
    expect(formatCents(undefined)).toBe("—");
    expect(formatCents(Number.NaN)).toBe("—");
  });
});
