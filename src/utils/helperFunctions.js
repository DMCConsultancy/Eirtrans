export const PrettyPrintJSON = raw => {
  console.log(JSON.stringify(raw, null, 4));
};

export const getCurrentDate = (padded = false) => {
  const date = new Date();

  let month = (date.getMonth() + 1).toString();

  if (padded) {
    month = month.length === 1 ? `0${month}` : month;
  }

  const d = date.getDate();
  const m = month;
  const y = date.getFullYear();
  const currentDate = y + '-' + m + '-' + d;
  console.log({currentDate});

  return currentDate;
};
