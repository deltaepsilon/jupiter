import format from 'date-fns/format';

export function formatDate(date?: Date, formatString = 'yyyy-MM-dd') {
  return format(date ?? new Date(), formatString);
}
