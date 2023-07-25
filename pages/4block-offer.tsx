import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '../src/components/table';
import Layout from "../src/components/layout";



interface OfferData {
  id: number;
  business: string;
  offer: string;
  detail: string;
  optLink: string;
  createdTime: string;
  likes: number;
  downloads: number;
}

const HomePage: React.FC = () => {


  let sortedJustInOffers: OfferData[] = [];
  let sortedTopOffers: OfferData[] = [];
  let sortedFavoriteOffers: OfferData[] = [];


  return (
    <Layout title="4BLOCK OFFER" logo="/images/4Block Logo_RGB_Colour.jpg">

    </Layout>
  );
};

export default HomePage;
