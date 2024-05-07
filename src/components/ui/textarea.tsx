import React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ ...props }, ref) => {
    return <textarea ref={ref} {...props} />;
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
