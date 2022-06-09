import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { TokenRouter } from './route/token';

const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(bodyParser.json());


app.get('/', (req: any, res: any) => {
    res.send('Hello World!');
});
app.use('/token', TokenRouter);




app.listen(port, () => {
    console.log(`Administrator listening at http://localhost:${port}`);
});