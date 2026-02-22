
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Globe, 
  ExternalLink, 
  Users, 
  Star, 
  GraduationCap, 
  Ship, 
  Zap, 
  ShoppingBag, 
  Utensils, 
  Car, 
  Stethoscope, 
  Landmark, 
  Plane, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Quote, 
  Heart, 
  Music, 
  Camera, 
  Tv,
  BadgeCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReferenceItem {
  name: string;
  sector: string;
  type: string;
  description: string;
  website?: string;
  logo: string;
  acronym?: string;
}

const REFERENCES_DATA: ReferenceItem[] = [
  { name: "NAMA Yapı & İnşaat", sector: "İnşaat", type: "Corporate", description: "İnşaat, mühendislik, mimarlık, toplu konut üretimi", website: "namayapi.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262210-748462668.png" },
  { name: "Altınpamuk Tekstil", sector: "Tekstil", type: "Corporate", description: "Tekstil fabrikası, %100 doğal pamuk ürünleri, perde, minder", website: "altinpamuk.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262190-579011951.png" },
  { name: "Ar-Ge Prefabrik", sector: "İnşaat", type: "Corporate", description: "Prefabrik betonarme yapı elemanları üretimi", website: "argeprefabrik.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262183-751061879.png" },
  { name: "TEO Yapı & Mimarlık", sector: "Mimarlık", type: "Corporate", description: "Mimarlık, yapı tasarımı, imar barışı danışmanlığı", website: "teoyapi.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262172-112066654.png" },
  { name: "Adetaş Yapı Market", sector: "İnşaat", type: "Corporate", description: "Yapı kimyasalları, yalıtım malzemeleri, ses yalıtımı", website: "adetasapi.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262167-450606002.png" },
  { name: "BNB İnşaat", sector: "İnşaat", type: "Corporate", description: "İnşaat, madencilik", website: "bnbinsaat.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262114-332273875.png" },
  { name: "İyiokur Metal", sector: "Metal", type: "Corporate", description: "Metal döküm, pirinç çubuk üretimi (1955'ten beri)", website: "iyiokurmetal.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262090-226933314.png" },
  { name: "Özgül Yapı Malzemeleri", sector: "İnşaat", type: "Corporate", description: "Boya, yapı malzemeleri, parke taşı, bordür taşı üretimi", website: "ozgulyapi.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262078-152287494.png" },
  { name: "Saltanat Gıda Makinaları", sector: "Gıda", type: "Corporate", description: "Baklava, yufka, börek üretim hatları, fırın ekipmanları", website: "saltanatmakina.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262071-504688047.png" },
  { name: "Nüans Group", sector: "Gayrimenkul", type: "Corporate", description: "Gayrimenkul ve emlak danışmanlığı", website: "nuansgayrimenkul.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262058-749689102.png" },
  { name: "Arnes Mekanik Makina", sector: "Makina", type: "Corporate", description: "Hidrolik ekipman, sızdırmazlık elemanları üretimi", website: "arnes.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262040-58399250.png" },
  { name: "CIAR Medical", sector: "Sağlık", type: "Corporate", description: "Sağlık turizmi ve danışmanlık", website: "ciarmedical.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262027-691910070.png" },
  { name: "Maxx", sector: "Yatırım", type: "Corporate", description: "Yatırım, distribütörlük (Vodafone, Samsung, Siemens)", website: "maxxyatirim.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262019-836473486.png" },
  { name: "Şişmanoğlu Tekstil", sector: "Tekstil", type: "Corporate", description: "Dar dokuma imalatı, yatak fitili, kanepe şeridi", website: "sismanoglutekstil.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261988-244933493.png" },
  { name: "Twins Company", sector: "Holding", type: "Corporate", description: "İnşaat, lojistik, ithalat‑ihracat holding", website: "twinsco.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261942-771582326.png" },
  { name: "Bayraktar Ambalaj", sector: "Ambalaj", type: "Corporate", description: "Karton matbaa, ambalaj malzemeleri", website: "bayraktarambalaj.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261923-955212227.png" },
  { name: "Cengiz Holding", sector: "Holding", type: "Corporate", description: "Holding (alüminyum, bakır, madencilik, inşaat, enerji)", website: "cengizholding.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261896-326901415.png" },
  { name: "USCO Endüstriyel Çözümler", sector: "Ambalaj", type: "Corporate", description: "Endüstriyel yapıştırıcılar, ambalaj çözümleri", website: "uscotltd.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261879-322599022.png" },
  { name: "Techno Tool Kalıp", sector: "Metal", type: "Corporate", description: "Alüminyum ekstrüzyon kalıp imalatı", website: "technokalip.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261879-832849862.png" },
  { name: "TOR Industry", sector: "Makina", type: "Corporate", description: "Metal işleme, endüstriyel makine imalatı", website: "torindustry.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261868-232213843.png" },
  { name: "Gusto", sector: "Moda", type: "Corporate", description: "Online giyim mağazası / Web tasarım", website: "gustoeshop.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261860-914961073.png" },
  { name: "N’Fess Peyzaj", sector: "Peyzaj", type: "Corporate", description: "Peyzaj tasarım, bahçe bakımı", website: "instagram.com/nfesspeyzaj", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261830-205100406.png" },
  { name: "YK Kablo", sector: "Elektrik", type: "Corporate", description: "Elektrik malzemeleri ve kablo satışı", website: "", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261818-100530903.png" },
  { name: "Seven Süt Çiftliği", sector: "Tarım", type: "Corporate", description: "Süt hayvancılığı, tarım ürünleri", website: "instagram.com/sevensutciftligi", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261789-770922514.png" },
  { name: "Dolunay Tekstil", sector: "Tekstil", type: "Corporate", description: "Tekstil fabrikası, dış giyim", website: "instagram.com/dolunay.mobilya", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261754-537045318.png" },
  { name: "Nef Teknik", sector: "HVAC", type: "Corporate", description: "HVAC ekipmanları, havalandırma menfezi üretimi", website: "nefteknik.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261668-625980626.png" },
  { name: "Pcderslerim", sector: "Eğitim", type: "Corporate", description: "Afgan Rasulov YouTube kanalı, 300 bin takipçi", website: "rasulov.net", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852261907-516511860.png" },
  { name: "Bakır Uluslararası Nakliyat", sector: "Lojistik", type: "Corporate", description: "Uluslararası nakliyat, lojistik", website: "bakiruluslararasinakliyat.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919567168-795362619.png" },
  { name: "Big Denim Tekstil", sector: "Tekstil", type: "Corporate", description: "Tekstil (Denim yıkama)", website: "bigesdenim.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919567166-77035413.png" },
  { name: "EG Ambalaj Limited", sector: "Ambalaj", type: "Corporate", description: "Ambalaj üretimi (PP-PE-PET, etiket imalatı)", website: "egambalaj.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919567026-887454868.png" },
  { name: "Marco Plas Ambalaj", sector: "Ambalaj", type: "Corporate", description: "Ambalaj ve Plastik (Poşet, çöp torbası, çanta)", website: "marcoplas.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919567025-63619381.png" },
  { name: "USCE Endüstriyel Ltd.", sector: "Sanayi", type: "Corporate", description: "Makina, dış ticaret, endüstriyel yapıştırıcılar", website: "uscoltd.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566714-947011863.png" },
  { name: "Ada Tıbbi Cihazlar", sector: "Sağlık", type: "Corporate", description: "Tıbbi cihazlar ve malzeme, sağlık sektörü", website: "adatibbimalzeme.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566712-932093444.png" },
  { name: "Pergola Gıda İnşaat", sector: "İnşaat", type: "Corporate", description: "Gıda, İnşaat, Turizm (Toprak ürünleri)", website: "pergola.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566575-336705140.png" },
  { name: "Alarga Restaurant", sector: "Restoran", type: "Corporate", description: "Gıda, Restaurant (Deniz ürünleri restoranı)", website: "instagram.com/alargarestaurantedirne", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566501-238091210.jpg" },
  { name: "Ceslas Lastik Otomotiv", sector: "Otomotiv", type: "Corporate", description: "Otomotiv, lastik servisi, egzoz emisyon ölçümü", website: "instagram.com/cesslas", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566325-17463615.jpg" },
  { name: "Mustafa Ekmekci İnşaat", sector: "İnşaat", type: "Corporate", description: "İnşaat, Mühendislik (plan, proje, müteahhitlik)", website: "instagram.com/mstfkmkc", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566180-924937382.jpg" },
  { name: "BVR Otelcilik Limited", sector: "Turizm", type: "Corporate", description: "Otelcilik, konaklama (Baver Hotel)", website: "bvrgroupasia.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566112-514775513.webp" },
  { name: "Burgaz Mobilya Dekarasyon", sector: "Mobilya", type: "Corporate", description: "Mobilya imalatı (Amerikan çelik kapı, melamin kapı, mutfak)", website: "melamin-kapi.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919566112-443372728.png" },
  { name: "Saltart Makina ve Dış Ticaret", sector: "Makina", type: "Corporate", description: "Otomasyon ve özel makine üretim ve satışı", website: "saltanatmakina.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919564136-56664808.png" },
  { name: "Saree İnşaat Taahhüt", sector: "İnşaat", type: "Corporate", description: "İnşaat, Otomotiv, Kafeterya, Gıda", website: "firmarehberi.tv.tr/saree-insaat", logo: "", acronym: "SAR" },
  { name: "Mirat Gıda Ticaret", sector: "Gıda", type: "Corporate", description: "Gıda üretimi ve ticaret", website: "miragida.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919564136-490598283.webp" },
  { name: "Sıcak Balık Dünyası Gıda", sector: "Gıda", type: "Corporate", description: "Gıda, Restaurant (Balık ürünleri)", website: "find.com.tr/sicak-balik", logo: "", acronym: "SBD" },
  { name: "Mubdi Group Gayrimenkul", sector: "Gayrimenkul", type: "Corporate", description: "Gayrimenkul, Medya Basın ve Yayıncılık", website: "instagram.com/murad.bashkir", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919564129-685672608.jpg" },
  { name: "Asia Gemi Mobilya Sanayi", sector: "Mobilya", type: "Corporate", description: "Mobilya sanayi", website: "find.com.tr/asiagemimobilyasanayiveticaretlimitedsirketi", logo: "", acronym: "AGM" },
  { name: "Tekya Teknolojik Yapı A.Ş.", sector: "İnşaat", type: "Corporate", description: "nşaat ve Yapı Dekorasyon (Civil engineering)", website: "tekyapias.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919564052-488192200.png" },
  { name: "NP İz Yapı İç Mimarlık", sector: "Mimarlık", type: "Corporate", description: "Mimarlık, İnşaat, İzolasyon, Tekstil Duvar Kaplamaları", website: "nishplas.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919564047-420163624.png" },
  { name: "Cengiz Tuğrul Karalı Otel", sector: "Turizm", type: "Corporate", description: "Turizm ve Seyahat, Otel İşletmeciliği (Best Alanya Otel)", website: "find.com.tr/cengiz-tugrul", logo: "", acronym: "CTK" },
  { name: "Arnes Ambalaj Ltd. Şti", sector: "Ambalaj", type: "Corporate", description: "Ambalaj üretimi (kağıt bardak, kahve bardağı, geri dönüşüm)", website: "arnespack.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766852262040-58399250.png" },
  { name: "Seven Hayvancılık Ltd. Şti", sector: "Hayvancılık", type: "Corporate", description: "Hayvancılık ve Tarım Ürünleri (Süt hayvancılığı)", website: "seventarim.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919563893-452293806.jpg" },
  { name: "Nüans STS Medya ve Reklam", sector: "Medya", type: "Corporate", description: "Medya, Reklam, Gayrimenkul Danışmanlığı", website: "nuansgayrimenkul.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919563887-319640976.png" },
  { name: "Maxx Tasarım Dekorasyon", sector: "Tasarım", type: "Corporate", description: "Tasarım, Dekorasyon, Mobilya (Marangoz)", website: "maxxmobilya.com", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919563718-322193067.png" },
  { name: "TOR Metal Sanayi ve Ticaret", sector: "Metal", type: "Corporate", description: "Metal Sanayi, Çelik Konstrüksiyon (Damper, Dorse)", website: "tormetal.com.tr", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919563718-855249083.jpg" },
  { name: "Demet Akalın", sector: "Sanat", type: "VIP", description: "Türk şarkıcı, oyuncu, sunucu ve eski mankendir. Türk pop müziğinin en tanınan isimlerinden biri.", website: "instagram.com/demetakalin", logo: "http://upload-service-production-dd42.up.railway.app/files/1766919563352-874766814.jpg" },
  { name: "S. Akın Akınözü", sector: "Sanat", type: "VIP", description: "Türk oyuncu. Hercai, Kaderimin Oyunu gibi dizilerle uluslararası başarı yakalamış aktör.", website: "instagram.com/akinakinozu", logo: "http://upload-service-production-dd42.up.railway.app/files/1766920101899-174551240.jpg" },
  { name: "Erkin Ergin", sector: "Sanat", type: "VIP", description: "Azerbaycanlı stand-up komedyeni ve içerik üreticisi.", website: "instagram.com/erkin.ergin", logo: "http://upload-service-production-dd42.up.railway.app/files/1766920101674-36062219.jpg" }
];

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'VIP', label: 'Sanat Dünyası' },
  { id: 'Corporate', label: 'Kurumsal Ortaklar' },
];

const ReferenceCard: React.FC<{ item: typeof REFERENCES_DATA[0]; index: number }> = ({ item, index }) => {
  const isIndividual = item.type === "VIP";

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.8), type: "spring", stiffness: 100 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2.5rem] p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden relative"
    >
      <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <ArrowRight size={18} />
         </div>
      </div>

      <div className={`
        relative overflow-hidden rounded-[2rem] mb-6 transition-all duration-700
        ${isIndividual 
           ? 'aspect-[3/4.2] shadow-2xl ring-1 ring-slate-100' 
           : 'h-48 bg-slate-50 flex items-center justify-center p-4 group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100'
        }
      `}>
        {item.acronym ? (
          <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-inner">
             <span className="text-4xl md:text-5xl font-black tracking-tighter drop-shadow-md select-none">{item.acronym}</span>
          </div>
        ) : (
          <img 
            src={item.logo}
            alt={`${item.name}`} 
            className={`
              w-full h-full transition-all duration-1000 ease-out
              ${isIndividual 
                 ? 'object-cover group-hover:scale-110' 
                 : 'object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105'
              }
            `} 
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !item.acronym) {
                const iconDiv = document.createElement('div');
                iconDiv.className = "w-full h-full flex items-center justify-center bg-slate-100 text-slate-300";
                iconDiv.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';
                parent.appendChild(iconDiv);
              }
            }}
          />
        )}
        
        {isIndividual && (
           <>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                   Özel Referans
                </span>
            </div>
           </>
        )}
      </div>

      <div className="flex-1 flex flex-col px-4 pb-4">
        <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50">
              {item.sector}
            </span>
            {item.type === 'VIP' && <Star size={14} className="text-amber-400 fill-current" />}
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors tracking-tighter">
            {item.name}
        </h3>
        
        <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
            {item.description}
        </p>
        
        {item.website && (
            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <a 
                    href={item.website.includes('instagram.com') ? `https://${item.website}` : (item.website.startsWith('http') ? item.website : `https://${item.website}`)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-widest group/link"
                >
                    <Globe size={14} className="group-hover/link:rotate-12 transition-transform" /> 
                    <span>Dijital Varlık</span>
                    <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-all" />
                </a>
                
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                   <Building2 size={16} />
                </div>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export const ReferencesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? REFERENCES_DATA 
    : REFERENCES_DATA.filter(item => item.type === filter);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#F8FAFC]">
      
      {/* 1. Ultra Premium Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-[#0f172a] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-10 backdrop-blur-sm"
            >
              <Award size={16} className="animate-pulse" />
              Elite Partnership & Global Trust
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tighter"
            >
              Gurur Duyduğumuz <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-200">
                Partnerlerimiz
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              Türkiye'nin lider kurumlarından sanat dünyasının en parlak isimlerine kadar, saygın referanslarımızla yabancıların yasal süreçlerinde profesyonel çözüm ortağıyız.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Philosphy / Value Proposition */}
      <section className="container mx-auto px-4 mb-32">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
               <h2 className="text-blue-600 font-black tracking-widest text-xs uppercase mb-4">KALİTE STANDARDI</h2>
               <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-8">
                  Nitelikli Hizmet <br/> Nitelikli Referans.
               </h3>
               <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                  Her bir referansımız, Atasa Danışmanlık'ın yasal süreçlerdeki titizliğinin ve sonuç odaklı çalışma prensibinin bir kanıtıdır. 
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600">
                     <CheckCircle2 size={24} />
                  </div>
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Resmi İş Ortaklıkları</span>
               </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                  <Quote size={48} className="text-blue-100 mb-6" />
                  <p className="text-slate-700 text-xl font-bold leading-relaxed italic mb-8">
                    "Atasa ile çalışmak, bürokratik engelleri profesyonel bir ekibin eline bırakmak demek. Geniş portföyümüz tesadüf değil."
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                     <div>
                        <div className="font-black text-slate-900 text-sm">CEO & Yatırımcı</div>
                        <div className="text-slate-400 text-xs font-bold uppercase">Holding Partneri</div>
                     </div>
                  </div>
               </div>
               <div className="bg-blue-600 p-10 rounded-[3rem] shadow-2xl shadow-blue-500/20 text-white">
                  <Zap size={48} className="text-blue-300 mb-6 opacity-40" />
                  <h4 className="text-2xl font-black mb-4 tracking-tight">Kurumsal Ölçek</h4>
                  <p className="text-blue-100 font-medium leading-relaxed">
                    İnşaattan sağlığa, sanatçılardan ağır sanayi holdinglerine kadar Türkiye ekonomisinin her alanında yabancı uzmanların ve yatırımcıların yanındayız.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Filtered Showcase Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-slate-100 pb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
               <Users className="text-blue-600" /> Referans Galerisi ({REFERENCES_DATA.length} Marka)
            </h2>
            
            <div className="bg-slate-100/50 p-1.5 rounded-2xl flex gap-2 border border-slate-200/50">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      filter === cat.id ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
            </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, index) => (
              <ReferenceCard key={item.name} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. Industry Ecosystem Map */}
      <section className="container mx-auto px-4 mb-32">
         <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-50 rounded-br-full opacity-50"></div>
            <div className="text-center mb-20 relative z-10">
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">SEKTÖREL DERİNLİK</span>
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Hizmet Verdiğimiz Sektörler</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
               <IndustryItem icon={<Building2 size={32} />} label="İnşaat & Mimarlık" />
               <IndustryItem icon={<ShoppingBag size={32} />} label="Tekstil & Moda" />
               <IndustryItem icon={<Landmark size={32} />} label="Finans & Yatırım" />
               <IndustryItem icon={<Music size={32} />} label="Sanat & Medya" />
               <IndustryItem icon={<Stethoscope size={32} />} label="Sağlık & Tıp" />
               <IndustryItem icon={<Ship size={32} />} label="Lojistik & Gümrük" />
               <IndustryItem icon={<Utensils size={32} />} label="Gıda & Restoran" />
               <IndustryItem icon={<Car size={32} />} label="Otomotiv & Lojistik" />
               <IndustryItem icon={<Tv size={32} />} label="Eğlence & VIP" />
               <IndustryItem icon={<GraduationCap size={32} />} label="Eğitim & Dijital" />
            </div>
         </div>
      </section>

      {/* 5. Final Global CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white text-center relative overflow-hidden shadow-3xl border border-white/5">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-blue-500/40">
                 <BadgeCheck size={40} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none">Siz de Başarı <br/> Listemize Katılın</h2>
              <p className="text-slate-400 text-xl md:text-2xl mb-14 leading-relaxed font-medium">
                Yabancı personel süreçlerinizden yatırımcı vatandaşlığına kadar her aşamada liderlerin tercih ettiği Atasa tecrübesinden faydalanın.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link to="/appointment" className="bg-white text-slate-900 px-14 py-6 rounded-3xl font-black text-xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">
                    Randevunuzu Oluşturun
                 </Link>
                 <Link to="/contact" className="bg-white/5 border-2 border-white/10 backdrop-blur-md text-white px-14 py-6 rounded-3xl font-black text-xl hover:bg-white/10 transition-all active:scale-95">
                    İletişime Geçin
                 </Link>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

const IndustryItem = ({ icon, label }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex flex-col items-center gap-5 group cursor-default"
  >
    <div className="w-20 h-20 rounded-[2rem] bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-blue-200">
      {icon}
    </div>
    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors text-center">{label}</span>
  </motion.div>
);
