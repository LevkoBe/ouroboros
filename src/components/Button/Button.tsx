import styles from "./Button.module.css";

const typedStyles = styles as ButtonStyles;

type ButtonStyles = {
  primary: string;
  outlined: string;
  tertiary: string;
  text: string;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "outlined" | "tertiary" | "text";
  onMobile?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onMobile = false,
  ...props
}) => (
  <button
    {...props}
    className={`${typedStyles[variant]} ${onMobile ? styles.onMobile : ""}`}
  >
    {children}
  </button>
);
