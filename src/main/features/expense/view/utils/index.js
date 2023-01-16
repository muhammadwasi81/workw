export const referenceHandler = (type, name) => {
  switch (type) {
    case 1:
      return 'General';
    case 2:
      return 'Group';
    case 3:
      return 'Project';
    case 'Lead':
      return 4;
    default:
      return name;
  }
};
