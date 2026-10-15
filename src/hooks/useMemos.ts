import { appendFileSync } from "node:fs";
import { useCachedPromise } from "@raycast/utils";
import { buildMemoFilter, listMemos } from "../api/memo";
import { toErrorMessage } from "../helpers/errors";
import { getMemosConnection } from "../helpers/preferences";
import { guardPagination } from "./memoPagination";
import { useCurrentUser } from "./useCurrentUser";

export type MemoScope = "mine" | "all";

const PAGE_SIZE = 30;

const DEBUG_LOG =
  "/private/tmp/claude-501/-Users-youssef-Projects-memos/069bacf3-eb5c-459d-99c7-760847820a70/scratchpad/memos-debug.log";
const debugLog = (label: string, data: unknown) => {
  console.log(`[memos-debug] ${label}`, data);
  try {
    appendFileSync(DEBUG_LOG, `${new Date().toISOString()} ${label} ${JSON.stringify(data)}\n`);
  } catch (error) {
    console.log("[memos-debug] file sink failed", error);
  }
};

export const useMemos = (scope: MemoScope, searchText: string) => {
  const currentUser = useCurrentUser();
  const creatorName = scope === "mine" ? currentUser.user?.name : undefined;
  const { data, error, isLoading, pagination, revalidate } = useCachedPromise(
    (text: string, creator: string | undefined) =>
      async ({ cursor, page: pageIndex }: { cursor?: string; page: number }) => {
        const filter = buildMemoFilter({ searchText: text, creator });
        debugLog("request", { pageIndex, cursor, text, creator });
        const page = await listMemos(getMemosConnection(), { filter, pageToken: cursor, pageSize: PAGE_SIZE });
        debugLog("response", {
          pageIndex,
          cursorSent: cursor,
          count: page.memos.length,
          first: page.memos[0]?.name,
          last: page.memos.at(-1)?.name,
          nextPageToken: page.nextPageToken,
        });
        return { data: page.memos, hasMore: page.nextPageToken != null, cursor: page.nextPageToken };
      },
    [searchText, creatorName],
    { keepPreviousData: true, execute: scope === "all" || creatorName != null, onError: () => undefined },
  );
  const failure = error ?? (scope === "mine" ? currentUser.error : undefined);
  const isLoadingMemos = isLoading || (scope === "mine" && currentUser.isLoading);
  const heldPagination = guardPagination(pagination, isLoadingMemos);
  const names = (data ?? []).map((memo) => memo.name);
  debugLog("render", {
    scope,
    searchText,
    creatorName,
    rows: names.length,
    duplicateRows: names.length - new Set(names).size,
    isLoading: isLoadingMemos,
    hasMoreFromHook: pagination?.hasMore,
    hasMoreToRaycast: heldPagination?.hasMore,
  });
  const debugPagination =
    heldPagination == null
      ? undefined
      : {
          ...heldPagination,
          onLoadMore: () => {
            debugLog("onLoadMore called by Raycast", {
              isLoading: isLoadingMemos,
              hasMoreToRaycast: heldPagination.hasMore,
            });
            heldPagination.onLoadMore();
          },
        };
  return {
    memos: data ?? [],
    isLoading: isLoadingMemos,
    errorMessage: failure == null ? undefined : toErrorMessage(failure),
    pagination: debugPagination,
    revalidate,
    currentUserName: currentUser.user?.name,
  };
};
