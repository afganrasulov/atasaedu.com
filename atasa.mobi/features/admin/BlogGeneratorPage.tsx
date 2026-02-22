
import React from 'react';
import { Link } from 'react-router-dom';

export const BlogGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="text-center max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
        <h1 className="text-2xl font-bold mb-4">Servis Bakımda</h1>
        <p className="text-slate-600 mb-6">AI Blog oluşturucu servisi şu an için devre dışıdır.</p>
        <Link to="/" className="text-blue-600 font-bold">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
};
