export function getHashParams() {
  const splittedHashParams = window.location.hash.replace('#', '').split('&');
  let object = {};
  for (const item of splittedHashParams) {
      const sep = item.split('=');
      Object.assign(object, Object.fromEntries([sep]));
  }
  return object;
}