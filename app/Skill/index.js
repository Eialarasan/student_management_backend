'use strict';

import { authendicateToken } from "../../Security/JwtAuth";
import { MediaType } from "../../config";
import Handler from "./Handler";

export default [
    
    {
        path: '/list',
        type: MediaType.GET,
        middleware: [authendicateToken],
        method: Handler.getSkillList,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.addSkill,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.updateSkill,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.deleteSkill,
        options: {}
    }

]