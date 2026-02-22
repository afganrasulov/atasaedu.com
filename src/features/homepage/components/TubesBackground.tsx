"use client";

import { useEffect, useRef } from "react";

// Licence: CC BY-NC-SA 4.0 — https://codepen.io/soju22/pen/qEbdVjK
// Attribution: Kevin Levron (@soju22)

export function TubesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Canvas boyutunu tam olarak ayarla — blurry sorununun önlenmesi
        const setSize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            canvas.width = w;
            canvas.height = h;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
        };

        setSize();

        // CDN scriptini canvas boyutu set edildikten sonra yükle
        const scriptId = "tubes-cursor-esm";
        const existingScript = document.getElementById(scriptId);
        if (!existingScript) {
            // Import map ekle
            const importMap = document.createElement("script");
            importMap.type = "importmap";
            importMap.id = "tubes-importmap";
            importMap.textContent = JSON.stringify({
                imports: {
                    "threejs-tubes": "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
                }
            });
            // Import map daha önce eklenmemiş olabilir
            if (!document.getElementById("tubes-importmap")) {
                document.head.appendChild(importMap);
            }

            const script = document.createElement("script");
            script.type = "module";
            script.id = scriptId;
            script.innerHTML = `
                import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
                
                (function() {
                    const canvas = document.getElementById('webgl-tubes-canvas');
                    if (canvas && !window.__tubesInitialized) {
                        window.__tubesInitialized = true;
                        
                        try {
                            const app = TubesCursor(canvas, {
                                tubes: {
                                    colors: ["#FFFFFF", "#F7FAFC", "#EDF2F7"],
                                    lights: {
                                        intensity: 250,
                                        colors: ["#FFFFFF", "#E2E8F0", "#CBD5E0", "#A0AEC0"]
                                    }
                                },
                                background: 0xffffff, // Force white background if the library supports it
                                transparent: true     // Try to enable transparency
                            });
                            
                            window.__tubesApp = app;
                            
                            // Otonom hareket ekle (idle animation)
                            let time = 0;
                            const animate = () => {
                                if (window.__tubesApp) {
                                    time += 0.005;
                                    const x = Math.sin(time) * 200 + window.innerWidth / 2;
                                    const y = Math.cos(time * 0.7) * 200 + window.innerHeight / 2;
                                    
                                    // TubesCursor kütüphanesinin pointer üzerinden çalıştığını varsayarak
                                    // kütüphanenin iç durumunu veya mouse event simülasyonunu deniyoruz
                                    // Not: Eğer kütüphane direkt mouse event listener kullanıyorsa 
                                    // bu yaklaşım kütüphane yapısına göre değişebilir.
                                    const event = new MouseEvent('mousemove', {
                                        clientX: x,
                                        clientY: y,
                                        bubbles: true
                                    });
                                    canvas.dispatchEvent(event);
                                }
                                requestAnimationFrame(animate);
                            };
                            animate();
                            
                            const ro = new ResizeObserver(() => {
                                const parent = canvas.parentElement;
                                if (!parent) return;
                                const w = parent.clientWidth;
                                const h = parent.clientHeight;
                                canvas.width = w;
                                canvas.height = h;
                                canvas.style.width = w + 'px';
                                canvas.style.height = h + 'px';
                            });
                            if (canvas.parentElement) ro.observe(canvas.parentElement);
                        } catch (e) {
                            console.error("Tubes initialization failed:", e);
                            window.__tubesInitialized = false;
                        }
                    }
                })();
            `;
            document.head.appendChild(script);
        }

        const resizeObserver = new ResizeObserver(setSize);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

        return () => {
            resizeObserver.disconnect();
            const w = window as Window & typeof globalThis & {
                __tubesApp?: { destroy?: () => void };
                __tubesInitialized?: boolean;
            };
            if (w.__tubesApp?.destroy) {
                try { w.__tubesApp.destroy(); } catch { /* ignore */ }
            }
            delete w.__tubesApp;
            delete w.__tubesInitialized;
            document.getElementById(scriptId)?.remove();
        };
    }, []);

    return (
        <canvas
            id="webgl-tubes-canvas"
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                display: "block",
                pointerEvents: "all",
            }}
        />
    );
}
