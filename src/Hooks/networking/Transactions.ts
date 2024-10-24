import { cache } from "react";

export function useGetTransactions(token: string) {
  return cache(
    async (
      filters: Models.Transaction.Filters
    ): Promise<Models.Transaction.ApiData> => {
      const params = new URLSearchParams(filters as Record<string, string>);
      const res = await fetch(`/api/transactions?${params.toString()}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const data = await res.json();
      return data;
    }
  );
}
