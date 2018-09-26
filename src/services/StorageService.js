import store from 'store';

const NAME_SPACE = 'hoidap.vn.';
export function getStorage(key) {
  const realKey = NAME_SPACE + key;

  return store.get(realKey);
};

export function set(key, data) {
  const realKey = NAME_SPACE + key;

  return store.set(realKey, data);
};

export function clear(key){
  const realKey = NAME_SPACE + key;

  return store.remove(realKey);
};

export function clearAll() {
  store.clearAll();
};
