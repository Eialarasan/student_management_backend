'use strict';

import { authendicateToken } from "../../Security/JwtAuth";
import { MediaType } from "../../config";
import Handler from "./Handler";

export default [
    {
        path: '/register',
        type: MediaType.POST,
        middleware:[],
        method:Handler.UserRegister,
        options: {}
    },
    {
        path: '/login',
        type: MediaType.POST,
        middleware: [],
        method: Handler.UserLogin,
        options: {}
    },
    {
        path: '/refreshtoken',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.RefreshToken,
        options: {}
    }
    
   
]