export const buttonsEnum = {
  dashboard: [1],
  task: [1],
  assign: [1],
  team: [1],
};

export const TaskPriority = {
  1: "Default",
  2: "Low",
  3: "Medium",
  4: "High",
};
export const UserTaskStatusEnum = {
  NotStarted: 1,
  InProcess: 2,
  Completed: 3,
  RatingAssign: 4,
  Cancelled: 5,
};
const UserTaskStatusLabelsAndColor = () => {
  return {
    1: {
      label: "NotStarted",
      color: "var(--currentThemeColor)",
    },
    2: {
      label: "InProcess",
      color: "var(--currentThemeColor)",
    },
    3: {
      label: "Completed",
      color: "green",
    },
    4: {
      label: "RatingAssign",
      color: "orange",
    },
    5: {
      label: "Cancelled",
      color: "#a40d0d",
    },
  };
};
const TaskPriorityLabelsAndColor = (label) => {
  return {
    1: {
      label: label.default,
      color: "var(--currentThemeColor)",
    },
    2: {
      label: label.low,
      color: "green",
    },

    3: {
      label: label.medium,
      color: "orange",
    },
    4: {
      label: label.high,
      color: "#a40d0d",
    },
  };
};
export const getPriorityLabel = (label, priority) => {
  return TaskPriorityLabelsAndColor(label)[priority];
};
export const getUserStatusLabel = (label, status) => {
  return UserTaskStatusLabelsAndColor(label)[status];
};
