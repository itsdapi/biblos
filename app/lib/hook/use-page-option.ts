/**
 * 返回[skip, limit]
 * @param currPage
 * @param itemsPerPage
 */
export default function usePageOptions(currPage = 1, itemsPerPage = 10) {
  return [(currPage - 1) * itemsPerPage, itemsPerPage];
}
