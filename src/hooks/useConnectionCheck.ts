import { usePromise } from "@raycast/utils";
import { getCurrentUser } from "../api/auth";
import { toErrorMessage } from "../helpers/errors";
import { getConfiguredInstanceUrl, getMemosConnection } from "../helpers/preferences";

const checkConnection = () => getCurrentUser(getMemosConnection());

export const useConnectionCheck = () => {
  const { data: user, error, isLoading, revalidate } = usePromise(checkConnection, [], { onError: () => undefined });
  return {
    instanceUrl: getConfiguredInstanceUrl(),
    user,
    errorMessage: error == null ? undefined : toErrorMessage(error),
    isLoading,
    revalidate,
  };
};
