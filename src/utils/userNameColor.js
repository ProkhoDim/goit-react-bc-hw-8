export const getColorFromName = (name = '') => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `${value.toString(16)}`;
  }
  /* eslint-enable no-bitwise */
  if (color.length < 7) {
    color += '66';
  }
  return color;
};

export const getFirstTwoLetters = (name = '') => {
  const splittedName = name.split(' ');
  return `${splittedName[0][0]}${
    splittedName[1] ? splittedName[1][0] : splittedName[0][1]
  }`;
};
