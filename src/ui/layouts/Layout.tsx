import { ReactNode } from "react";
import css from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className={css.container}>{children}</div>;
};
