export const formatDate = (strDate: string): string => {
  try {
    const date = new Date(strDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  } catch(_e) {
    return '';
  }
};

export const calcDate = (date: Date, delta: number): Date => {
  try {
    date.setHours(0, 0, 0, 0);
    const deltaDate = new Date(date.getTime() + delta * 24 * 60 * 60 * 1000);
    deltaDate.setHours(0, 0, 0, 0);
    return deltaDate;
  } catch(_e) {
    return new Date();
  }
}