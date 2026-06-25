interface Props {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: Props) {
  return (
    <div
      className="
    border
    rounded-lg
    p-4
   "
    >
      <h3>{title}</h3>

      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;
