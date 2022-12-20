import { isValid, format } from 'date-fns';

export const dateFormat = (d?: Date, style = 'yyyy-MM-dd') => {
  // console.log('date.format:', d);

  return isValid(d) && d ? format(d, style) : '';
};
export const dateParse = (s: string) => new Date(s);
