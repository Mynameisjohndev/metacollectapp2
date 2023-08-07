const formatHzToMhz = (hz: number) => {
  if (!hz) return null;
  const mhz = hz / 1000000;
  return mhz.toFixed(2);
};

// console.log(formatHzToMhz(2));

export { formatHzToMhz };
