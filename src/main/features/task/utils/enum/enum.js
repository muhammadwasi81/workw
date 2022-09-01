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
const TaskPriorityLabelsAndColor = (label) => {
  return {
    1: {
      label: label.default,
      color: "var(--currentThemeColor)",
    },
    2: {
      label: label.low,
      color: "red",
    },

    3: {
      label: label.medium,
      color: "orange",
    },
    4: {
      label: label.high,
      color: "green",
    },
  };
};
export const getPriorityLabel = (label, priority) => {
  return TaskPriorityLabelsAndColor(label)[priority];
};
