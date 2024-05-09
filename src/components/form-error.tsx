import { FieldError } from "react-hook-form";

interface Props {
  value: FieldError | undefined;
}

export const FormError = ({ value }: Props) => {
  return value && <p className="text-xs text-red-500">{value.message}</p>;
};
