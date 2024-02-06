import type { PiniaPluginContext } from 'pinia';

import store2 from 'store2';

/**
 * 数据持久化
 * @param {PiniaPluginContext} param0
 * @returns {}
 */
export function persistPlugin({ store, options }: PiniaPluginContext) {
  if (options.persist) {
    const isSessionStore =
      typeof options.persist === 'object' && options.persist?.session;
    store.$subscribe(
      () => {
        if (isSessionStore) {
          store2.session.set(store.$id, store.$state);
        } else {
          store2.set(store.$id, store.$state);
        }
      },
      { detached: true }
    );
    const state = isSessionStore ? store2.session.getAll() : store2.getAll();
    return {
      ...state[store.$id]
    };
  }
  return {
    ...store.$state
  };
}
