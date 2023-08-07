const passwordGenerator = (): Promise<string> => {
  return new Promise(resolve => {
    const now = new Date();
    const day = now.getDate();
    const hour = now.getHours();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const password = `mcs${formattedDay}${formattedHour}`;
    // console.log(password);

    resolve(password);
    return password;
  });
};
export { passwordGenerator };
