import React, { useEffect, useMemo, useState } from 'react'
import { Container } from './styles';
import { Connection, PublicKey } from '@solana/web3.js';
import * as borsh from "@coral-xyz/borsh";
import bs58 from "bs58";
import momment from "moment";
import Comment from '@components/Comment';

const programId: any = new PublicKey("wNSuywSzp36Q3TgeaCJnBjie1pMpHPbxAzkkvvUKnaX");

const decodeUTF8Array = (data: any) => {
  return new TextDecoder('utf-8').decode(new Uint8Array(data));
};

const commentModel = borsh.struct([
  borsh.publicKey('authority'),
  borsh.i8('vote'),
  borsh.array(borsh.u8(), 64, 'url'),
  borsh.array(borsh.u8(), 512, 'content'),
])

const App = () => {
  const connection = useMemo(() => new Connection("http://127.0.0.1:8899", "confirmed"), []);
  const [accountData, set_accountData] = useState([]);

  useEffect(() => {
    console.log("현재 페이지의 URL:", window.location.href);
    handleProgram()
  }, [connection]);

  const handleProgram = async () => {
    const paredUrl = new URL(window.location.href);
    const accounts: any = await connection.getProgramAccounts(
      programId,
      {
        filters: [
          {
            memcmp: {
              offset: 41,
              bytes: bs58.encode(Buffer.from(String(paredUrl.hostname + paredUrl.pathname)))
            }
          }
        ]
      }
    );
    console.log(accounts);
    const data = accounts.map(async ({ pubkey, account }: any) => {
      const accountData = commentModel.decode(account.data);
      const key = new PublicKey(pubkey)
      const signatures = await connection.getSignaturesForAddress(key);

      const timestamp = signatures.length > 0 && signatures[0].blockTime
        ? momment.unix(signatures[0].blockTime).format("YYYY-MM-DD HH:mm:ss")
        : null;
      return {
        pubkey: pubkey.toBase58(),
        authority: accountData.authority.toBase58(),
        url: decodeUTF8Array(accountData.url),
        content: decodeUTF8Array(accountData.content),
        vote: Number(accountData.vote),
        timestamp: timestamp,
      };
    });
    const result = await Promise.all(data);
    set_accountData(result);
  }


  return (
    <Container>
      {accountData.length > 0 ? (
        accountData.map((data, index) => (
          <Comment key={index} author={data.authority} content={data.content} vote={data.vote} publicKey={data.pubkey} timestamp={data.timestamp} />
        ))
      ) : (
        <p>There are no comments</p>
      )}
    </Container>
  )
}

export default App;