import NumberFormat from 'react-number-format';

export const numberFormatting = (value, percent) => {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={true}
      decimalScale={percent ? 1 : 6}
      fixedDecimalScale={percent ? true : false}
      allowNegative={true}
    />
  );
};
