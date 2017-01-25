// parse time data
// from
// HH:mm:ss,SSS (type: string)
// to
// s.SSSSSS (type: number)
export const srtToPlayer = (time) => {
  const regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
  const parts = regex.exec(time);

  if (parts === null) {
    return 0;
  }

  for (var i = 1; i < 5; i++) {
    parts[i] = parseInt(parts[i], 10);
    if (isNaN(parts[i])) parts[i] = 0;
  }

  // hours + minutes + seconds + ms
  return parts[1] * 3600 + parts[2] * 60 + parts[3] + parts[4] * 0.001;
};

// parse time data
// from
// s.SSSSSS (type: number)
// to
// HH.mm:ss,SSS (type: string)
export const playerToSrt = (time) => {
  const timeObj = playerToTimecode(time);
  for (var n in timeObj) {
    if (timeObj[n].toString().length < 2) {
      timeObj[n] = '0' + timeObj[n];
    }
  }
  if(timeObj.milliSecond.toString().length < 3) {
    timeObj.milliSecond = '0' + timeObj.milliSecond;
  }
  return (
    timeObj.hour.toString() + ':' +
    timeObj.minute.toString() + ':' +
    timeObj.second.toString() + ',' +
    timeObj.milliSecond.toString()
  );
};

// parse time data
// from
// s.SSSSSS (type: number)
// to
// { hour, minute, second, milliSecond } (type: object of number)
export const playerToTimecode = (time) => {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor(time % 3600 / 60);
  const second = Math.floor(time % 3600 % 60);
  const milliSecond = Math.round((time % 3600 % 60 - second) * 1000);

  return { hour, minute, second, milliSecond };
};
