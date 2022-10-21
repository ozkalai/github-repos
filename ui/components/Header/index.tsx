import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAppSelector } from "../../../store/hooks";
import { Button } from "../Button";
import styles from "./index.module.css";
import { setToken } from "../../../store/slices/auth";
import { setUser } from "../../../store/slices/user";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const { replace } = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <div className={styles.imageWrapper}>
          <Image alt="avatar" src={user?.avatar_url || ""} layout="fill" />
        </div>
        <div>
          <h3>{user?.name}</h3>
          <a rel="noreferrer" target="_blank" href={user?.html_url}>
            @{user?.login}
          </a>
        </div>
      </div>
      {user && (
        <div className={styles.button}>
          <Button
            onClick={() => {
              dispatch(setToken(undefined));
              dispatch(setUser(null));
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
