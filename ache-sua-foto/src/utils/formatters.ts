export const formatPhotoNumber = (num: number | string): string => {
  return num.toString().padStart(5, "0");
};

export const getFileName = (number: string): string => {
  return `BBD_${number}.jpg`;
};

export const generateRandomCode = (): string => {
  const randomNum = Math.floor(Math.random() * 100000);
  return formatPhotoNumber(randomNum);
};
