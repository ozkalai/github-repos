import { useDispatch } from "react-redux";
import { IconLogout } from "@tabler/icons";

import { useAppSelector } from "../../../store/hooks";
import { setToken } from "../../../store/slices/auth";
import { setUser } from "../../../store/slices/user";
import styles from "./index.module.scss";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Repo Search</span>
      <div className={styles.user}>
        <div className={styles.userWrapper}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="avatar"
              src={user?.avatar_url || ""}
            />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userInfoName}>{user?.name}</span>
            <a
              className={styles.userInfoLogin}
              rel="noreferrer"
              target="_blank"
              href={user?.html_url}
            >
              @{user?.login}
            </a>
          </div>
        </div>
        {user && (
          <div className={styles.logout}>
            <div
              onClick={() => {
                dispatch(setToken(undefined));
                dispatch(setUser(null));
              }}
            >
              <IconLogout />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
