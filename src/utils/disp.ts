import num from 'numeral';

export const amount = (n: number, format = '0,0.00') => num(n).format(format);
export const percent = (n: number, format = '0,0.0%') => num(n).format(format);
