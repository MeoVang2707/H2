import * as storage from './StorageService';

export default function getToken() {
    return storage.getStorage('access_token');
}
