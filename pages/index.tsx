import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { setToken, getToken } from "../store/slices/auth";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchUserData } from "../store/slices/user";
import { fetchRepositories } from "../store/slices/search";
import LanguageRadioGroup from "../ui/components/LanguageRadioGroup";
import Login from "../ui/containers/Login";
import Header from "../ui/components/Header";
import Pagination from "../ui/components/Pagination";
import Repositories from "../ui/containers/Repositories";
import Input from "../ui/components/Input";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const { query } = useRouter();

  const token = useAppSelector(getToken);
  const { user } = useAppSelector((state) => state.user);
  const { selectedLanguage, searchValue, page, perPage, order, sort } =
    useAppSelector((state) => state.search);
  const { replace } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.token) {
      dispatch(setToken(query.token as string));
      replace("/", {});
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
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Header />
            <div className={styles.filters}>
              <div className={styles.radioGroup}>
                <LanguageRadioGroup
                  options={[
                    { value: "javascript", label: "Javascript" },
                    { value: "scala", label: "Scala" },
                    { value: "python", label: "Python" },
                  ]}
                />
              </div>
              <div className={styles.input}>
                <Input />
              </div>
            </div>
            <Repositories />
            <Pagination />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
