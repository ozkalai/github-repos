import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { setToken, getToken } from "../store/slices/auth";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchUserData } from "../store/slices/user";
import Login from "../ui/containers/Login";
import Header from "../ui/components/Header";
import styles from "../styles/Home.module.scss";
import { fetchRepositories } from "../store/slices/search";
import LanguageRadioGroup from "../ui/components/LanguageRadioGroup";
import Pagination from "../ui/components/Pagination";
import Repositories from "../ui/containers/Repositories";
import Input from "../ui/components/Input";

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
    <div className={styles.main}>
      {user ? (
        <div>
          <Header />
          {/* <LanguageRadioGroup
            options={[
              { value: "javascript", label: "Javascript" },
              { value: "scala", label: "Scala" },
              { value: "python", label: "Python" },
            ]}
          />
          <Input />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              margin: "auto",
            }}
            className={styles.header}
          >
            <Repositories />
          </div>
          <Pagination /> */}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
