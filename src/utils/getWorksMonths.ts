import { getMonth } from 'date-fns';
import { deduplicateVar } from './deduplicate';

const getWorksMonths = (works: Work[]) => {
  return deduplicateVar(works.map((w) => getMonth(w.date_e) + 1)).filter(
    (m) => m
  );
};

export default getWorksMonths;
