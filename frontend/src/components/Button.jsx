import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// simple class merge function
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-purple-500 text-white hover:bg-purple-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 hover:bg-gray-100",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        ghost: "hover:bg-gray-100",
        link: "text-blue-500 underline hover:text-blue-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button };