const formatDate = (dateString) => {
  const date = new Date(dateString);
  console.log("DateString", dateString)

  const formatter = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatter.format(date);
};

export default formatDate;