import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  border?: "none";
  hover?: "primaryHover" | "successHover";
  type?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "notActive";
  size?: "sm" | "md" | "xl";
  fullWidth?: boolean;
};

const variantStyles = cva(["bg-blue-100 border px-5 py-2 text-white"], {
  variants: {
    type: {
      primary: "bg-blue-900 text-white",
      secondary: "bg-white-900 text-black-100",
      error: "bg-red-700 text-white",
      warning: "bg-red-100 text-white",
      success: "bg-green-700 text-white",
      notActive: "bg-blue-900 bg-opacity-50",
    },
    hover: {
      primaryHover: "hover:bg-blue-800",
      successHover: "hover:bg-green-400",
    },
    size: {
      sm: "p-2",
      md: "px-5 py-2",
      xl: "px-6 px-3",
    },
    border: {
      none: "border-none",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    type: "primary",
    size: "md",
  },
});

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      fullWidth,
      type = "primary",
      size = "md",
      border,
      hover,
      ...rest
    },
    ref
  ) => {
    const classStyles = variantStyles({
      type,
      fullWidth,
      size,
      hover,
      border,
    });
    return (
      <button {...rest} ref={ref} className={classStyles}>
        {children}
      </button>
    );
  }
);

export default Button;
