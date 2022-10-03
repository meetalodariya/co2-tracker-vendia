export function debounce(cb: (...args: any) => void, delay = 1000) {
  let timeout: any;
//   console.log('i am being called');
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
    //   console.log('i am being called in timeout');
      cb(...args);
    }, delay);
  };
}
