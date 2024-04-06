import { TOKEN_KEY } from "../utils/config.js";
import jwt from 'jsonwebtoken';

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_KEY,
            {},
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        )
    })
}