const formatDateWithoutHour = (dateString) => {
  const year = dateString.substr(0, 4);
  const month = dateString.substr(4, 2);
  const day = dateString.substr(6, 2);

  const date = new Date(`${year}-${month}-${day}`);
  return date.toISOString().slice(0, 10);
};

export { formatDateWithoutHour };
