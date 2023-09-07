export const getFormattedDate = (date: Date) => date.toISOString().slice(0, 10);

export const getDateMinusDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

export const deserializeDate = (isoString: string) => new Date(isoString);
