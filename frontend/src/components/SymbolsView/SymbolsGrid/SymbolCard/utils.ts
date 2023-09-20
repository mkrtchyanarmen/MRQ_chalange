export const roundNumber = (
  number: number | undefined | null,
  fractionDigits?: number
) => {
  if (!number) {
    return 0;
  }
  const roundedNumberString = number.toFixed(fractionDigits);
  const roundedNumber = Number(roundedNumberString);

  return roundedNumber;
};

enum NumberType {
  Billion = "B",
  Million = "M",
  Thousand = "K",
  Trillion = "T",
}
const tresholds = {
  [NumberType.Thousand]: 1000,
  [NumberType.Million]: 1000000,
  [NumberType.Billion]: 1000000000,
  [NumberType.Trillion]: 1000000000000,
};
const convertToShortenString = (
  number: number,
  type: NumberType,
  currency?: string | null
) => {
  const treshold = tresholds[type];
  const roundedNumber = roundNumber(number / treshold);
  const shortenText = `${currency} ${roundedNumber + type}`;

  return shortenText;
};

const currency = "$";

export const shortenNumber = (number?: number | null) => {
  const roundedNumber = roundNumber(number);

  const roundedNumberModule = Math.abs(roundedNumber);
  const isThousands =
    roundedNumberModule >= tresholds[NumberType.Thousand] &&
    roundedNumberModule < tresholds[NumberType.Million];
  const isMillions =
    roundedNumberModule >= tresholds[NumberType.Million] &&
    roundedNumberModule < tresholds[NumberType.Billion];
  const isBillionairs =
    roundedNumberModule >= tresholds[NumberType.Billion] &&
    roundedNumberModule < tresholds[NumberType.Trillion];
  const isTrillion = roundedNumberModule >= tresholds[NumberType.Trillion];

  if (isThousands || isMillions || isBillionairs || isTrillion) {
    return convertToShortenString(
      roundedNumber,
      (isThousands && NumberType.Thousand) ||
        (isMillions && NumberType.Million) ||
        (isBillionairs && NumberType.Billion) ||
        (isTrillion && NumberType.Trillion) ||
        NumberType.Thousand,
      currency
    );
  }

  return `${currency}${roundNumber(roundedNumber, 2)}`;
};
