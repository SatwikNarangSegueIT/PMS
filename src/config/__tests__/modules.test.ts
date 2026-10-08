import { describe, expect, it } from "vitest";
import { getModuleForPath, isNavItemActive, MODULES } from "../modules";

describe("getModuleForPath", () => {
  it("finds the module for nested paths", () => {
    expect(getModuleForPath("/dispense/scripts/abc")?.key).toBe("DISPENSE");
    expect(getModuleForPath("/hq")?.key).toBe("HQ");
  });

  it("does not match on a shared prefix", () => {
    expect(getModuleForPath("/hqx")).toBeUndefined();
  });
});

describe("isNavItemActive", () => {
  const [dashboard, , queue] = MODULES.DISPENSE.nav;

  it("matches exact items only on their own path", () => {
    expect(isNavItemActive(dashboard, "/dispense")).toBe(true);
    expect(isNavItemActive(dashboard, "/dispense/scripts")).toBe(false);
  });

  it("matches non-exact items on sub-paths", () => {
    expect(isNavItemActive(queue, "/dispense/scripts/123")).toBe(true);
  });
});
