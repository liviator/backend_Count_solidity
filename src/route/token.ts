import { get_token, create_token } from "../token";
import express from 'express';
let TokenRouter = express.Router();


TokenRouter.route('/create/:address').post(async(req,res) => {
    await create_token(req.params.address, res)
})

TokenRouter.route('/get/:address').get(async(req,res) => {
    await get_token(req.params.address, res)
})

export { TokenRouter };