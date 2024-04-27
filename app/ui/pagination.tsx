'use client'

import React from "react";
import { Pagination as Pg } from 'antd';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Pagination(
  {totalPages}: { totalPages: number }
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const {replace} = useRouter()
  const createPageURL = (pageNumber: Number | String) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}#queue`)
  }

  return (
    <Pg
      className={'w-fit mx-auto'}
      total={totalPages}
      current={currentPage}
      onChange={createPageURL}
    />
  );
}
