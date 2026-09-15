import { getPreferenceValues } from "@raycast/api";
import { displayInstanceUrl, normalizeInstanceUrl } from "./instanceUrl";

export type MemosConnection = { instanceUrl: string; accessToken: string };

const readPreferences = () => getPreferenceValues<Preferences>();

export const getConfiguredInstanceUrl = () => displayInstanceUrl(readPreferences().instanceUrl ?? "");

export const getMemosConnection = (): MemosConnection => {
  const { instanceUrl, accessToken } = readPreferences();
  return { instanceUrl: normalizeInstanceUrl(instanceUrl ?? ""), accessToken: accessToken.trim() };
};
