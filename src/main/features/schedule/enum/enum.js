export const ScheduleTypeEnum = {
  Appointment: 1,
  Meeting: 2,
  Interview: 3,
  StandUp: 4,
  Task: 5,
  Travel: 6,
};
export const ScheduleReferenceTypeEnum = {
  General: 1,
  Group: 2,
  Project: 3,
  Lead: 4,
};
export const ScheduleMemberStatus = {
  Waiting: 1,
  Attending: 2,
  NotAttending: 3,
};
export const ScheduleMemberType = {
  Admin: 1,
  User: 2,
};
export const getStatusLabelAndColor = (module, statusLabels) => {
  return {
    [ScheduleMemberStatus.Waiting]: {
      label: "Waiting",
      color: "#1a5669",
    },
    [ScheduleMemberStatus.Attending]: {
      label: "Attending",
      color: "#1ECB40",
    },
    [ScheduleMemberStatus.NotAttending]: {
      label: "Not Attending",
      color: "#FF0000",
    },
    // [ScheduleMemberStatus.Resend]: {
    // 	// label: statusLabels.Resend,
    // 	// color: "#008eff",
    // 	label: statusLabels.Cancelled,
    // 	color: "#a40d0d",
    // },
    // [ScheduleMemberStatus.Inactive]: {
    // 	label: statusLabels.Inactive,
    // 	color: "#1ECB40",
    // },
    // [ScheduleMemberStatus.NotRequired]: {
    // 	label: statusLabels.NotRequired,
    // 	color: "#1ECB40",
    // },
    // [ScheduleMemberStatus.Cancelled]: {
    // 	label: statusLabels.Cancelled,
    // 	color: "#a40d0d",
    // },
    // [ScheduleMemberStatus.ApprovalRequired]: {
    // 	label: statusLabels.ApprovalRequired,
    // 	color: "#1ECB40",
    // },
    // [ScheduleMemberStatus.NoStatus]: {
    // 	label: "No Status",
    // 	color: "Red",
    // },
    // [ScheduleMemberStatus.Hold]: { label: statusLabels.Hold, color: "#ffa500" },
  };
};
