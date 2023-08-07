const formatSearchValue = (value: string | number) => {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
};

export { formatSearchValue };
