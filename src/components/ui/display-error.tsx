interface Props {
  value: string | null;
}
export function DisplayError({ value }: Props) {
  return value && <span className="p-0.5 text-red-500">{value}</span>;
}
