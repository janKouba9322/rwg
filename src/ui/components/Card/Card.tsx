import { HTMLAttributes } from "react";
import clsx from "clsx";
import css from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, children, ...rest }: CardProps) => {
  return (
    <div {...rest} className={clsx(css.container, className)}>
      {children}
    </div>
  );
};
