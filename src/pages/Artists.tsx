
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ArtistGrid from '@/components/Artists/ArtistGrid';

const Artists = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#7a42ff] via-[#f2c300] to-[#ff69b4] bg-clip-text text-transparent">
          Invitad@s
        </h1>
        <ArtistGrid />
      </div>
    </Layout>
  );
};

export default Artists;
