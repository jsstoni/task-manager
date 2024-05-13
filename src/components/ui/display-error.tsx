interface Props {
  value: string;
}
export function DisplayError({ value }: Props) {
  return <span className="p-0.5 text-red-500">{value}</span>;
}
