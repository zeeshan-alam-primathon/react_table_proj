export default function debounce(func, timeout = 300) {
  let timer;
  console.log(timer, "before");
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log("hello debounce called");
      func.apply(this, args);
    }, timeout);
    console.log(timer);
  };
}
