"use client";

import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "antd";
import { config } from "@/app.config";

export default function SearchPrompt() {
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams();
    if (term) params.set("query", term);
    else params.delete("query");
    replace(`${config.path.search}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <Input.Search
      placeholder={"尝试搜索一本书吧"}
      onChange={(e) => handleSearch(e.target.value)}
      onSearch={handleSearch}
    />
  );
}
