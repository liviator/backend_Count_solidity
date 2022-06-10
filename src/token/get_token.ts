import { toBuffer } from 'ethereumjs-util';
import * as sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database.sqlite');


/**
 * It takes in an address and an express response object, and then it queries the database for the token
 * associated with that address. If it finds a token, it sends it back in the response object. If it
 * doesn't find a token, it sends back an error message, indicating that the address is not whitelisted
 * @param {string} address - The address of the user you want to get the token for
 * @param {any} res - The response object
 */
export const get_token = async function main(address:string, res:any) {
    try{
        db.get("SELECT * FROM TOKEN WHERE address = ?", address, function(err:any, resp:any) {
            try {
                if(resp !== undefined && resp !== null) {
                    res.status(200).send({token: JSON.parse(resp.token)});
                }
                else {
                    res.status(404).send({error:"User not whitelisted"})
                }
            } catch(err:any) {
                throw Error(err)
            }
        })
    } catch(e:any) {
        throw Error(e)
    }
}


