import React from "react";
import styles from "./index.module.css";

export type IButton = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const Button: React.FC<IButton> = ({ children, ...props }) => {
  return (
    <a {...props} className={styles.button} data-testid="btn">
      {children}
    </a>
  );
};
