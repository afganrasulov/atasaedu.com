import React, { useRef, useState } from 'react';

interface SpotlightWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightWrapper: React.FC<SpotlightWrapperProps> = ({ children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Mouse hareketini tüm sayfada takip etmek için divRef yerine window eventlerine güvenebiliriz
  // Ancak burada container üzerinde hareket yeterli olacaktır.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // clientX ve clientY kullanarak viewport'a (ekrana) göre pozisyon alıyoruz.
    // Bu sayede scroll yapıldığında spotlight kaybolmaz, ekranın neresindeyse orada kalır.
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative min-h-screen w-full bg-slate-50 ${className}`}
    >
      {/* 
         FIXED Background Layer
         Arka planı 'fixed' yaparak scroll performansını artırıyoruz ve 
         scroll barın kaybolması/takılması sorununu çözüyoruz.
         İçerik bu katmanın üzerinde kayar.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
          
          {/* Static Ambient Blobs (Blue & Orange) */}
          <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '7s' }}></div>

          {/* 
             Dynamic Spotlight Effect 
             Mouse'u takip eden ışık. Fixed olduğu için clientX/Y koordinatları ile tam uyumlu çalışır.
          */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{
              opacity,
              background: `
                radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.08), transparent 40%),
                radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(249, 115, 22, 0.04), transparent 40%)
              `,
            }}
          />

          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
            }}
          ></div>
      </div>

      {/* 
         Content Layer 
         z-10 ile arka planın üzerinde olmasını sağlıyoruz. 
         Burada overflow kısıtlaması yok, doğal akışında scroll edilebilir.
      */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};