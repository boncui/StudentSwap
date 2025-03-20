interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "primary" | "secondary"; // ✅ Added "secondary"
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button: React.FC<ButtonProps> = ({ variant = "outline", size = "md", ...props }) => {
  const baseStyles = "px-4 py-2 rounded transition";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-300 dark:border-gray-700"
      : variant === "secondary"
      ? "bg-gray-500 text-white hover:bg-gray-600" // ✅ Added secondary styling
      : "bg-blue-500 text-white";
  const sizeStyles =
    size === "sm" ? "text-sm" :
    size === "lg" ? "text-lg" :
    size === "icon" ? "p-2 w-10 h-10 flex items-center justify-center" : "text-md";

  return <button className={`${baseStyles} ${variantStyles} ${sizeStyles}`} {...props} />;
};
