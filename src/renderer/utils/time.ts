export const getTimeRange = (
  start: number,
  end: number,
  full: number,
  duration: number,
) => {
  const startTime = duration * (start / full) * 1000;
  const endTime = duration * (end / full) * 1000;

  return { startTime, endTime };
};

export const dxToTime = (
  dx: number,
  width: number,
  zoomMultiple: number,
  duration: number,
) => (dx / (width * zoomMultiple)) * duration * 1000;

export const timeToDx = (
  base: number,
  target: number,
  width: number,
  zoomMultiple: number,
  duration: number,
) => ((target - base) / (duration * 1000)) * (width * zoomMultiple);
