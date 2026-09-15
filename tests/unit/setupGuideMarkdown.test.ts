import { describe, expect, it } from "vitest";
import { buildSetupMarkdown } from "../../src/components/setupGuideMarkdown";

const instanceUrl = "https://demo.usememos.com";

describe("buildSetupMarkdown", () => {
  it("shows progress while checking", () => {
    expect(buildSetupMarkdown({ instanceUrl, isLoading: true })).toContain(
      "⏳ Checking the connection to `https://demo.usememos.com`…",
    );
  });

  it("greets the signed-in user by display name", () => {
    const markdown = buildSetupMarkdown({
      instanceUrl,
      isLoading: false,
      user: { name: "users/1", username: "steven", displayName: "Steven" },
    });
    expect(markdown).toContain("✅ Connected to `https://demo.usememos.com` as **Steven** (@steven).");
  });

  it("surfaces the error message and the token link", () => {
    const markdown = buildSetupMarkdown({ instanceUrl, isLoading: false, errorMessage: "Token rejected" });
    expect(markdown).toContain("❌ Token rejected");
    expect(markdown).toContain("https://demo.usememos.com/setting#access-token");
  });
});
