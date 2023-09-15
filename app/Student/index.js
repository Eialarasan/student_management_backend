'use strict';

import { authendicateToken } from "../../Security/JwtAuth";
import { MediaType } from "../../config";
import Handler from "./Handler";

export default [
    {
        path: '/add',
        type: MediaType.POST,
        middleware:[authendicateToken],
        method:Handler.addStudent,
        options: {}
    },
    {
        path: '/list',
        type: MediaType.GET,
        middleware: [authendicateToken],
        method: Handler.getStudentList,
        options: {}
    },
    
    {
        path: '/update',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.updateStudent,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.deleteStudent,
        options: {}
    }
    , {
        path: '/dashboard',
        type: MediaType.GET,
        middleware: [authendicateToken],
        method: Handler.getDashBoardDetails,
        options: {}
    },
    {
        path: '/skill/list',
        type: MediaType.GET,
        middleware: [authendicateToken],
        method: Handler.getSkillList,
        options: {}
    }
   
]