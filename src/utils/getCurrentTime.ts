const currentTime = () => {
  const time = new Date().toLocaleTimeString();
  return time.toString();
};
export { currentTime };
