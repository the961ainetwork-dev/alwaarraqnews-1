import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SparklineProps {
  storyId: string;
  language: 'ar' | 'en';
}

interface SparklineData {
  instrumentEn: string;
  instrumentAr: string;
  points: number[];
  change: string;
  isUp: boolean;
  price: string;
}

// Map story IDs to financial instruments and price impact trends
export const getStoryPriceImpact = (storyId: string): SparklineData => {
  switch (storyId) {
    case 'excl-leb-isr-secret-annex':
      return {
        instrumentEn: 'War CDS Premium',
        instrumentAr: 'علاوة مخاطر الحرب',
        points: [350, 420, 510, 480, 620, 750, 890],
        change: '+154.3%',
        isUp: true,
        price: '890 bps'
      };
    case 'exclusives-china-yuan-sanctions-2026':
      return {
        instrumentEn: 'Petroyuan Index',
        instrumentAr: 'مؤشر البترويوان',
        points: [98.2, 98.8, 99.4, 100.1, 101.5, 100.8, 102.4],
        change: '+4.28%',
        isUp: true,
        price: '¥102.40'
      };
    case 'desk-gdp':
      return {
        instrumentEn: 'Lebanon Real GDP',
        instrumentAr: 'الناتج المحلي للبنان',
        points: [18.2, 17.5, 16.8, 16.0, 15.2, 14.8, 14.2],
        change: '-21.9%',
        isUp: false,
        price: '$14.2B'
      };
    case 'desk-eurobonds':
      return {
        instrumentEn: 'Lebanon Eurobond 2029',
        instrumentAr: 'يوروبوند لبنان ٢٠٢٩',
        points: [7.2, 6.8, 6.1, 5.5, 6.2, 5.8, 5.2],
        change: '-27.7%',
        isUp: false,
        price: '5.20¢'
      };
    case 'excl-imf-aml':
      return {
        instrumentEn: 'AML Compliance Index',
        instrumentAr: 'مؤشر الامتثال المالي',
        points: [45, 48, 55, 62, 70, 78, 85],
        change: '+88.9%',
        isUp: true,
        price: '85.0 pts'
      };
    case 'excl-starlink-lebanon':
      return {
        instrumentEn: 'Telecom Security Index',
        instrumentAr: 'مؤشر أمن الاتصالات',
        points: [100, 105, 115, 120, 145, 160, 185],
        change: '+85.0%',
        isUp: true,
        price: '185.0'
      };
    case 'desk-cpi-extortion':
      return {
        instrumentEn: 'Lebanon CPI YoY',
        instrumentAr: 'مؤشر أسعار المستهلك',
        points: [120, 145, 180, 210, 240, 280, 312],
        change: '+160.0%',
        isUp: true,
        price: '312.0%'
      };
    default:
      // Generate some interesting deterministic pattern based on the string hash
      const hash = storyId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const isUp = hash % 2 === 0;
      const base = 70 + (hash % 30);
      const points = Array.from({ length: 7 }, (_, i) => {
        const variance = Math.sin(hash + i) * (5 + (hash % 5));
        const trend = isUp ? i * 1.5 : -i * 1.5;
        return Number((base + trend + variance).toFixed(1));
      });
      const changeVal = ((points[points.length - 1] - points[0]) / points[0] * 100).toFixed(1);
      const changeStr = (Number(changeVal) >= 0 ? '+' : '') + changeVal + '%';
      return {
        instrumentEn: 'Basrah Medium FOB',
        instrumentAr: 'خام البصرة المتوسط',
        points,
        change: changeStr,
        isUp: Number(changeVal) >= 0,
        price: `$${points[points.length - 1].toFixed(1)}/B`
      };
  }
};

export const Sparkline: React.FC<SparklineProps> = ({ storyId, language }) => {
  const isAr = language === 'ar';
  const data = getStoryPriceImpact(storyId);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 84;
  const height = 28;
  const padding = 4;

  const minY = Math.min(...data.points);
  const maxY = Math.max(...data.points);
  const range = maxY - minY || 1;

  // Map each data point to coordinates
  const coords = data.points.map((val, i) => {
    const x = (i / (data.points.length - 1)) * width;
    const y = height - padding - ((val - minY) / range) * (height - padding * 2);
    return { x, y, val };
  });

  const pathD = coords.reduce((acc, c, i) => {
    return acc + (i === 0 ? `M ${c.x} ${c.y}` : ` L ${c.x} ${c.y}`);
  }, '');

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  // Color scheme based on trend direction
  const strokeColor = data.isUp ? '#10b981' : '#ef4444'; // emerald vs red
  const fillColorId = `sparkline-grad-${storyId}`;

  return (
    <div 
      className="flex flex-col items-end rtl:items-start justify-center gap-1 select-none pointer-events-auto"
      id={`sparkline-wrapper-${storyId}`}
    >
      {/* Dynamic price indicator */}
      <div className="flex items-center gap-1 text-[10px] font-mono font-bold leading-none shrink-0">
        <span className="text-zinc-400 text-[8px] uppercase tracking-tighter max-w-[65px] truncate block">
          {isAr ? data.instrumentAr : data.instrumentEn}
        </span>
        <span className={`text-[9px] ${data.isUp ? 'text-emerald-600' : 'text-red-600'} flex items-center`}>
          {data.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          <span className="ml-0.5">{data.change}</span>
        </span>
      </div>

      {/* Interactive SVG Sparkline */}
      <div className="relative group">
        <svg 
          width={width} 
          height={height} 
          className="overflow-visible"
          id={`sparkline-svg-${storyId}`}
        >
          <defs>
            <linearGradient id={fillColorId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <path d={areaD} fill={`url(#${fillColorId})`} />

          {/* Sparkline curve line */}
          <path 
            d={pathD} 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth={1.75} 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />

          {/* Vertical line indicator on hover */}
          {hoveredIdx !== null && (
            <line 
              x1={coords[hoveredIdx].x} 
              y1={0} 
              x2={coords[hoveredIdx].x} 
              y2={height} 
              stroke="#a1a1aa" 
              strokeWidth={1} 
              strokeDasharray="2 1" 
            />
          )}

          {/* Target points on curve */}
          {coords.map((c, i) => {
            const isPointHovered = hoveredIdx === i;
            return (
              <g key={i}>
                {/* Active hover indicator circle */}
                {isPointHovered && (
                  <circle 
                    cx={c.x} 
                    cy={c.y} 
                    r={3.5} 
                    fill={strokeColor} 
                    stroke="#fff" 
                    strokeWidth={1}
                  />
                )}
                
                {/* Invisible large hover targets */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={8}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        <AnimatePresence>
          {hoveredIdx !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute z-30 bottom-full mb-1 right-1/2 translate-x-1/2 bg-black text-white text-[9px] font-mono font-black py-0.5 px-1.5 border border-zinc-700 pointer-events-none whitespace-nowrap shadow-md"
            >
              {hoveredIdx === coords.length - 1 ? (
                <span>{isAr ? 'السعر الحالي: ' : 'Price: '}{data.price}</span>
              ) : (
                <span>{coords[hoveredIdx].val}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Static current value displayed when not hovering any point */}
      {hoveredIdx === null && (
        <span className="text-[10px] font-mono font-extrabold text-zinc-950 bg-zinc-100 px-1 py-0.2 border border-zinc-300">
          {data.price}
        </span>
      )}
    </div>
  );
};
