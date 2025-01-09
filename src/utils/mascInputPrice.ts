export const convertToBigDecimal = (value: string): number => {
  if (!value) {
    return 0; 
  }
  const formattedValue = value.replace(/\./g, "").replace(",", ".");

  return parseFloat(formattedValue) || 0;
};

export const formatReal = (value: string): string => {
 
  const numericValue = (parseFloat(value.replace(/\D/g, '')) / 100).toFixed(2);
  const [integerPart, decimalPart] = numericValue.split('.');
  const formattedInteger = integerPart
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g) 
    ?.map(group => group.split('').reverse().join('')) 
    .reverse()
    .join('.') || '';
  return `${formattedInteger},${decimalPart}`;
};
