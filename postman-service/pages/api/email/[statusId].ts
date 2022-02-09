import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        console.log("emailsHandler GET query:", req.query);
        const { statusId } = req.query;
        return res.status(200).json({data: statusId});
    }
}

export default handler;