import { srtToPlayer, playerToSrt } from './timeParser.js';

// data: string
export const fromSrt = (data) => {
  let res = [];
  let regex = /(\d+\n\r|\d+\r|\d+\n)(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;

  data = data.replace(/\r/g, '');
  data = data.split(regex);
  data.shift();

  for (var i = 0; i < data.length; i += 4) {
    res.push({
      id: parseInt(data[i].trim()),
      startTime: srtToPlayer(data[i + 1].trim()),
      endTime: srtToPlayer(data[i + 2].trim()),
      subtitle: data[i + 3].trim()
    });
  }
  return res;
};

// data: array
export const toSrt = (data) => {
  if (!data instanceof Array) return '';
  let res = '';

  data.forEach((block) => {
    res += block.id + '\r\n';
    res += playerToSrt(parseFloat(block.startTime, 10)) + ' --> ' + playerToSrt(parseFloat(block.endTime, 10)) + '\r\n';
    res += block.subtitle.replace(/\n/g, '\r\n') + '\r\n\r\n';
  });

  return res;
};
