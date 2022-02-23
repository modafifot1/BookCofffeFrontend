const getMonthsByquater = (quater) => {
  switch (quater) {
    case 1:
      return [1, 2, 3];
    case 2:
      return [4, 5, 6];
    case 3:
      return [7, 8, 9];
    case 4:
      return [10, 11, 12];
    default:
      break;
  }
};
const getQuaterByMonth = (month) => {
  if (month < 4) return 1;
  if (month < 7) return 2;
  if (month < 10) return 3;
  return 4;
};
export const dateFunction = {
  getMonthsByquater,
  getQuaterByMonth,
};
