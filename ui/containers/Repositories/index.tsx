import {
  IconArrowDown,
  IconArrowUp,
  IconFilter,
  IconExternalLink,
  IconActivity,
} from "@tabler/icons";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSort, setOrder } from "../../../store/slices/search";
import styles from "./index.module.scss";

const Repositories = () => {
  const { repositories, status, order, sort } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();
  const items = repositories?.items ?? [];

  const FilterArrow = order === "asc" ? IconArrowUp : IconArrowDown;

  const handleSort = (selectedSort: string) => {
    if (selectedSort === sort) {
      if (order === "asc") {
        dispatch(setSort(undefined));
        dispatch(setOrder("desc"));
      } else {
        dispatch(setOrder("asc"));
      }
    } else {
      dispatch(setSort(selectedSort));
      dispatch(setOrder("desc"));
    }
  };

  return (
    <div className={styles.main}>
      <table className={styles.table}>
        <thead className={styles.tr}>
          <tr className={styles.tr}>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Description</th>
            <th onClick={() => handleSort("stars")}>
              <div className={styles.thContent}>
                <span>Stars</span>
                <FilterArrow
                  size={18}
                  style={{ color: sort === "stars" ? "orange" : "white" }}
                />
              </div>
            </th>
            <th onClick={() => handleSort("forks")}>
              <div className={styles.thContent}>
                <span>Forks</span>
                <FilterArrow
                  size={18}
                  style={{
                    color: sort === "forks" ? "orange" : "white",
                  }}
                />
              </div>
            </th>
            <th onClick={() => handleSort("updated")}>
              <div className={styles.thContent}>
                <span>Updated</span>
                <FilterArrow
                  size={18}
                  style={{
                    color: sort === "updated" ? "orange" : "white",
                  }}
                />
              </div>
            </th>
            <th>
              <IconActivity />
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <a
                    href={item.owner.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: " 0.25rem",
                    }}
                  >
                    <img
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                      }}
                      src={item.owner.avatar_url}
                      alt={item.owner.login}
                    />
                    <span>
                      {item.owner.login.length > 20
                        ? item.owner.login.slice(0, 17) + "..."
                        : item.owner.login}
                    </span>
                  </a>
                </td>
                <td>{item.description}</td>
                <td>{item.stargazers_count}</td>
                <td>{item.forks_count}</td>
                <td>{dayjs(item.updated_at).format("MMM DD YYYY")}</td>
                <td>
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: " 0.25rem",
                    }}
                  >
                    <IconExternalLink />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Repositories;
