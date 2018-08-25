import parseMs from 'parse-ms';

export interface Options {
  timeSeparator?: string;
  millisecondSepartor?: string;
}

export default (
  ms: number,
  options: Options = { timeSeparator: ':', millisecondSepartor: '.' },
): string => {
  const { days, hours, minutes, seconds, milliseconds } = parseMs(ms);

  const fHours = (days * 24 + hours).toString().padStart(2, '0');
  const fMinutes = minutes.toString().padStart(2, '0');
  const fSeconds = seconds.toString().padStart(2, '0');
  const fMilliseconds = milliseconds.toString().padStart(3, '0');

  const formatted = `${fHours}${options.timeSeparator}${fMinutes}${
    options.timeSeparator
  }${fSeconds}${options.millisecondSepartor}${fMilliseconds}`;

  return formatted;
};
