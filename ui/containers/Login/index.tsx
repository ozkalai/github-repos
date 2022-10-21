import Image from "next/image";
import styles from "./index.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.text}>
            <h1>Explore</h1>
            <h2>GitHub repositories</h2>
            <p>Search for GitHub repositories and explore them.</p>
          </div>
          <div className={styles.githubButton}>
            <a href="https://github.com/login/oauth/authorize?client_id=b6edd25645bf0966ee4c">
              Sign in with GitHub
            </a>
            <Image width={32} height={32} src="/github.png" />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <Image
            layout="fill"
            src="/bg.png"
            alt="logo"
            className={styles.logo}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
