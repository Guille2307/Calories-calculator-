type CalorieDisplayProps = {
  calories: number;
  text: string;
  color?: string;
};

export default function CalorieDisplay({
  calories,
  text,
  color,
}: CalorieDisplayProps) {
  return (
    <>
      <p
        className={`font-bold rounded-full grid grid-cols-1 gap-3 text-center text-${color}`}
      >
        <span className={`font-black text-6xl text-${color}`}>{calories}</span>
        {text}
      </p>
    </>
  );
}
