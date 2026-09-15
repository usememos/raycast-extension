import type { CurrentUser } from "../api/auth";
import { accessTokenSettingsUrl, DEFAULT_INSTANCE_URL } from "../helpers/instanceUrl";

export type SetupState = { instanceUrl: string; isLoading: boolean; user?: CurrentUser; errorMessage?: string };

const statusLine = ({ instanceUrl, isLoading, user, errorMessage }: SetupState) => {
  if (isLoading) return `⏳ Checking the connection to \`${instanceUrl}\`…`;
  if (errorMessage != null) return `❌ ${errorMessage}`;
  if (user == null) return `Not connected to \`${instanceUrl}\` yet.`;
  return `✅ Connected to \`${instanceUrl}\` as **${user.displayName || user.username}** (@${user.username}).`;
};

export const buildSetupMarkdown = (state: SetupState) => {
  const tokenUrl = accessTokenSettingsUrl(state.instanceUrl);
  return [
    "# Connect Raycast to Memos",
    statusLine(state),
    "## Steps",
    `1. **Instance URL**: currently \`${state.instanceUrl}\`. Keep \`${DEFAULT_INSTANCE_URL}\` to try the public demo, or enter the address of your own instance.`,
    `2. **Access token**: create one at [${tokenUrl}](${tokenUrl}) and paste it into the extension preferences.`,
    "3. Come back here and press **⌘R** to test the connection again.",
    "> Both values live in Raycast Settings → Extensions → Memos, where you can change them at any time.",
  ].join("\n\n");
};
