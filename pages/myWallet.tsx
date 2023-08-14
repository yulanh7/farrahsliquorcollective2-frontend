import React from 'react';
import Layout from "../src/components/layout";
import WalletTable from '../src/components/walletTable';




const MyWallet = () => {

  return (
    <Layout title="My Wallet" logo="/images/logo.jpg" showFeedback>
      <WalletTable />
    </Layout>
  );
}


export default MyWallet;
