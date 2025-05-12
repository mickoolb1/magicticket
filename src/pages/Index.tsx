import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import Testimonials from '@/components/Home/Testimonials';
import CTASection from '@/components/Home/CTASection';

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-magic-dark via-[#2c1e50] to-[#1a0f2e] relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237a42ff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        <div className="relative">
          <Hero />
          <Testimonials />
          <CTASection />
          <Features />
        </div>
      </div>
    </Layout>
  );
};

export default Index;