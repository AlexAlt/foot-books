export const compact = obj =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => Boolean(value))
);
