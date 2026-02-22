import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Loader2, StopCircle, CheckCircle, AlertCircle, Volume2, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { processVoiceInput, VoiceFormState } from './voiceAgentService';

// Speech Recognition Type Definition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// ELEVENLABS CONFIG
// UYARI: Bu anahtarı production ortamında .env dosyasında saklayın!
const ELEVENLABS_API_KEY = "sk_7f1ae87e09fa2357611bc6a4c636920e7ad9532b115e4da1"; 
const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // 'Rachel'

export const VoiceAssistantModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  // Status State Machine
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking' | 'success' | 'error' | 'denied'>('idle');
  
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('Merhaba! Ben Atasa Asistan. Size nasıl yardımcı olabilirim?');
  const [volume, setVolume] = useState(0); 
  
  const [formState, setFormState] = useState<VoiceFormState>({
    name: null,
    phone: null,
    topic: null,
    description: null,
    isComplete: false
  });
  
  const formStateRef = useRef(formState);
  useEffect(() => {
    formStateRef.current = formState;
  }, [formState]);

  const [browserSupported, setBrowserSupported] = useState(true);

  // Refs
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Logic Refs
  const criticalErrorRef = useRef(false);
  const isAutoStartRef = useRef(false); // Track if start was automatic
  const statusRef = useRef(status);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // --- AUDIO VISUALIZER (Visual Feedback) ---
  const startVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
      }
      
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }

      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        
        let sum = 0;
        const length = Math.floor(dataArray.length / 2);
        for (let i = 0; i < length; i++) {
          sum += dataArray[i];
        }
        
        const average = sum / length;
        const normalizedVolume = Math.min(100, average * 1.5); 
        setVolume(normalizedVolume);
        
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      
      updateVolume();
    } catch (err) {
      console.warn("Visualizer failed to start:", err);
    }
  };

  const stopVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setVolume(0);
    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch(e) {}
    }
  };

  // --- SPEECH RECOGNITION SETUP ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'tr-TR';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log("Speech Recognition Started");
        criticalErrorRef.current = false;
        setStatus('listening');
        startVisualizer();
      };
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const text = event.results[i][0].transcript;
            console.log("Final Result:", text);
            setTranscript(text);
            stopVisualizer();
            handleAIProcess(text, formStateRef.current);
          } else {
            interimTranscript += event.results[i][0].transcript;
            setTranscript(interimTranscript);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Recognition Error:", event.error);
        
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          // CRITICAL FIX: If this was an auto-start (e.g. triggered by code after TTS), 
          // modern browsers often block it without user gesture. 
          // In this case, we shouldn't show "Permission Denied", we should just show "Idle" (Tap to Speak).
          if (isAutoStartRef.current) {
             console.log("Auto-start blocked by browser policy. Falling back to idle UI.");
             setStatus('idle');
             stopVisualizer();
             return;
          }

          // If it was a MANUAL attempt (user clicked), then it's a real permission issue.
          criticalErrorRef.current = true;
          setStatus('denied');
          stopVisualizer();
        } else if (event.error === 'no-speech') {
          if (statusRef.current === 'listening') {
             setStatus('idle');
             setTranscript('');
          }
          stopVisualizer();
        } else {
          stopVisualizer();
          setStatus('idle');
        }
      };

      recognition.onend = () => {
        if (criticalErrorRef.current) return;

        if (statusRef.current === 'listening') {
            setStatus('idle');
            stopVisualizer();
        }
      };
      
      recognitionRef.current = recognition;
    } else {
      setBrowserSupported(false);
    }

    return () => {
      stopVisualizer();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // --- ELEVENLABS TTS ---
  const speak = async (text: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (!text) {
        setStatus('idle');
        return;
    }

    setStatus('speaking');

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        }),
      });

      if (!response.ok) throw new Error("TTS API Error");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audioRef.current = audio;
      
      audio.onended = () => {
        // Only auto-start if modal is still open
        if (statusRef.current !== 'success' && !formStateRef.current.isComplete && isOpenRef.current) {
           // Try to auto-start listening
           // Pass 'true' to indicate this is an automated attempt
           startListening(true);
        } else {
           setStatus('idle');
        }
      };
      
      await audio.play();

    } catch (error) {
      console.error("TTS Error:", error);
      setStatus('idle');
    }
  };

  const startListening = (isAuto: boolean = false) => {
    // If we are already in a hard denied state, don't auto-retry endlessly
    if (status === 'denied' && isAuto) return;
    
    criticalErrorRef.current = false;
    isAutoStartRef.current = isAuto; // Set auto flag

    try {
      setTranscript('');
      recognitionRef.current?.start();
    } catch (e) {
      console.error("Start Error:", e);
      // If immediate failure on auto-start, go to idle
      if (isAuto) {
          setStatus('idle');
      } else {
          // If manual start fails (e.g. already started), just ensure visualizer is up
          setStatus('listening');
          startVisualizer();
      }
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    stopVisualizer();
    setStatus('idle');
  };

  const handleAIProcess = async (text: string, currentFormState: VoiceFormState) => {
    if (!text.trim()) {
        setStatus('idle');
        return;
    }
    
    setStatus('processing');
    const result = await processVoiceInput(text, currentFormState);
    
    setAiResponse(result.text);
    setFormState(result.newState);
    
    if (result.newState.isComplete) {
      setStatus('success');
      speak(result.text); 
      await sendToWebhook(result.newState);
    } else {
      speak(result.text);
    }
  };

  const sendToWebhook = async (data: VoiceFormState) => {
    try {
      const formData = new URLSearchParams();
      formData.append('firstName', data.name || 'Sesli Asistan');
      formData.append('phone', data.phone || '');
      formData.append('subject', data.topic || 'Sesli Asistan Talebi');
      formData.append('description', data.description || '');
      formData.append('source', 'voice_assistant');

      await fetch('https://n8n.rasulov.net/webhook/53866ac6-190b-4cbb-ad48-6d8e8e71deed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // --- LIFECYCLE ---
  useEffect(() => {
    if (isOpen) {
        // Initial Greet
        setTimeout(() => speak("Merhaba! Ben Atasa Asistan. Size nasıl yardımcı olabilirim?"), 500);
        
        // Permission Check (Silent)
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: 'microphone' as any })
                .then((permissionStatus) => {
                    if (permissionStatus.state === 'denied') {
                        criticalErrorRef.current = true;
                        setStatus('denied');
                    }
                });
        }
    } else {
      // Cleanup on Close
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      try { recognitionRef.current?.stop(); } catch(e) {}
      stopVisualizer();
      setStatus('idle');
      setTranscript('');
      criticalErrorRef.current = false;
    }
  }, [isOpen]);

  // --- RENDER HELPERS ---
  const renderOrb = () => {
    if (status !== 'listening') return null;

    const scale = 1 + (Math.max(5, volume) / 80); 

    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <motion.div 
           animate={{ scale: scale, opacity: 0.6 }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className="w-48 h-48 bg-blue-500/20 rounded-full blur-2xl absolute"
         />
         <motion.div 
           animate={{ 
             scale: scale,
             rotate: [0, 360]
           }}
           transition={{ 
             scale: { type: "spring", stiffness: 300, damping: 15 },
             rotate: { duration: 8, repeat: Infinity, ease: "linear" }
           }}
           className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 via-purple-500 to-indigo-500 relative z-10 shadow-[0_0_50px_rgba(59,130,246,0.5)] flex items-center justify-center"
         >
            <div className="w-24 h-24 rounded-full border-2 border-white/20"></div>
         </motion.div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-sans">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[600px]"
          >
            {/* Header */}
            <div className="absolute top-0 w-full z-20 p-6 flex justify-between items-start">
               <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full backdrop-blur-md border border-white/10">
                  <div className={`w-2 h-2 rounded-full ${status === 'listening' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
                  <span className="text-xs font-bold text-slate-300">Atasa AI</span>
               </div>
               <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-full backdrop-blur-md">
                <X size={20} />
              </button>
            </div>

            {/* Main Visual Area */}
            <div className="flex-1 relative flex flex-col items-center justify-center">
              
              {!browserSupported ? (
                <div className="text-center text-white px-6">
                  <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Tarayıcı Desteklemiyor</h3>
                  <p className="text-slate-400 text-sm">Lütfen Google Chrome veya Safari kullanın.</p>
                </div>
              ) : status === 'denied' ? (
                <div className="text-center text-white px-6">
                  <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Mikrofon İzni Gerekli</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Tarayıcı ayarlarından mikrofona izin vererek tekrar deneyin. 
                  </p>
                  <p className="text-slate-500 text-xs mb-6 max-w-xs mx-auto">
                    Not: Sitenin HTTPS (güvenli) bağlantı üzerinden çalıştığından emin olun.
                  </p>
                  <button onClick={() => window.location.reload()} className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors">
                    Sayfayı Yenile
                  </button>
                </div>
              ) : status === 'success' ? (
                <div className="text-center text-white px-6 animate-in zoom-in">
                  <div className="w-24 h-24 bg-green-500 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Talep Alındı!</h3>
                  <p className="text-slate-400 text-sm">Danışmanlarımız sizi arayacaktır.</p>
                </div>
              ) : (
                <>
                  {/* The Orb (Listening) */}
                  {renderOrb()}

                  {/* Idle State Visual */}
                  {status === 'idle' && (
                    <div className="relative z-10 text-center animate-in fade-in zoom-in duration-300">
                       <button 
                         onClick={() => startListening(false)}
                         className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:border-blue-500 hover:scale-105 transition-all group shadow-2xl"
                       >
                          <Mic className="text-slate-400 group-hover:text-white transition-colors" size={32} />
                       </button>
                       <p className="text-slate-500 text-sm mt-4 font-medium animate-pulse">Konuşmak için dokunun</p>
                    </div>
                  )}

                  {/* Processing State Visual */}
                  {status === 'processing' && (
                    <div className="flex flex-col items-center gap-4 z-10">
                       <Loader2 className="animate-spin text-blue-500" size={48} />
                       <p className="text-blue-400 text-sm font-bold">Düşünüyor...</p>
                    </div>
                  )}

                  {/* Speaking State Visual */}
                  {status === 'speaking' && (
                    <div className="relative z-10 text-center">
                       <div className="w-24 h-24 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                          <Volume2 className="text-purple-400" size={32} />
                       </div>
                    </div>
                  )}

                  {/* Transcript Overlay */}
                  <div className="absolute bottom-0 w-full p-6 pb-2 text-center z-20">
                    {transcript ? (
                      <p className="text-white text-lg font-medium leading-relaxed drop-shadow-md">
                        "{transcript}"
                      </p>
                    ) : status === 'listening' ? (
                       <p className="text-slate-400 text-lg">Sizi dinliyorum...</p>
                    ) : status === 'speaking' ? (
                       <p className="text-slate-300 text-sm leading-relaxed max-h-24 overflow-y-auto">{aiResponse}</p>
                    ) : null}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Controls */}
            {!['denied', 'success'].includes(status) && browserSupported && (
              <div className="p-6 bg-slate-900/50 border-t border-slate-800 backdrop-blur-md z-20">
                
                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mb-6">
                   <div className={`h-1 flex-1 rounded-full transition-all ${formState.name ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                   <div className={`h-1 flex-1 rounded-full transition-all ${formState.phone ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                   <div className={`h-1 flex-1 rounded-full transition-all ${formState.topic ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                </div>

                <div className="flex justify-center items-center gap-6">
                   {status === 'listening' ? (
                     <button 
                       onClick={stopListening}
                       className="px-8 py-4 bg-red-500/20 text-red-400 border border-red-500/50 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-500/30 transition-all w-full justify-center"
                     >
                       <StopCircle size={20} /> Tamam
                     </button>
                   ) : status === 'idle' ? (
                     <button 
                       onClick={() => startListening(false)}
                       className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all w-full justify-center shadow-lg"
                     >
                       <Mic size={20} /> Konuşmaya Başla
                     </button>
                   ) : (
                     <button disabled className="px-8 py-4 bg-slate-800 text-slate-500 rounded-2xl font-bold w-full flex items-center justify-center gap-2 cursor-not-allowed">
                       Lütfen Bekleyin...
                     </button>
                   )}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};