import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  return <input ref={ref} {...props} />;
});

Input.displayName = "Button";

export { Input };
