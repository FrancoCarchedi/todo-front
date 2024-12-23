const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Convertir la fecha a UTC para evitar desajustes con la zona horaria local
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export default formatDate;