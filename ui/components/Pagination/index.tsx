import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPerPage, setPage } from "../../../store/slices/search";

const Pagination = () => {
  const { page, perPage, repositories } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();
  const totalPages = React.useMemo(() => {
    return Math.ceil((repositories?.total_count ?? 0) / perPage);
  }, [perPage, repositories]);

  const visiblePages = React.useMemo(() => {
    const pages = [1, page - 1, page, page + 1, totalPages];
    const filtered = pages.filter((page) => page > 0 && page <= totalPages);
    return filtered.filter((page, index) => filtered.indexOf(page) === index);
  }, [page, totalPages]);

  if (totalPages === 0) {
    return null;
  }

  return (
    <div>
      <div>
        <select onChange={(e) => dispatch(setPerPage(Number(e.target.value)))}>
          {[10, 20, 50, 100].map((option) => {
            return (
              <option key={option} value={option} selected={option === perPage}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {visiblePages.map((visiblePage, index) => {
          // add ellipsis  if there is a gap between pages

          return (
            <>
              {index > 0 && visiblePage - visiblePages[index - 1] > 1 && (
                <span key={visiblePage} style={{ margin: "0 0.5rem" }}>
                  ...
                </span>
              )}

              <button
                key={index}
                onClick={() => dispatch(setPage(visiblePage))}
                disabled={visiblePage === page}
              >
                {visiblePage}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
