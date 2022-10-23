import { IconBrandGithub } from "@tabler/icons";

import styles from "./index.module.scss";

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
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
            >
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
