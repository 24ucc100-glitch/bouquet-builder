import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { HeaderBar } from './components/HeaderBar';
import { SelectionStudio } from './components/SelectionStudio';
import { LiveCanvasViewport } from './components/LiveCanvasViewport';
import { CustomizerPanel } from './components/CustomizerPanel';

export default function App() {
  // 1. FLOWER SELECTIONS STATE (14 TYPES)
  const [flowerSelections, setFlowerSelections] = useState({
    roses: { count: 6, colorHex: '#e11d48' },
    lilies: { count: 3, colorHex: '#ffffff' },
    sunflowers: { count: 2, colorHex: '#eab308' },
    babys_breath: { count: 1, colorHex: '#ffffff' }
  });

  // 2. GREENERY SELECTIONS STATE (6 TYPES)
  const [greenerySelections, setGreenerySelections] = useState({
    eucalyptus: true,
    fern: true,
    ruscus: false,
    olive: false,
    palm: false,
    monstera: false
  });

  // 3. WRAP & RIBBON STATE
  const [wrapStyleId, setWrapStyleId] = useState('korean_pink');
  const [ribbonColorHex, setRibbonColorHex] = useState('#f472b6');

  // 4. STUDIO AMBIANCE & GREETING CARD STATE
  const [activeBgId, setActiveBgId] = useState('dark_luxury');
  const [cardConfig, setCardConfig] = useState({
    message: 'Happy Birthday Sneha ❤️',
    shape: 'rectangle',
    font: 'font-serif',
    color: '#78350f',
    bgHex: '#fefce8'
  });

  // 5. AI ENGINE & CANVAS STATE
  const [aiGeneratedImageUrl, setAiGeneratedImageUrl] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isShowingLivePreview, setIsShowingLivePreview] = useState(true);
  const [zoom, setZoom] = useState(1);

  const canvasRef = useRef(null);

  // FLOWER HANDLERS
  const handleChangeFlowerCount = (flowerId, delta) => {
    setFlowerSelections(prev => {
      const current = prev[flowerId] || { count: 0, colorHex: '#e11d48' };
      const newCount = Math.max(0, current.count + delta);
      return {
        ...prev,
        [flowerId]: { ...current, count: newCount }
      };
    });
    setAiGeneratedImageUrl(null); // Switch back to live preview on edit
    setIsShowingLivePreview(true);
  };

  const handleChangeFlowerColor = (flowerId, colorHex) => {
    setFlowerSelections(prev => {
      const current = prev[flowerId] || { count: 1, colorHex };
      return {
        ...prev,
        [flowerId]: { ...current, colorHex }
      };
    });
    setAiGeneratedImageUrl(null);
    setIsShowingLivePreview(true);
  };

  // GREENERY HANDLER
  const handleToggleGreenery = (greeneryId) => {
    setGreenerySelections(prev => ({
      ...prev,
      [greeneryId]: !prev[greeneryId]
    }));
    setAiGeneratedImageUrl(null);
    setIsShowingLivePreview(true);
  };

  // AI GENERATOR HANDLER
  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);

    const formattedFlowers = Object.entries(flowerSelections)
      .filter(([_, data]) => data.count > 0)
      .map(([id, data]) => `${data.count} ${id.replace('_', ' ')}`);

    const formattedLeaves = Object.entries(greenerySelections)
      .filter(([_, enabled]) => enabled)
      .map(([id]) => id);

    const payload = {
      flowers: formattedFlowers,
      leaves: formattedLeaves,
      wrap: wrapStyleId,
      ribbon: ribbonColorHex,
      card: cardConfig.message
    };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setAiGeneratedImageUrl(data.imageUrl);
        setIsShowingLivePreview(false);
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      }
    } catch (error) {
      console.error('Error generating AI bouquet:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // EXPORT PNG
  const handleExportPNG = () => {
    if (!canvasRef.current) return;
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    toPng(canvasRef.current, { pixelRatio: 2 }).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `Bloom-Artistry-Bouquet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#09080d] text-slate-100 flex flex-col p-4 font-sans select-none overflow-x-hidden">
      {/* HEADER BAR */}
      <HeaderBar
        zoom={zoom}
        onZoomChange={setZoom}
        onResetCanvas={() => {
          setFlowerSelections({
            roses: { count: 6, colorHex: '#e11d48' },
            lilies: { count: 3, colorHex: '#ffffff' },
            sunflowers: { count: 2, colorHex: '#eab308' },
            babys_breath: { count: 1, colorHex: '#ffffff' }
          });
          setWrapStyleId('korean_pink');
          setRibbonColorHex('#f472b6');
          setAiGeneratedImageUrl(null);
          setIsShowingLivePreview(true);
          setCardConfig({ message: 'Happy Birthday Emma ❤️', shape: 'rectangle', font: 'font-serif', color: '#78350f', bgHex: '#fefce8' });
        }}
        onExportPNG={handleExportPNG}
        onToggleLivePreview={() => setIsShowingLivePreview(!isShowingLivePreview)}
        isShowingLivePreview={isShowingLivePreview}
      />

      {/* MAIN WORKSPACE LAYOUT */}
      <div className="flex-1 flex gap-4 items-start justify-center max-w-[1550px] mx-auto w-full">
        {/* LEFT SIDEBAR: FLORIST SELECTION CATALOG */}
        <div className="h-[780px]">
          <SelectionStudio
            flowerSelections={flowerSelections}
            onChangeFlowerCount={handleChangeFlowerCount}
            onChangeFlowerColor={handleChangeFlowerColor}
            greenerySelections={greenerySelections}
            onToggleGreenery={handleToggleGreenery}
            wrapStyleId={wrapStyleId}
            onSelectWrap={(id) => {
              setWrapStyleId(id);
              setAiGeneratedImageUrl(null);
            }}
            ribbonColorHex={ribbonColorHex}
            onChangeRibbonColor={(hex) => {
              setRibbonColorHex(hex);
              setAiGeneratedImageUrl(null);
            }}
            cardConfig={cardConfig}
            onChangeCardConfig={setCardConfig}
            onGenerateAI={handleGenerateAI}
            isGeneratingAI={isGeneratingAI}
          />
        </div>

        {/* CENTER VIEWPORT: DUAL-MODE CANVAS */}
        <div className="flex-1 flex justify-center items-center h-[780px]">
          <LiveCanvasViewport
            ref={canvasRef}
            flowerSelections={flowerSelections}
            greenerySelections={greenerySelections}
            wrapStyleId={wrapStyleId}
            ribbonColorHex={ribbonColorHex}
            activeBgId={activeBgId}
            cardConfig={cardConfig}
            aiGeneratedImageUrl={isShowingLivePreview ? null : aiGeneratedImageUrl}
            isGeneratingAI={isGeneratingAI}
            showSparkles={true}
            zoom={zoom}
          />
        </div>

        {/* RIGHT SIDEBAR: LUXURY STUDIO CUSTOMIZER */}
        <div className="h-[780px]">
          <CustomizerPanel
            wrapStyleId={wrapStyleId}
            onSelectWrap={(id) => {
              setWrapStyleId(id);
              setAiGeneratedImageUrl(null);
            }}
            ribbonColorHex={ribbonColorHex}
            onChangeRibbonColor={(hex) => {
              setRibbonColorHex(hex);
              setAiGeneratedImageUrl(null);
            }}
            activeBgId={activeBgId}
            onSelectBg={setActiveBgId}
            cardConfig={cardConfig}
            onChangeCardConfig={setCardConfig}
          />
        </div>
      </div>
    </div>
  );
}
