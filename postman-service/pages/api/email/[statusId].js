import { EMAILS } from "../email";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log("emailsHandler GET query:", req.query);
        const { statusId } = req.query;
        const desiredEmail = EMAILS.find( item => item.id === statusId );
        return res.status(200).json({data: desiredEmail});
    }
  }