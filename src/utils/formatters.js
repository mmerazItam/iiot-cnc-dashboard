export function formatNumber(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "UNAVAILABLE";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatWithUnit(value, unit, digits = 1) {
  const formatted = formatNumber(value, digits);
  return formatted === "UNAVAILABLE" ? formatted : `${formatted} ${unit}`;
}

export function formatPercent(value) {
  return formatWithUnit(value, "%", 0);
}

export function formatSeconds(value) {
  return formatWithUnit(value, "s", 0);
}

export function formatPosition(value) {
  return formatWithUnit(value, "mm", 3);
}

export function estimatePartsPerHour(lastCycle) {
  // LastCycle is already in seconds in the MTConnect trace. A missing cycle
  // time stays unavailable instead of being coerced to zero production.
  if (!Number.isFinite(lastCycle) || lastCycle <= 0) return null;
  return 3600 / lastCycle;
}

export function splitCsvTags(value) {
  if (!value || value === "UNAVAILABLE") return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
