import { 
  RouterContext,
  helpers,  
} from "../deps.ts";

import { IUser, Users } from '../Models/User.ts';

export const getUsers = (context: RouterContext) => {
  const { request, response } = context;
  response.status = 200;
  response.body = {
    success: true,
    msg: "Metodo GET HTTP que actua sobre el recurso /users",
    data: Users,
  }
};

export const getUser = (context: RouterContext) => {
  const { params, response } = context;
  const user: IUser | undefined = Users.filter( (user: IUser) => 
    user.username === params.username
   )[0];
  const data: any = user? user: `No existe ${params.username}`;
  response.status = user ? 200 : 404;
  response.body = {
    success: true,
    msg: `Metodo GET HTTP que actua sobre el recurso /users/${params.username}`,
    data: data,
  }
};

export const postUser = async (context: RouterContext) => {
  const { request, response } = context;
  if ( !request.hasBody ) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No se enviaron datos en el cuerpo del mensaje",
    }
    return;
  }
  const result = await request.body({ type: "json" });
  const userBody = await result.value;
  Users.push(userBody);
  response.status = 201;
  response.body = {
    success: true,
    msg: `Metodo POST HTTP que actua sobre el recurso /users`,
    data: userBody,
  }

};

export const putUser = async (context: RouterContext) => {
  const { request, response } = context;
  const { username } = helpers.getQuery(context, { mergeParams: true });
  if ( !request.hasBody ) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No se enviaron datos en el cuerpo del mensaje",
    }
    return;
  }
  let user: IUser | undefined = Users.filter( (usr: IUser) => usr.username === username )[0];
  if (!user) {
    response.status = 404;
    response.body = {
      success: false,
      msg: `Metodo PUT HTTP que actua sobre el recurso /users/${username}`,
    }
    return;    
  }
  const result = await request.body({ type: "json" });
  const userBody: IUser = await result.value;
  user = { ...user, ...userBody };
  //Users = [ ...Users.filter( (usr: IUser)=> usr.username !== username), user ];
  const filteredUsers: Array<IUser> = Users.filter( (usr: IUser)=> usr.username !== username);
  Users.splice(0, Users.length);
  Users.push(...filteredUsers);
  Users.push(user)
  response.status = 200;
  response.body = {
    success: true,
    msg: `Metodo GET HTTP que actua sobre el recurso /users${username}`,
    data: userBody,
  }
};

export const deleteUser = (context: RouterContext) => {
  const { params, response } = context; 
  let user: IUser | undefined = Users.filter( (usr: IUser) => usr.username === params.username )[0];
  if (!user) {
    response.status = 404;
    response.body = {
      success: false,
      msg: `Metodo DELETE HTTP que actua sobre el recurso /users/${params.username}`,
    }
    return;    
  }  
  //Users = [ ...Users.filter( (usr: IUser)=> usr.username !== params.username) ];
  const filteredUsers: Array<IUser> = Users.filter( (usr: IUser)=> usr.username !== params.username);
  Users.splice(0, Users.length);
  Users.push(...filteredUsers);
  response.status = 200;
  response.body = {
    success: true,
    msg: `Metodo DELETE HTTP que actua sobre el recurso /users/${params.username}`,
  }
};

