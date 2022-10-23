import Image from "next/image";
import styles from "./index.module.scss";
import { IconBrandGithub } from "@tabler/icons";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.leftLogo}>RepoSearch</span>
        <div className={styles.leftContent}>
          <div className={styles.leftContentText}>
            <span className={styles.leftContentTextHeader}>Try to Find</span>
            <div>
              <strong>GitHub</strong> repositories that you are looking for
            </div>
          </div>
          <div className={styles.githubButton}>
            <IconBrandGithub size={24} />
            <a href="https://github.com/login/oauth/authorize?client_id=b6edd25645bf0966ee4c">
              Sign in with GitHub
            </a>
          </div>
        </div>
        <div className={styles.creator}>
          <a
            href="https://github.com/ozkalai"
            target="_blank"
            rel="noopener noreferrer"
          >
            created by ozkalai
          </a>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src="/bg.png" alt="logo" />
        </div>
      </div>
    </div>
  );
};
export default Login;
