import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { setToken, getToken } from "../store/slices/auth";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchUserData } from "../store/slices/user";
import {
  setLanguage,
  setSearchValue,
  setPage,
  setPerPage,
  setOrder,
  setSort,
} from "../store/slices/search";
import Login from "../ui/containers/Login";
import Header from "../ui/components/Header";
import styles from "../styles/Home.module.css";
import { fetchRepositories } from "../store/slices/search";

const Home: NextPage = () => {
  const { query } = useRouter();

  const token = useAppSelector(getToken);
  const { user, status } = useAppSelector((state) => state.user);
  const {
    selectedLanguage,
    searchValue,
    repositories,
    page,
    perPage,
    order,
    sort,
  } = useAppSelector((state) => state.search);
  const { replace } = useRouter();
  // todo: manage status with redux toolkit (loading, , rejected) and display loading/error messages accordingly
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.token) {
      dispatch(setToken(query.token as string));
      replace("/"); // remove token from url
    }
  }, [dispatch, query, replace]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      dispatch(fetchRepositories());
    }
  }, [
    dispatch,
    user,
    selectedLanguage,
    searchValue,
    page,
    perPage,
    order,
    sort,
  ]);

  return (
    <div>
      {user ? (
        <div>
          <Header />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              margin: "auto",
            }}
            className={styles.header}
          >
            <h1>Repos</h1>
            <div>Selected Language: {selectedLanguage}</div>
            <div>Search Value: {searchValue}</div>
            <div>page: {page} </div>
            <div>perPage: {perPage} </div>
            <div>order: {order} </div>
            <div>sort: {sort} </div>

            <form>
              <input
                onChange={(e) => dispatch(setLanguage(e.target.value))}
                type="radio"
                name="language"
                value="javascript"
              />
              <label htmlFor="javascript">Javascript</label>

              <input
                onChange={(e) => dispatch(setLanguage(e.target.value))}
                type="radio"
                name="language"
                value="scala"
              />
              <label htmlFor="scala">Scala</label>

              <input
                onChange={(e) => dispatch(setLanguage(e.target.value))}
                type="radio"
                name="language"
                value="python"
              />
              <label htmlFor="python">Python</label>

              <input
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                type="text"
                name="search"
              />
              <div>
                <label htmlFor="page">per page</label>
                <select
                  onChange={(e) => dispatch(setPerPage(Number(e.target.value)))}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </form>
            {repositories?.items.map((repo) => (
              <div key={repo.id}>
                <a href={repo.html_url}>{repo.name}</a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

// if (status === "loading") {
//   return <div>Loading...</div>;
// } else if (status === "failed") {
//   return <div>Error</div>;
// } else {
//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         {user && <h1 className={styles.title}>Welcome {user.name}!</h1>}
//         {user ? (
//           <button onClick={() => dispatch(removeToken())}>Logout</button>
//         ) : (
//           <a href="https://github.com/login/oauth/authorize?client_id=b6edd25645bf0966ee4c">
//             Login
//           </a>
//         )}
//       </main>
//     </div>
//   );
// }

export default Home;
