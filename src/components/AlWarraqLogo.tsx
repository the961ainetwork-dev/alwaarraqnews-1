import React, { useState } from 'react';

interface AlWarraqLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'black' | 'dark' | 'amber' | 'crimson';
  className?: string;
  showText?: boolean;
}

export default function AlWarraqLogo({
  size = 'md',
  variant = 'black',
  className = '',
  showText = false
}: AlWarraqLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  // Size mappings
  const sizeClasses = {
    sm: 'w-8 h-8 md:w-10 md:h-10',
    md: 'w-12 h-12 md:w-14 md:h-14',
    lg: 'w-16 h-16 md:w-20 md:h-20',
    xl: 'w-24 h-24 md:w-28 md:h-28'
  };

  // Color mappings
  const strokeColor = {
    black: '#000000',
    dark: '#18181b',
    amber: '#f59e0b',
    crimson: '#b91c1c'
  }[variant];

  const textColor = {
    black: '#000000',
    dark: '#ffffff',
    amber: '#fbbf24',
    crimson: '#b91c1c'
  }[variant];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {!imgFailed ? (
        <img
          src="/logo.png"
          alt="الورّاق Al-Warraq Seal"
          onError={() => setImgFailed(true)}
          referrerPolicy="no-referrer"
          decoding="async"
          className={`${sizeClasses[size]} object-contain select-none pointer-events-none ${
            variant === 'dark' || variant === 'amber' ? 'brightness-125 invert' : ''
          }`}
        />
      ) : (
        <svg 
          className={`${sizeClasses[size]} select-none shrink-0`} 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer thick ornamental ring */}
          <circle cx="100" cy="100" r="95" stroke={strokeColor} strokeWidth="3.5" />
          {/* Inner dotted decorative ring */}
          <circle cx="100" cy="100" r="88" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="84" stroke={strokeColor} strokeWidth="0.8" />
          
          {/* Lithograph calligraphy bars */}
          <rect x="55" y="44" width="6" height="16" fill={strokeColor} />
          <line x1="58" y1="34" x2="58" y2="66" stroke={strokeColor} strokeWidth="1.5" />
          
          <rect x="70" y="37" width="6" height="26" fill={strokeColor} />
          <line x1="73" y1="26" x2="73" y2="71" stroke={strokeColor} strokeWidth="1.5" />

          <rect x="85" y="47" width="6" height="13" fill={strokeColor} />
          <line x1="88" y1="39" x2="88" y2="66" stroke={strokeColor} strokeWidth="1.5" />

          {/* Nib & quill vector mark */}
          <path d="M102 38 L107 32 L112 38 M107 33 L107 56" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M125 35 C145 35 155 50 155 58 C155 65 145 75 125 75" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <path d="M140 30 C155 45 155 60 140 78" stroke={strokeColor} strokeWidth="1" fill="none" />
          
          {/* Arabic Typography Calligraphy */}
          <text 
            x="100" 
            y="114" 
            fontFamily="'Cairo', 'Amiri', 'Traditional Arabic', serif" 
            fontWeight="900" 
            fontSize="34" 
            textAnchor="middle" 
            fill={textColor}
          >
            الورّاق
          </text>
          
          {/* Domain text */}
          <text 
            x="100" 
            y="131" 
            fontFamily="monospace" 
            fontSize="8.5" 
            textAnchor="middle" 
            fill={textColor} 
            fontWeight="700" 
            letterSpacing="1"
          >
            alwarraqnews.com
          </text>

          {/* Laurel & olive leaf flourishes */}
          <path d="M35 110 C35 150 70 170 100 170 C130 170 165 150 165 110" stroke={strokeColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          
          <path d="M43 125 C40 120 48 118 50 123 C52 128 46 130 43 125 Z" fill={strokeColor} />
          <path d="M54 140 C50 135 58 133 60 138 C62 143 56 145 54 140 Z" fill={strokeColor} />
          <path d="M68 152 C64 147 72 145 74 150 C76 155 70 157 68 152 Z" fill={strokeColor} />
          <path d="M84 161 C80 156 88 154 90 159 C92 164 86 166 84 161 Z" fill={strokeColor} />

          <path d="M157 125 C160 120 152 118 150 123 C148 128 154 130 157 125 Z" fill={strokeColor} />
          <path d="M146 140 C150 135 142 133 140 138 C138 143 144 145 146 140 Z" fill={strokeColor} />
          <path d="M132 152 C136 147 128 145 126 150 C124 155 130 157 132 152 Z" fill={strokeColor} />
          <path d="M116 161 C120 156 112 154 110 159 C108 164 114 166 116 161 Z" fill={strokeColor} />
        </svg>
      )}

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-black text-lg md:text-xl tracking-tight leading-none" style={{ color: textColor }}>
            الورّاق
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
            AL-WARRAQ NEWS
          </span>
        </div>
      )}
    </div>
  );
}
