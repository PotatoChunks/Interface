import { NowRequest, NowResponse } from '@vercel/node';
module.exports = async (NowRequest, NowResponse) => {
    var data = {
        msg: "hello world!"
    }
    NowResponse.status(200).json(data);
}