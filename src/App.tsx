import Form from "./components/Form";
import { useReducer, useEffect, useMemo } from "react";
import { initialState, activityReducer } from "./reducers/activity-reducer";
import ActivitysList from "./components/ActivitysList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestart = useMemo(
    () => state.activities.length > 0,
    [state.activities],
  );
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-5">
          <h1 className="text-center text-lg md:text-xl font-bold text-white uppercase ">
            Calorie counter
          </h1>
          {canRestart && (
            <button
              className="bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white rounded text-sm uppercase cursor-pointer whitespace-nowrap"
              onClick={() => dispatch({ type: "reStart-app" })}
            >
              Restart
            </button>
          )}
        </div>
      </header>

      <section className="bg-hero bg-cover bg-center h-screen ">
        <div
          className="
        max-w-4xl mx-auto flex items-center justify-center h-full w-full px-5"
        >
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivitysList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
