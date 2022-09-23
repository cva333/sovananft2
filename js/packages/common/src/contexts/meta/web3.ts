import { AccountInfo, Connection } from '@solana/web3.js';
import { StringPublicKey } from '../../utils/ids';
import { AccountAndPubkey } from './types';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { RequestCardToRedeemArgs } from '../../actions';


export async function getProgramAccounts(
  connection: Connection,
  programId: StringPublicKey,
  configOrCommitment?: any,
): Promise<Array<AccountAndPubkey>> {
  const extra: any = {};
  let commitment;
  //let encoding;

  if (configOrCommitment) {
    if (typeof configOrCommitment === 'string') {
      commitment = configOrCommitment;
    } else {
      commitment = configOrCommitment.commitment;
      //encoding = configOrCommitment.encoding;

      if (configOrCommitment.dataSlice) {
        extra.dataSlice = configOrCommitment.dataSlice;
      }

      if (configOrCommitment.filters) {
        extra.filters = configOrCommitment.filters;
      }
    }
  }

  // const args = connection._buildArgs([programId], commitment, 'base64', extra);
  // const unsafeRes = await (connection as any)._rpcRequest(
  //   'getProgramAccounts',
  //   args,
  // );
  // console.log(unsafeRes.result)

  // AxiosRequestConfig config = new AxiosRequestConfig{
  //   method: axios.,
  //   url: 'https://api.metaplex.solana.com/',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   data: args
  // };
  // const modal: AxiosRequestConfig = {
  //   method: "POST"
  // };

  // await axios.post('http://0.0.0.0:3100/', args, modal)
  //   .then(res => {
  //     console.log(res)
  //   })

  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(args)
  // };
  // const response = await fetch('http://localhost:3100', requestOptions);
  // const data = await response.json();
  // console.log("🚀 ~ file: web3.ts ~ line 66 ~ data", data)




  // await axios(config)
  // .then(function (res) {
  //   response.end(JSON.stringify(res.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });


  return unsafeResAccounts(JSON.parse(items));
}

export function unsafeAccount(account: AccountInfo<[string, string]>) {
  return {
    // TODO: possible delay parsing could be added here
    data: Buffer.from(account.data[0], 'base64'),
    executable: account.executable,
    lamports: account.lamports,
    // TODO: maybe we can do it in lazy way? or just use string
    owner: account.owner,
  } as AccountInfo<Buffer>;
}

export function unsafeResAccounts(
  data: Array<{
    account: AccountInfo<[string, string]>;
    pubkey: string;
  }>,
) {
  return data.map(item => ({
    account: unsafeAccount(item.account),
    pubkey: item.pubkey,
  }));
}