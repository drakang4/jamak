import { srtToPlayer, playerToSrt } from './timeParser';

/**
 * from SRT data to array of object
 * @param data
 * @returns {Array}
 */
export const fromSrt = (data) => {
  let srtData = data.replace(/\r/g, '');
  srtData = srtData.split(/\n\n/gm);

  srtData.pop();

  srtData.forEach((block, index) => {
    const regex = /(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/;
    const parsedBlock = block.split(regex);

    srtData[index] = {
      id: parseInt(parsedBlock[0], 10),
      startTime: srtToPlayer(parsedBlock[1]),
      endTime: srtToPlayer(parsedBlock[2]),
      subtitle: parsedBlock[3].trim(),
    };
  });

  return srtData;
};

/**
 * from array of object to SRT data
 * @param data
 * @returns {string}
 */
export const toSrt = (data) => {
  if (!(data instanceof Array)) return '';
  let res = '';

  data.forEach((block) => {
    res += `${block.id}\r\n`;
    res += `${playerToSrt(parseFloat(block.startTime))} --> ${playerToSrt(parseFloat(block.endTime))}\r\n`;
    res += `${block.subtitle.replace(/\n/g, '\r\n')}\r\n\r\n`;
  });

  return res;
};
