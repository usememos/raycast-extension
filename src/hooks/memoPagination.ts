import type { List } from "@raycast/api";
import type { ComponentProps } from "react";

type Pagination = ComponentProps<typeof List>["pagination"];

export const guardPagination = (pagination: Pagination, isLoading: boolean): Pagination => {
  if (pagination == null) return undefined;
  const canLoadMore = pagination.hasMore && !isLoading;
  return {
    ...pagination,
    hasMore: canLoadMore,
    onLoadMore: () => {
      if (canLoadMore) pagination.onLoadMore();
    },
  };
};
