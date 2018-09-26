import {getWithoutAuth,postWithoutAuth} from './ApiInvoke';
import {ApiRouter} from './ApiRouter';


export function  getUser() {
    let id = "5b4dba39a4d43b1d38c8dcff";
    return getWithoutAuth(`${ApiRouter.getUser}/${id}`);
}
export function login(username,password){
    var value = {
        Email : username,
        Password : password
    }
    return postWithoutAuth(`${ApiRouter.LOGIN}`,value);
}