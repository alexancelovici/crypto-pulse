export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : value >= 1 ? 2 : 4,
  }).format(value ?? 0);

export const formatCompactCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value ?? 0);

export const formatCompactNumber = (value) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value ?? 0);

export const formatPercent = (value) => {
  const normalizedValue = value ?? 0;
  const sign = normalizedValue > 0 ? "+" : "";

  return `${sign}${normalizedValue.toFixed(2)}%`;
};
