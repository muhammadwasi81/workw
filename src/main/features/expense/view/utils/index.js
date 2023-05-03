export const referenceHandler = (type, name) => {
  switch (type) {
    case 1:
      return "General";
    case 2:
      return "Group";
    case 3:
      return "Project";
    case 4:
      return "Travel";
    case 5:
      return "Asset";
    default:
      return name;
  }
};
