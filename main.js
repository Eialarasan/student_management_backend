'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { studentRouter, userRouter,skillRouter } from './app';

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/student', studentRouter);
app.use('/api/skill', skillRouter);


export default app