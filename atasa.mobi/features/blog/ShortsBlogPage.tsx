
import React, { useState, useEffect } from 'react';
import { 
  Clock, ArrowLeft, ArrowRight, Calendar, Loader2, 
  CheckCircle, Sparkles, Share2, Info, Bookmark, 
  HelpCircle, BookOpen, User, MessageCircle, 
  ChevronRight, FileText, Share, BookmarkCheck,
  LayoutList, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

const API_URL = 'https://atasa-blog-api-production-22a4.up.railway.app/api/posts';

const FALLBACK_POSTS = [
  {
    id: '1',
    title: 'Türkiye’de Uzun Dönem İkamet İzni Şartları (2025 Güncel)',
    slug: 'uzun-donem-ikamet-izni-sartlari-2025',
    date: '12 Mart 2025',
    category: 'İkamet İzni',
    readTime: '4 dk okuma',
    author: 'Ömer Habib',
    excerpt: '8 yıl kesintisiz ikamet eden yabancılar için süresiz oturum hakkı veren uzun dönem ikamet izni başvurularında dikkat edilmesi gerekenler...',
    content: `## Uzun Dönem İkamet İzni Nedir?
Uzun dönem ikamet izni, Türkiye'de yasal olarak kesintisiz 8 yıl yaşamış olan yabancılara verilen, süresiz geçerliliği olan bir izin türüdür. Bu hakka sahip olan yabancılar, Türk vatandaşlarının sahip olduğu birçok haktan (seçme-seçilme hariç) yararlanabilirler.

## Başvuru İçin Temel Şartlar
* **8 Yıllık Süre:** Türkiye'de kesintisiz 8 yıl ikamet etmiş olmak. (Öğrenci ikametlerinin yarısı hesaplanır).
* **Sosyal Yardım Almamış Olmak:** Son 3 yıl içinde devletten herhangi bir sosyal yardım almamış olmak.
* **Gelir Şartı:** Kendisinin ve varsa ailesinin geçimini sağlayacak yeterli ve düzenli gelir düzeyine sahip olmak.
* **Sağlık Sigortası:** Geçerli bir sağlık sigortasına sahip olmak.

## Neden Atasa ile Başvurmalısınız?
Dosyanızdaki 1 günlük eksik bile başvurunuzun reddine neden olabilir. Atasa uzmanları, gün sayımınızı resmi kayıtlara göre yaparak riskleri sıfıra indirir.`
  },
  {
    id: '2',
    title: 'Turist Vizesiyle Çalışmak: Sınır Dışı Edilme Riski!',
    slug: 'turist-vizesiyle-calisma-izni-alinir-mi',
    date: '10 Mart 2025',
    category: 'Çalışma İzni',
    readTime: '2 dk okuma',
    author: 'Atasa Danışmanlık',
    excerpt: 'Turist vizesiyle gelip "nasıl olsa çalışırım" diyenler dikkat! Yasal yolları ve sınır dışı edilme risklerini sizin için detaylandırdık.',
    content: `## Turist Vizesi Çalışma Hakkı Verir mi?
Turist vizesi veya e-vize, size sadece Türkiye'de **gezme ve konaklama** hakkı verir. Bu vize türüyle herhangi bir işyerinde sigortalı veya sigortasız çalışmanız **kesinlikle yasaktır.**

## Cezai Müeyyideler
* **Para Cezası:** Hem işverene hem de yabancıya yüksek miktarda idari para cezası kesilir.
* **Deport (Sınır Dışı):** Kaçak çalıştığı tespit edilen yabancı hakkında sınır dışı kararı alınır ve giriş yasağı konur.

Yasal yollarla çalışma izni almak için Atasa uzmanlarından destek alabilirsiniz.`
  }
];

export const ShortsBlogPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setPosts(data && data.length > 0 ? data : FALLBACK_POSTS);
      } catch (err) {
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // SEO & JSON-LD Logic
  useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost.title} - Atasa Danışmanlık Blog`;
      
      // Add JSON-LD Structured Data for Google SEO
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedPost.title,
        "description": selectedPost.excerpt,
        "author": {
          "@type": "Organization",
          "name": "Atasa Danışmanlık"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Atasa Danışmanlık",
          "logo": {
            "@type": "ImageObject",
            "url": "https://atasa-logo-production.up.railway.app/logo.png"
          }
        },
        "datePublished": "2025-03-12" // Dinamik hale getirilmeli
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [selectedPost]);

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderContent = (content: string) => {
    if (!content) return null;
    const processed = content
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '\n* $1\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n');

    const lines = processed.split('\n').filter(line => line.trim() !== '');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl md:text-3xl font-black text-slate-900 mt-12 mb-6 leading-tight flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-xl font-bold text-slate-800 mt-8 mb-4">{trimmedLine.replace('### ', '')}</h3>);
      } else if (trimmedLine.startsWith('* ')) {
        currentList.push(
          <li key={index} className="flex items-start gap-3 mb-3 text-slate-700 leading-relaxed">
            <CheckCircle size={18} className="text-emerald-500 mt-1 shrink-0" />
            <span>{renderFormattedText(trimmedLine.replace('* ', ''))}</span>
          </li>
        );
        if (!lines[index + 1] || !lines[index + 1].trim().startsWith('* ')) {
          elements.push(<ul key={`list-${index}`} className="bg-slate-50 p-6 md:p-8 rounded-3xl my-8 border border-slate-100 shadow-sm">{currentList}</ul>);
          currentList = [];
        }
      } else {
        elements.push(<p key={index} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 font-normal">{renderFormattedText(trimmedLine)}</p>);
      }
    });
    return elements;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Haberler Hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-32 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-5xl">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.div 
              key="detail" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <button 
                onClick={() => setSelectedPost(null)} 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-8 group transition-colors"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                LİSTEYE GERİ DÖN
              </button>
              
              <article className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden">
                {/* Blog Header */}
                <header className="bg-slate-900 p-8 md:p-16 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                       <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                         {selectedPost.category}
                       </span>
                       <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                       <time className="text-xs font-bold text-slate-400">{selectedPost.date}</time>
                    </div>
                    
                    <h1 className="text-3xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                      {selectedPost.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">
                             {selectedPost.author?.charAt(0) || 'A'}
                          </div>
                          <span className="text-sm font-bold text-slate-300">{selectedPost.author || 'Atasa Danışmanlık'}</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Clock size={16} />
                          <span>{selectedPost.readTime}</span>
                       </div>
                    </div>
                  </div>
                </header>

                {/* AI & Google SEO Summary Box */}
                <aside className="m-8 md:mx-16 md:mt-12 p-6 md:p-8 bg-blue-50 rounded-3xl border border-blue-100 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles size={48} className="text-blue-600" />
                  </div>
                  <h4 className="text-blue-800 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Info size={16} /> Editörün Özeti (AI SEO)
                  </h4>
                  <p className="text-blue-900 text-lg font-medium leading-relaxed italic">
                    "{selectedPost.excerpt}"
                  </p>
                </aside>

                {/* Blog Body */}
                <div className="p-8 md:p-16 pt-4 max-w-4xl mx-auto">
                  <div className="content-area">
                    {renderContent(selectedPost.content)}
                  </div>
                  
                  {/* Share & Support */}
                  <footer className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                       <h4 className="text-xl font-bold text-slate-900 mb-1">Bu makale faydalı oldu mu?</h4>
                       <p className="text-slate-500 text-sm">Resmi süreçleriniz için profesyonel destek alabilirsiniz.</p>
                    </div>
                    <div className="flex gap-3">
                       <button onClick={() => window.print()} className="p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                          <FileText size={20} />
                       </button>
                       <Link 
                        to="/appointment" 
                        className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                       >
                         RANDEVU ALIN
                       </Link>
                    </div>
                  </footer>
                </div>
              </article>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <header className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                   <Zap size={14} className="fill-current" /> GÜNCEL MEVZUAT & REHBERLER
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
                  Atasa Haber
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">Türkiye'deki yabancılar için yasal süreçler, güncel yönetmelikler ve en yeni haberler.</p>
              </header>

              <div className="grid gap-6">
                {posts.map((post) => (
                  <article 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)} 
                    className="group bg-white rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl border border-slate-100 transition-all cursor-pointer flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Visual Date Indicator */}
                    <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                       <span className="text-3xl font-black leading-none">{post.date?.split(' ')[0]}</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">{post.date?.split(' ')[1]}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                         <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded-md">
                           {post.category}
                         </span>
                         <span className="text-xs font-bold text-slate-400 md:hidden">{post.date}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-500 text-lg leading-relaxed line-clamp-2 mb-6">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-4 transition-all">
                        MAKALE DETAYI <ArrowRight size={18} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Newsletter / Contact Teaser */}
              <div className="mt-20 p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-white/5 shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10"></div>
                 <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black mb-2">Güncel Bilgi İstiyorum</h3>
                    <p className="text-slate-400 font-medium max-w-md">Yasal değişikliklerden anında haberdar olmak için WhatsApp hattımıza katılabilirsiniz.</p>
                 </div>
                 <button onClick={openWhatsApp} className="relative z-10 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2">
                    <MessageCircle size={24} /> BİZE YAZIN
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
