export default function once(callback) {
  let called = false;
  return function wrapper() {
    if (called) return;
    called = true;
    // biome-ignore lint/style/noArguments: <explanation>
    return callback.apply(null, arguments);
  };
}
