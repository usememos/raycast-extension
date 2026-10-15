import { describe, expect, it, vi } from "vitest";
import { guardPagination } from "../../src/hooks/memoPagination";

const paginationWith = (hasMore: boolean) => ({ pageSize: 30, hasMore, onLoadMore: vi.fn() });

describe("guardPagination", () => {
  it("ignores load-more requests after the last page so the first page isn't fetched and appended again", () => {
    const pagination = paginationWith(false);
    guardPagination(pagination, false)?.onLoadMore();
    expect(pagination.onLoadMore).not.toHaveBeenCalled();
  });

  it("ignores load-more requests while a page is loading", () => {
    const pagination = paginationWith(true);
    guardPagination(pagination, true)?.onLoadMore();
    expect(pagination.onLoadMore).not.toHaveBeenCalled();
  });

  it("loads the next page when more remain and nothing is loading", () => {
    const pagination = paginationWith(true);
    guardPagination(pagination, false)?.onLoadMore();
    expect(pagination.onLoadMore).toHaveBeenCalledOnce();
  });

  it("withholds more pages while a page is loading", () => {
    expect(guardPagination(paginationWith(true), true)).toMatchObject({ hasMore: false });
  });

  it("keeps the last page final", () => {
    expect(guardPagination(paginationWith(false), false)).toMatchObject({ hasMore: false });
  });

  it("leaves a missing pagination missing", () => {
    expect(guardPagination(undefined, false)).toBeUndefined();
  });
});
