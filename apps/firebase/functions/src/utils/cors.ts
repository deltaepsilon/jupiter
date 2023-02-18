import { Response, https } from 'firebase-functions';

type Handler = (req: https.Request, resp: Response<any>) => void | Promise<void>;

export function cors(handler: Handler) {
  return function (req: https.Request, res: Response) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
    } else {
      handler(req, res);
    }
  };
}
