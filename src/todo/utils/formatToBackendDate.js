const formatToBackendDate = (date) => {
  // Asegúrate de que el valor recibido es válido
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`; // Formato estándar para enviar al backend
};

export default formatToBackendDate;