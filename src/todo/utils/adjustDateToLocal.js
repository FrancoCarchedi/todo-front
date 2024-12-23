const adjustDateToLocal = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0];
};

export default adjustDateToLocal;