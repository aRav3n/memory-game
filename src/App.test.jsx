import { describe, it, expect } from "vitest";

describe("something truthy and falsy", () => {
  it("true to be truthy", () => {
    expect(true).toBe(true);
  });

  it("false to be falsy", () => {
    expect(false).toBe(false);
  });
});
