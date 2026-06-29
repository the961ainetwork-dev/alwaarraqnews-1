import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, CloudSun, DollarSign } from 'lucide-react';
import { INITIAL_CURRENCIES } from '../data';
import { WeatherData } from '../types';

interface CurrencyAndWeatherProps {
  language: 'ar' | 'en';
}

export default function CurrencyAndWeather({ language }: CurrencyAndWeatherProps) {
  const isAr = language === 'ar';
  
  const [weatherIndex, setWeatherIndex] = useState(0);
  const weathers: WeatherData[] = [
    { temp: 42, cityAr: 'الرياض', cityEn: 'Riyadh', conditionAr: 'صَاف ومَشمِس', conditionEn: 'Sunny & Hot' },
    { temp: 24, cityAr: 'لندن', cityEn: 'London', conditionAr: 'غَائِم جُزئِياً', conditionEn: 'Partly Cloudy' },
    { temp: 31, cityAr: 'دبي', cityEn: 'Dubai', conditionAr: 'رَطب ومُشرِق', conditionEn: 'Humid & Clear' },
    { temp: 28, cityAr: 'القاهرة', cityEn: 'Cairo', conditionAr: 'مُعتدِل', conditionEn: 'Warm & Clear' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setWeatherIndex((prev) => (prev + 1) % weathers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentWeather = weathers[weatherIndex];

  return (
    <div 
      className="bg-[#fafaf9] border-b border-stone-200 py-1 px-4 font-sans text-[11px] text-stone-500 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Currencies tickers marquee direction */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none w-full md:w-auto">
          <span className="font-bold flex items-center gap-1 text-stone-700 min-w-max border-l pl-2 border-stone-200 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-2">
            <DollarSign size={13} className="text-primary" />
            {isAr ? 'الأسواق والبورصات' : 'Markets'}
          </span>
          <div className="flex gap-4 md:gap-5 min-w-max">
            {INITIAL_CURRENCIES.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-sm border border-stone-200/60 shadow-none">
                <span className="font-bold text-stone-700">{item.pair}</span>
                <span className="text-stone-900 font-mono">{item.rate}</span>
                <span className="flex items-center gap-0.5 text-[9px] font-mono font-bold text-stone-800">
                  {item.isPositive ? <TrendingUp size={10} className="text-stone-800" /> : <TrendingDown size={10} className="text-stone-800" />}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Weather Ticker representing global bureaus */}
        <div className="flex items-center gap-2 min-w-max text-stone-600">
          <CloudSun size={14} className="text-black" />
          <span className="font-bold text-stone-700">
            {isAr ? currentWeather.cityAr : currentWeather.cityEn}:
          </span>
          <span className="font-medium">{currentWeather.temp}°م ({isAr ? currentWeather.conditionAr : currentWeather.conditionEn})</span>
        </div>
      </div>
    </div>
  );
}
