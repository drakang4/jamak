export const unfocus = (window: Window) => {
  window.getSelection().removeAllRanges();
};
