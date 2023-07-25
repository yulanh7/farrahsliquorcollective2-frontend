import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableComponent from '../src/components/table';
import Layout from "../src/components/layout";
import { fetchUserData } from '../store/offerSlice';
import { RootState, useAppDispatch } from '../store';



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
  const dispatch = useAppDispatch();
  const { loading, data, error } = useSelector((state: RootState) => state.offer);
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  let sortedJustInOffers: OfferData[] = [];
  let sortedTopOffers: OfferData[] = [];
  let sortedFavoriteOffers: OfferData[] = [];
  if (data) {
    sortedJustInOffers = [...data].sort((a, b) => {
      return new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime();
    });

    sortedTopOffers = [...data].sort((a, b) => {
      return b.downloads - a.downloads;
    });

    sortedFavoriteOffers = [...data].sort((a, b) => {
      return b.likes - a.likes;
    });
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <Layout title="4BLOCK OFFER" logo="/images/4Block Logo_RGB_Colour.jpg">
      <h5>TOP OFFERS</h5>
      {sortedTopOffers.length > 0 ? (
        <TableComponent data={sortedTopOffers} itemsPerPage={6} />
      ) : (
        <div>Loading...</div>
      )}
      <h5>JUST IN {process.env.NEXT_PUBLIC_WEB_URL}</h5>

      {sortedJustInOffers.length > 0 ? (
        <TableComponent data={sortedJustInOffers} itemsPerPage={6} />
      ) : (
        <div>Loading...</div>
      )}
      <h5>FAVORITE</h5>

      {sortedFavoriteOffers.length > 0 ? (
        <TableComponent data={sortedFavoriteOffers} itemsPerPage={6} />
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default HomePage;
