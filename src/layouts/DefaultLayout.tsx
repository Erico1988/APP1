import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <Header />
    <main className="ml-64 pt-16 p-6">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  </div>
);

export default DefaultLayout;
