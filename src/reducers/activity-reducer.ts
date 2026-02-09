import type { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save_activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-active-id";
      payload: { id: Activity["id"] };
    }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "reStart-app" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions,
) => {
  if (action.type === "save_activity") {
    let updateActivities: Activity[] = [];
    if (state.activeId) {
      updateActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity,
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updateActivities,
      activeId: "",
    };
  }
  if (action.type === "set-active-id") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  if (action.type === "delete-activity") {
    const updateActivities = state.activities.filter(
      (activity) => activity.id !== action.payload.id,
    );

    return {
      ...state,
      activities: updateActivities,
    };
  }

  if (action.type === "reStart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
