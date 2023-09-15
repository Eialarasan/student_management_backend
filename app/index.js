import express from 'express';
import ProcessRoutes from './ProcessRoutes';
import userRouters from './User/index'
import studentRouters from './Student/index'
import skillRouters from './Skill/index'

let userRouter = express.Router(ProcessRoutes);
if (userRouters && userRouters.length > 0) {
    userRouter = ProcessRoutes(userRouter, userRouters);
} else {
    console.error('There is no user route configured')
}

let studentRouter = express.Router(ProcessRoutes);
if (studentRouters && studentRouters.length > 0) {
    studentRouter = ProcessRoutes(studentRouter, studentRouters);
} else {
    console.error('There is no user route configured')
}

let skillRouter = express.Router(ProcessRoutes);
if (skillRouters && skillRouters.length > 0) {
    skillRouter = ProcessRoutes(skillRouter, skillRouters);
} else {
    console.error('There is no user route configured')
}

export {
    userRouter,studentRouter,skillRouter
}