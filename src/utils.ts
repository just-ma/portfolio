export const debounce = (func: Function, timeout: number = 700) => {
  let timeoutId: NodeJS.Timeout;

  return (...params: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...params);
    }, timeout);
  };
};

export const throttle = (func: Function, timeout: number = 700) => {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...params: any[]) => {
    if (timeoutId === undefined) {
      func(...params);

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
      }, timeout);
    }
  };
};

export function isLvhSupported() {
  return new RegExp(/(chrome|firefox|safari|opera)/i).test(navigator.userAgent);
}
