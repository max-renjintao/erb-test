import num from 'numeral';

export const amount = (n: number) => num(n).format('0,0.00');
export const percent = (n: number) => num(n).format('0,0.0%');
