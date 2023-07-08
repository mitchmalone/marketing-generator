const textSwap = (title, text, index, city, coordinate) => {
  if (index === 1) return title;
  if (index === 2) return city;
  if (index === 3) return coordinate;
  return text.text;
};

export default textSwap;
