import moment from 'moment';

const value = '__/__/__';

const formatDate = (date?: string) => {
  if (!date) return value;
  const formatNewDate = moment(date).format('DD/MM/YYYY');
  if (formatNewDate === 'Invalid date') return value;
  return formatNewDate;
};
export { formatDate };
