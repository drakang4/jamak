/**
 * SRT Time
 * {string} HH:mm:ss,SSS
 *
 * Player Time
 * {number} s.SSSSSS
 */

/**
 * Parse time data.
 * @param time SRT Time
 * @return number Player Time
 */
export const srtToPlayer = (time) => {
  const regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
  const parts = regex.exec(time);

  if (parts === null) {
    return 0;
  }

  const cleanParts = parts.slice(1, 5);

  cleanParts.forEach((match, index) => {
    cleanParts[index] = parseInt(match, 10);
  });

  // hours + minutes + seconds + ms
  return (cleanParts[0] * 3600) + (cleanParts[1] * 60) + cleanParts[2] + (cleanParts[3] * 0.001);
};

/**
 * Parse time data.
 * @param time Player Time
 * @return string SRT Time
 */
export const playerToSrt = (time) => {
  let hour = Math.floor(time / 3600).toString();
  let minute = Math.floor((time % 3600) / 60).toString();
  let second = Math.floor((time % 3600) % 60).toString();
  let milliSecond = Math.round(((time % 3600 % 60) - second) * 1000).toString();

  if (hour.length < 2) {
    hour = `0${hour}`;
  }

  if (minute.length < 2) {
    minute = `0${minute}`;
  }

  if (second.length < 2) {
    second = `0${second}`;
  }

  if (milliSecond.length < 2) {
    milliSecond = `0${milliSecond}`;
  }

  if (milliSecond.length < 3) {
    milliSecond = `0${milliSecond}`;
  }

  return `${hour}:${minute}:${second},${milliSecond}`;
};
