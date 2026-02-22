import React from 'react';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { SERVICES, BLOG_POSTS, COMPANY_INFO } from '../constants';
import * as Icons from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Placeholder for Hero Image */}
           <img 
            src="https://picsum.photos/1920/1080?grayscale" 
            alt="Istanbul Skyline" 
            className="w-full h-full object-cover"
           />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Türkiye'de <span className="text-blue-400">Güvenli ve Hızlı</span> Çözüm Ortağınız!
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 font-light">
              Yabancılara yönelik ikamet ve çalışma izni danışmanlığında uzman kadromuzla yanınızdayız. 2025 yılı güncel prosedürlerine hakim ekibimizle işlemlerinizi hızlandırın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2">
                Hemen Başvur <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all">
                Hizmetlerimiz
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Stat Card */}
        <div className="hidden md:block absolute bottom-12 right-12 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white max-w-xs">
          <div className="flex items-center gap-2 mb-2">
             <Star className="text-yellow-400 fill-current" />
             <span className="font-bold text-xl">Uzman Ekip</span>
          </div>
          <p className="text-sm text-slate-200">
             {COMPANY_INFO.founder} liderliğinde profesyonel danışmanlık hizmetleri.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Tam Kapsamlı Danışmanlık Hizmetleri</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => {
              // Dynamic Icon Rendering
              const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;
              
              return (
                <div key={service.id} className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100 group">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <a href="#" className="text-blue-600 font-semibold flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                    Daha Fazla <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="https://picsum.photos/600/600?random=10" 
                alt="Why Us" 
                className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full md:w-1/2">
               <h2 className="text-blue-400 font-semibold tracking-wide uppercase mb-2">Neden Atasa?</h2>
               <h3 className="text-3xl md:text-4xl font-bold mb-6">Sizi Seçmemiz İçin Birçok Neden Var</h3>
               <p className="text-slate-400 mb-8">Atasa Danışmanlık olarak ikamet ve çalışma izinleri konusunda geniş deneyime sahip profesyonel bir ekibimiz var. Süreci sizin adınıza kolaylaştırıyoruz.</p>
               
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      <CheckCircle />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Uzmanlık ve Deneyim</h4>
                      <p className="text-slate-400 text-sm">Sektördeki yılların verdiği tecrübe ile en karmaşık dosyaları bile çözüme kavuşturuyoruz.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      <Icons.Clock />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Hızlı ve Etkili</h4>
                      <p className="text-slate-400 text-sm">Başvurularınızı yasal sürelere uygun olarak en kısa sürede sonuçlandırıyoruz.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      <Icons.UserCheck />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Kişiselleştirilmiş Destek</h4>
                      <p className="text-slate-400 text-sm">Her müşterimize özel çözümler sunarak ihtiyaçlarınıza uygun danışmanlık sağlıyoruz.</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Blog ve Haberler</h2>
              <p className="text-slate-600">Yasal düzenlemeler ve güncel bilgiler.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              Tüm Yazılar <ArrowRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="text-blue-600 text-sm font-semibold mb-2">{post.date}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {post.summary}
                </p>
                <span className="text-slate-900 font-medium text-sm border-b-2 border-slate-200 pb-1 group-hover:border-blue-600 transition-colors">
                  Devamını Oku
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <button className="text-blue-600 font-bold">Tüm Yazıları Gör</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Profesyonel Başvuru İçin Danışmanlık Alın</h2>
          <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
            Belgeler, başvuru süreci veya değerlendirme şartlarıyla ilgili danışmanlık almak ister misiniz? Hemen bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
              Online Randevu Al
            </button>
            <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
              <Icons.MessageCircle size={20} /> WhatsApp'tan Yaz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};