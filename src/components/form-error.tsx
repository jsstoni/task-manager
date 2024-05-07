interface Props {
  value: any;
  name: string;
}

export function FormError({ value, name }: Props) {
  return (
    value &&
    value.errors && <small className="text-red-500">{value.errors[name]}</small>
  );
}
