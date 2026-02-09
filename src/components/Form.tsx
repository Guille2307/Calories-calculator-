/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/category";
import type { Activity } from "../types";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activity-reducer";

type FormProps = {
  dispatch: React.Dispatch<ActivityActions>;
  state: ActivityState;
};
const initialState = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateAtivity) => stateAtivity.id === state.activeId,
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId, state.activities]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const isNumberField =
      e.target.id === "calories" || e.target.id === "category";
    const value = isNumberField ? Number(e.target.value) : e.target.value;
    setActivity({
      ...activity,
      [e.target.id]: value,
    });
  };
  const isFormValid = activity.name.trim() !== "" && activity.calories > 0;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: "save_activity",
      payload: { newActivity: activity },
    });

    setActivity({ ...initialState, id: uuidv4() });
  };
  return (
    <>
      <form
        className="space-y-5 bg-white shadow p-10 rounded-lg w-full"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">
            {" "}
            Category
          </label>
          <select
            id="category"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">
            Activity
          </label>
          <input
            type="text"
            id="name"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            placeholder=" Meal: Rice with chicken or Exercise: Running"
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">
            Calories
          </label>
          <input
            type="number"
            id="calories"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            placeholder="Calories Ej.300 or 500"
            value={activity.calories === 0 ? "" : activity.calories}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <input
          type="submit"
          className="bg-gray-800  hover:bg-gray-900 w-full font-bold uppercase text-white cursor-pointer p-3 rounded-lg disabled:opacity-10 disabled:cursor-not-allowed"
          value={activity.category === 1 ? "Add Meal" : "Add Exercise"}
          disabled={!isFormValid}
        />
      </form>
    </>
  );
}
