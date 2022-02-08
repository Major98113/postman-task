const MIN_LIMIT = 0;
const MAX_LIMIT = 100000;

export const isNumeric = value => !!Number(value);

export const isValueCorrectLimits = value => MIN_LIMIT <= value && value <= MAX_LIMIT;