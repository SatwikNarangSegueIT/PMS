import { describe, expect, it } from "vitest";
import { hasAllPermissions, hasAnyPermission } from "../permissions";

describe("hasAnyPermission", () => {
  it("allows when nothing is required", () => {
    expect(hasAnyPermission([], [])).toBe(true);
    expect(hasAnyPermission([])).toBe(true);
  });

  it("allows when one required permission is granted", () => {
    expect(hasAnyPermission(["pos.sell"], ["pos.layby", "pos.sell"])).toBe(
      true,
    );
  });

  it("denies when none are granted", () => {
    expect(hasAnyPermission(["pos.sell"], ["hq.publish"])).toBe(false);
  });
});

describe("hasAllPermissions", () => {
  it("requires every permission", () => {
    expect(
      hasAllPermissions(["pos.sell", "pos.refund"], ["pos.sell", "pos.refund"]),
    ).toBe(true);
    expect(hasAllPermissions(["pos.sell"], ["pos.sell", "pos.refund"])).toBe(
      false,
    );
  });
});
