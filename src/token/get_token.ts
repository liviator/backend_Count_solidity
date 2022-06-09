import { toBuffer } from 'ethereumjs-util';
import * as sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database.sqlite');


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

//contract adress : 0x13A6DAadFABE9295eC96da1c626FB672C50F7a04
