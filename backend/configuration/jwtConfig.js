import {createHmac} from 'node:crypto'

export const secret = "ilovecryptoasddsalkjjklhfghfg";
const hash = createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');
console.log(hash);

export default hash;