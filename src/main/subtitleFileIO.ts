import util from 'util';
import fs from 'fs';
import Subtitle from 'subtitle-utils';
import shortid from 'shortid';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const readSubtitleFile = async (path: string) => {
  try {
    const rawData = await readFile(path);

    const { subtitles } = Subtitle.fromSRT(rawData.toString());

    const keyedSubtitles = subtitles.map(subtitle => ({
      ...subtitle,
      id: shortid.generate(),
    }));

    return keyedSubtitles;
  } catch (error) {
    throw error;
  }
};

export const writeSubtitleFile = async (
  path: string,
  data: Subtitle.ISubtitle[],
) => {
  try {
    const subtitle = new Subtitle(data);
    const stringified = subtitle.toSRT();

    writeFile(path, stringified);
  } catch (error) {
    throw error;
  }
};
