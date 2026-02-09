import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0,
      ),
    [activities],
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0,
      ),
    [activities],
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned],
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center mb-10">
        Resumen of calories
      </h2>
      <div className="flex flex-col items-center md:flex-row md justify-between gap-5">
        <CalorieDisplay
          calories={caloriesConsumed}
          text="Calories consumed"
          color="white"
        />
        <CalorieDisplay
          calories={caloriesBurned}
          text="Calories burned"
          color="white"
        />
        <CalorieDisplay
          calories={netCalories}
          text="Difference"
          color="lime-500"
        />
      </div>
    </>
  );
}
