import { Action, ActionPanel, Detail, Icon, openExtensionPreferences, Keyboard } from "@raycast/api";
import { accessTokenSettingsUrl } from "../helpers/instanceUrl";
import { buildSetupMarkdown, type SetupState } from "./setupGuideMarkdown";

type Props = SetupState & { onRetry: () => void };

export const SetupGuide = ({ onRetry, ...state }: Props) => (
  <Detail
    isLoading={state.isLoading}
    markdown={buildSetupMarkdown(state)}
    actions={
      <ActionPanel>
        <Action title="Open Extension Preferences" icon={Icon.Gear} onAction={openExtensionPreferences} />
        <Action.OpenInBrowser
          title="Get Access Token"
          url={accessTokenSettingsUrl(state.instanceUrl)}
          shortcut={{
            macOS: { modifiers: ["cmd"], key: "t" },
            Windows: { modifiers: ["ctrl"], key: "t" },
          }}
        />
        <Action
          title="Test Connection Again"
          icon={Icon.ArrowClockwise}
          shortcut={Keyboard.Shortcut.Common.Refresh}
          onAction={onRetry}
        />
        <Action.OpenInBrowser title="Open Memos" url={state.instanceUrl} shortcut={Keyboard.Shortcut.Common.Open} />
      </ActionPanel>
    }
  />
);
