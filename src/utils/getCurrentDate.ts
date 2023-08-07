// const currentDate = () => {
//   const date = new Date().toISOString().slice(0, 10);
//   return date.toString();
// };

function currentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
  const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export { currentDate };
