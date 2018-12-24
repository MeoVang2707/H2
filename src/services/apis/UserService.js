import {getWithoutAuth,postWithoutAuth, getWithAuth, postWithAuth} from './ApiInvoke';
import {ApiRouter} from './ApiRouter';


export function  getUser() {
    let id = "5b4dba39a4d43b1d38c8dcff";
    return getWithoutAuth(`${ApiRouter.getUser}/${id}`);
}
export function login(username,password){
  let value = {
      Email : username,
      Password : password
  };
  return postWithoutAuth(`${ApiRouter.LOGIN}`,value);
}

export function getMyQuestion(){
  return getWithAuth(`${ApiRouter.MY_QUESTION}`);
}

export function getProfile(){
  return getWithAuth(`${ApiRouter.GET_PROFILE}`);
}

export function addQuestion(form){
  return postWithAuth(`${ApiRouter.ADD_QUESTION}`, form);
}

export function deleteQuestion(postId){
  let value = {
    PostId : postId,
  };
  return postWithAuth(`${ApiRouter.DELETE_QUESTION}`, value);
}

export function editQuestion(form){
  return postWithAuth(`${ApiRouter.EDIT_QUESTION}`, form);
}

export function addAnswer(form){
  return postWithAuth(`${ApiRouter.ADD_ANSWER}`, form);
}

export function deleteAnswer(answerID){
  let value = {
    AnswerId : answerID,
  };
  return postWithAuth(`${ApiRouter.DELETE_ANSWER}`, value);
}

export function editAnswer(form){
  return postWithAuth(`${ApiRouter.EDIT_ANSWER}`, form);
}

export function getQuestion(postId){
  let value = {
    PostId : postId,
  };
  return postWithAuth(`${ApiRouter.GET_QUESTION}`, value);
}

export function addComment(form){
  // let value = {
  //   Content : content,
  //   AnswerId : answerId
  // };
  return postWithAuth(`${ApiRouter.ADD_COMMENT}`, form);
}

export function deleteComment(commentID){
  let value = {
    CommentId : commentID,
  };
  return postWithAuth(`${ApiRouter.DELETE_COMMENT}`, value);
}

export function editComment(form){
  // let value = {
  //   CommentId : commentID,
  //   Content: content
  // };
  return postWithAuth(`${ApiRouter.EDIT_COMMENT}`, form);
}

export function voteAnswer(answerID){
  let value = {
    AnswerId: answerID,
  };
  return postWithAuth(`${ApiRouter.VOTE_ANSWER}`, value);
}

export function getListQuestion(index){
  let value = {
    Index: index,
  };
  return postWithAuth(`${ApiRouter.LIST_QUESTION}`, value);
}

export function getListQuestionByTheme(theme, index){
  let value = {
    Theme: theme,
    Index: index,
  };
  return postWithAuth(`${ApiRouter.LIST_QUESTION_BY_THEME}`, value);
}

export function viewQuestion(postId){
  let value = {
    PostId : postId,
  };
  return postWithAuth(`${ApiRouter.VIEW_QUESTION}`, value);
}

export function getTopQuestion(){
  return getWithAuth(`${ApiRouter.TOP_QUESTION}`);
}

export function getTopUser(){
  return getWithAuth(`${ApiRouter.TOP_HC}`);
}