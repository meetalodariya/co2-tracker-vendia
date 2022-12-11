import { co2HistoricalData } from 'src/apps/Motor/types';

export const getLatestCo2Value = (arr: co2HistoricalData) => {
  if (arr && arr.length > 0) {
    return arr.reduce(
      function (prev, current) {
        return +prev.year > +current.year ? prev : current;
      },
      { year: 0, value: 0 },
    );
  }
  return { year: 0, value: 0 };
};

export const getCo2ValueInKgByDistance = (
  distanceInMeters: number,
  co2ValueInGrams: number,
) => Math.ceil((distanceInMeters * co2ValueInGrams * 0.000621371192) / 1000);
