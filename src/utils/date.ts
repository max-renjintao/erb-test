import { isValid, format as dnsFormat } from 'date-fns';

export const dateFormat = (d?: Date) => {
  // console.log('date.format:', d);

  return isValid(d) && d ? dnsFormat(d, 'yyyy-MM-dd') : '';
};
export const dateParse = (s: string) => new Date(s);
