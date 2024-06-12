import React, { useEffect, useMemo, useState } from 'react'
import { Container } from './styles';
import { Connection, PublicKey } from '@solana/web3.js';
import * as borsh from "@coral-xyz/borsh";

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
  const connection = useMemo(() => new Connection("http://127.0.0.1:8899", "recent"), []);
  const [accountData, set_accountData] = useState([]);

  useEffect(() => {
    handleProgram()
  }, [connection]);

  const handleProgram = async () => {
    const accounts: any = await connection.getProgramAccounts(programId);
    const data = accounts.map(({ pubkey, account }: any) => {
      const accountData = commentModel.decode(account.data);
      return {
        pubkey: pubkey.toBase58(),
        authority: accountData.authority.toBase58(),
        url: decodeUTF8Array(accountData.url),
        content: decodeUTF8Array(accountData.content),
        vote: Number(accountData.vote),
      };
    });
    set_accountData(data);
  }


  return (
    <Container>
      {/* <button onClick={handleProgram}>Click</button> */}
      {accountData.length > 0 && accountData.map((data, index) => (
        <div style={{ marginBottom: 12 }} key={index}>
          <p>Account: {data.pubkey}</p>
          <p>Authority: {data.authority}</p>
          <p>URL: {data.url}</p>
          <p>Content: {data.content}</p>
          <p>Vote: {data.vote}</p>
        </div>
      ))}
    </Container>
  )
}

export default App;