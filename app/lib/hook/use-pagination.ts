import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function usePagination(totalItems: number, itemPerPage: number) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const createPageURL = useCallback(
    (pageNumber: Number | String) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname],
  );
  const totalPages = Math.ceil(totalItems / itemPerPage) * 10;

  return {
    createPageURL,
    totalPages,
    currentPage,
  };
}
