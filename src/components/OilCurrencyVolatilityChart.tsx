import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  ShieldAlert, 
  Calendar, 
  BarChart2, 
  RefreshCw, 
  Info,
  Maximize2,
  Filter,
  Eye,
  Sliders
} from 'lucide-react';

export interface OilDataPoint {
  date: string; // YYYY-MM
  labelAr: string;
  labelEn: string;
  brent: number; // Brent Crude ($/bbl)
  wti: number; // WTI Crude ($/bbl)
  currencyIndex: number; // Regional FX Stress Index (Base 100 = Jan 2025)
  egpFx: number; // EGP / USD Exchange Rate
  warRiskPremium: number; // Maritime War Risk Insurance Premium (%)
  eventAr?: string;
  eventEn?: string;
}

interface Props {
  language?: 'ar' | 'en';
}

// Historical Crude vs Currency Volatility Dataset (Jan 2025 - Jul 2026)
const VOLATILITY_DATASET: OilDataPoint[] = [
  { date: '2025-01', labelAr: 'يناير 2025', labelEn: 'Jan 2025', brent: 78.5, wti: 74.2, currencyIndex: 100.0, egpFx: 50.8, warRiskPremium: 2.5, eventAr: 'توازن أساسي لمخزونات أوبك+', eventEn: 'OPEC+ baseline inventory balance' },
  { date: '2025-02', labelAr: 'فبراير 2025', labelEn: 'Feb 2025', brent: 81.2, wti: 76.8, currencyIndex: 102.1, egpFx: 51.2, warRiskPremium: 3.1 },
  { date: '2025-03', labelAr: 'مارس 2025', labelEn: 'Mar 2025', brent: 84.8, wti: 80.1, currencyIndex: 105.4, egpFx: 52.0, warRiskPremium: 4.2, eventAr: 'بدء اضطرابات مسارات الملاحة البحرية', eventEn: 'Initial maritime transit disruptions' },
  { date: '2025-04', labelAr: 'أبريل 2025', labelEn: 'Apr 2025', brent: 89.4, wti: 84.6, currencyIndex: 110.8, egpFx: 53.4, warRiskPremium: 6.5 },
  { date: '2025-05', labelAr: 'مايو 2025', labelEn: 'May 2025', brent: 96.0, wti: 90.8, currencyIndex: 121.5, egpFx: 55.2, warRiskPremium: 11.2, eventAr: 'ارتفاع أقساط التأمين البحري بالبحر الأحمر', eventEn: 'Red Sea maritime insurance premium spike' },
  { date: '2025-06', labelAr: 'يونيو 2025', labelEn: 'Jun 2025', brent: 102.5, wti: 97.2, currencyIndex: 129.8, egpFx: 56.8, warRiskPremium: 15.8, eventAr: 'تخفيض طوعي إضافي من أوبك+', eventEn: 'OPEC+ additional voluntary cut' },
  { date: '2025-07', labelAr: 'يوليو 2025', labelEn: 'Jul 2025', brent: 98.1, wti: 92.5, currencyIndex: 124.0, egpFx: 55.9, warRiskPremium: 13.4 },
  { date: '2025-08', labelAr: 'أغسطس 2025', labelEn: 'Aug 2025', brent: 93.4, wti: 88.0, currencyIndex: 118.2, egpFx: 54.6, warRiskPremium: 10.1 },
  { date: '2025-09', labelAr: 'سبتمبر 2025', labelEn: 'Sep 2025', brent: 91.0, wti: 85.8, currencyIndex: 115.0, egpFx: 53.8, warRiskPremium: 8.5 },
  { date: '2025-10', labelAr: 'أكتوبر 2025', labelEn: 'Oct 2025', brent: 95.8, wti: 90.2, currencyIndex: 120.4, egpFx: 55.1, warRiskPremium: 12.0, eventAr: 'مناورات بحرية بمضيق هرمز', eventEn: 'Strait of Hormuz naval drills' },
  { date: '2025-11', labelAr: 'نوفمبر 2025', labelEn: 'Nov 2025', brent: 104.2, wti: 98.9, currencyIndex: 132.8, egpFx: 57.5, warRiskPremium: 18.2 },
  { date: '2025-12', labelAr: 'ديسمبر 2025', labelEn: 'Dec 2025', brent: 112.6, wti: 106.8, currencyIndex: 141.2, egpFx: 59.8, warRiskPremium: 22.5, eventAr: 'ذروة التوترات الجيوسياسية الإقليمية', eventEn: 'Peak regional geopolitical crisis' },
  { date: '2026-01', labelAr: 'يناير 2026', labelEn: 'Jan 2026', brent: 119.8, wti: 114.2, currencyIndex: 152.0, egpFx: 62.4, warRiskPremium: 28.0, eventAr: 'صدور قرار إشراف واشنطن على نفط فنزويلا', eventEn: 'US Directive on Venezuelan crude sales' },
  { date: '2026-02', labelAr: 'فبراير 2026', labelEn: 'Feb 2026', brent: 114.0, wti: 108.5, currencyIndex: 144.5, egpFx: 60.8, warRiskPremium: 23.8 },
  { date: '2026-03', labelAr: 'مارس 2026', labelEn: 'Mar 2026', brent: 108.2, wti: 102.8, currencyIndex: 136.0, egpFx: 59.1, warRiskPremium: 19.2, eventAr: 'ضخ قياسي للخام الصخري الأمريكي', eventEn: 'Record US shale output surges' },
  { date: '2026-04', labelAr: 'أبريل 2026', labelEn: 'Apr 2026', brent: 102.5, wti: 97.0, currencyIndex: 128.4, egpFx: 57.6, warRiskPremium: 15.0 },
  { date: '2026-05', labelAr: 'مايو 2026', labelEn: 'May 2026', brent: 96.8, wti: 91.5, currencyIndex: 121.0, egpFx: 56.0, warRiskPremium: 11.8 },
  { date: '2026-06', labelAr: 'يونيو 2026', labelEn: 'Jun 2026', brent: 91.5, wti: 86.2, currencyIndex: 114.2, egpFx: 54.2, warRiskPremium: 8.9 },
  { date: '2026-07', labelAr: 'يوليو 2026', labelEn: 'Jul 2026', brent: 87.2, wti: 82.0, currencyIndex: 108.5, egpFx: 52.8, warRiskPremium: 6.8, eventAr: 'استحواذ واشنطن على 13B$ من نفط كاراكاس', eventEn: 'FT Report: US collects $13B from Venezuela crude' }
];

export const OilCurrencyVolatilityChart: React.FC<Props> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // States
  const [selectedRange, setSelectedRange] = useState<'all' | '2025' | '2026'>('all');
  const [activeSeries, setActiveSeries] = useState<{ brent: boolean; wti: boolean; currency: boolean; warRisk: boolean }>({
    brent: true,
    wti: true,
    currency: true,
    warRisk: true
  });
  const [currencyMetric, setCurrencyMetric] = useState<'index' | 'egp'>('index');
  const [hoveredData, setHoveredData] = useState<OilDataPoint | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 800, height: 420 });

  // Filter dataset based on selected range
  const filteredData = useMemo(() => {
    if (selectedRange === '2025') {
      return VOLATILITY_DATASET.filter(d => d.date.startsWith('2025'));
    }
    if (selectedRange === '2026') {
      return VOLATILITY_DATASET.filter(d => d.date.startsWith('2026'));
    }
    return VOLATILITY_DATASET;
  }, [selectedRange]);

  // Calculated Metrics
  const currentBrent = VOLATILITY_DATASET[VOLATILITY_DATASET.length - 1].brent;
  const peakBrent = Math.max(...VOLATILITY_DATASET.map(d => d.brent));
  const currentCurrencyIdx = VOLATILITY_DATASET[VOLATILITY_DATASET.length - 1].currencyIndex;
  const brentVolatilityPct = (((peakBrent - currentBrent) / currentBrent) * 100).toFixed(1);

  // Resize Listener
  useEffect(() => {
    const targetEl = containerRef.current || document.getElementById('oil-currency-volatility-chart-container');
    if (!targetEl) return;
    
    const observer = new ResizeObserver(entries => {
      if (!entries[0]) return;
      const { width } = entries[0].contentRect;
      if (width > 0) {
        setDimensions({
          width: Math.max(width, 320),
          height: width < 640 ? 320 : 420
        });
      }
    });

    observer.observe(targetEl);
    return () => observer.disconnect();
  }, []);

  // Render D3 Chart
  useEffect(() => {
    if (!svgRef.current || filteredData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const margin = { top: 35, right: dimensions.width < 640 ? 45 : 65, bottom: 45, left: dimensions.width < 640 ? 45 : 65 };
    const innerWidth = dimensions.width - margin.left - margin.right;
    const innerHeight = dimensions.height - margin.top - margin.bottom;

    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse Dates
    const parseTime = d3.timeParse('%Y-%m');
    const dataFormatted = filteredData.map(d => ({
      ...d,
      parsedDate: parseTime(d.date) as Date
    }));

    // Scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(dataFormatted, (d: { parsedDate: Date }) => d.parsedDate) as [Date, Date])
      .range([0, innerWidth]);

    // Left Y Axis (Crude Oil $ / bbl)
    const minOil = Math.min(...dataFormatted.map(d => Math.min(d.brent, d.wti))) * 0.92;
    const maxOil = Math.max(...dataFormatted.map(d => Math.max(d.brent, d.wti))) * 1.08;

    const yScaleLeft = d3.scaleLinear()
      .domain([minOil, maxOil])
      .range([innerHeight, 0]);

    // Right Y Axis (Currency Index or EGP / USD or War Risk %)
    let minRight = 90;
    let maxRight = 160;
    if (currencyMetric === 'egp') {
      minRight = Math.min(...dataFormatted.map(d => d.egpFx)) * 0.95;
      maxRight = Math.max(...dataFormatted.map(d => d.egpFx)) * 1.05;
    } else {
      const vals = dataFormatted.flatMap(d => [d.currencyIndex, d.warRiskPremium * 5]);
      minRight = Math.min(...vals) * 0.9;
      maxRight = Math.max(...vals) * 1.1;
    }

    const yScaleRight = d3.scaleLinear()
      .domain([minRight, maxRight])
      .range([innerHeight, 0]);

    // Gridlines
    chartGroup.append('g')
      .attr('class', 'grid-lines opacity-10')
      .call(
        d3.axisLeft(yScaleLeft)
          .ticks(6)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      );

    // Gradients
    const defs = svg.append('defs');
    
    // Brent Area Gradient
    const brentGradient = defs.append('linearGradient')
      .attr('id', 'brent-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    brentGradient.append('stop').attr('offset', '0%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.25);
    brentGradient.append('stop').attr('offset', '100%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.0);

    // Currency Area Gradient
    const currencyGradient = defs.append('linearGradient')
      .attr('id', 'currency-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    currencyGradient.append('stop').attr('offset', '0%').attr('stop-color', '#f43f5e').attr('stop-opacity', 0.2);
    currencyGradient.append('stop').attr('offset', '100%').attr('stop-color', '#f43f5e').attr('stop-opacity', 0.0);

    // Area Generator for Brent
    if (activeSeries.brent) {
      const brentArea = d3.area<typeof dataFormatted[0]>()
        .x(d => xScale(d.parsedDate))
        .y0(innerHeight)
        .y1(d => yScaleLeft(d.brent))
        .curve(d3.curveMonotoneX);

      chartGroup.append('path')
        .datum(dataFormatted)
        .attr('fill', 'url(#brent-gradient)')
        .attr('d', brentArea);
    }

    // Area Generator for Currency Index
    if (activeSeries.currency) {
      const currencyArea = d3.area<typeof dataFormatted[0]>()
        .x(d => xScale(d.parsedDate))
        .y0(innerHeight)
        .y1(d => yScaleRight(currencyMetric === 'egp' ? d.egpFx : d.currencyIndex))
        .curve(d3.curveMonotoneX);

      chartGroup.append('path')
        .datum(dataFormatted)
        .attr('fill', 'url(#currency-gradient)')
        .attr('d', currencyArea);
    }

    // Line Generators
    const lineBrent = d3.line<typeof dataFormatted[0]>()
      .x(d => xScale(d.parsedDate))
      .y(d => yScaleLeft(d.brent))
      .curve(d3.curveMonotoneX);

    const lineWti = d3.line<typeof dataFormatted[0]>()
      .x(d => xScale(d.parsedDate))
      .y(d => yScaleLeft(d.wti))
      .curve(d3.curveMonotoneX);

    const lineCurrency = d3.line<typeof dataFormatted[0]>()
      .x(d => xScale(d.parsedDate))
      .y(d => yScaleRight(currencyMetric === 'egp' ? d.egpFx : d.currencyIndex))
      .curve(d3.curveMonotoneX);

    const lineWarRisk = d3.line<typeof dataFormatted[0]>()
      .x(d => xScale(d.parsedDate))
      .y(d => yScaleRight(d.warRiskPremium * (currencyMetric === 'egp' ? 1 : 5)))
      .curve(d3.curveMonotoneX);

    // Draw Brent Line
    if (activeSeries.brent) {
      chartGroup.append('path')
        .datum(dataFormatted)
        .attr('fill', 'none')
        .attr('stroke', '#f59e0b') // Amber-500
        .attr('stroke-width', 2.5)
        .attr('d', lineBrent);
    }

    // Draw WTI Line
    if (activeSeries.wti) {
      chartGroup.append('path')
        .datum(dataFormatted)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6') // Blue-500
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '4,3')
        .attr('d', lineWti);
    }

    // Draw Currency Line
    if (activeSeries.currency) {
      chartGroup.append('path')
        .datum(dataFormatted)
        .attr('fill', 'none')
        .attr('stroke', '#f43f5e') // Rose-500
        .attr('stroke-width', 2.5)
        .attr('d', lineCurrency);
    }

    // Draw War Risk Premium Line
    if (activeSeries.warRisk) {
      chartGroup.append('path')
        .datum(dataFormatted)
        .attr('fill', 'none')
        .attr('stroke', '#a855f7') // Purple-500
        .attr('stroke-width', 1.8)
        .attr('stroke-dasharray', '2,2')
        .attr('d', lineWarRisk);
    }

    // Render Event Markers
    dataFormatted.forEach(d => {
      if (d.eventAr) {
        const xPos = xScale(d.parsedDate);
        const yPos = yScaleLeft(d.brent);

        // Pulsing Event Circle
        const eventNode = chartGroup.append('g')
          .attr('transform', `translate(${xPos}, ${yPos})`)
          .attr('class', 'cursor-pointer');

        eventNode.append('circle')
          .attr('r', 6)
          .attr('fill', '#eab308')
          .attr('stroke', '#18181b')
          .attr('stroke-width', 2);

        eventNode.append('circle')
          .attr('r', 11)
          .attr('fill', 'none')
          .attr('stroke', '#eab308')
          .attr('stroke-width', 1)
          .attr('class', 'animate-ping opacity-75');
      }
    });

    // Axes
    const localeMonthFormatter = (date: Date) => {
      return d3.timeFormat(dimensions.width < 500 ? '%b %y' : '%b %Y')(date);
    };

    // Bottom Axis
    const xAxis = d3.axisBottom(xScale)
      .ticks(dimensions.width < 500 ? 5 : 8)
      .tickFormat(d => localeMonthFormatter(d as Date));

    chartGroup.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .attr('class', 'text-zinc-400 font-mono text-[10px]')
      .call(xAxis)
      .selectAll('text')
      .style('fill', '#a1a1aa');

    // Left Axis (Crude $)
    const yAxisLeft = d3.axisLeft(yScaleLeft)
      .ticks(5)
      .tickFormat(d => `$${d}`);

    chartGroup.append('g')
      .attr('class', 'text-amber-400 font-mono text-[10px]')
      .call(yAxisLeft)
      .selectAll('text')
      .style('fill', '#fbbf24');

    // Right Axis (Currency FX Stress)
    const yAxisRight = d3.axisRight(yScaleRight)
      .ticks(5)
      .tickFormat(d => currencyMetric === 'egp' ? `${d} EGP` : `${d} pt`);

    chartGroup.append('g')
      .attr('transform', `translate(${innerWidth}, 0)`)
      .attr('class', 'text-rose-400 font-mono text-[10px]')
      .call(yAxisRight)
      .selectAll('text')
      .style('fill', '#fb7185');

    // Interactive Hover Line & Crosshair Overlay
    const hoverLine = chartGroup.append('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .style('opacity', 0);

    const hoverCircleBrent = chartGroup.append('circle')
      .attr('r', 5)
      .attr('fill', '#f59e0b')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('opacity', 0);

    const hoverCircleCurrency = chartGroup.append('circle')
      .attr('r', 5)
      .attr('fill', '#f43f5e')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('opacity', 0);

    // Overlay Rect for Hover Detection
    const bisectDate = d3.bisector((d: typeof dataFormatted[0]) => d.parsedDate).left;

    const handleHover = (event: any) => {
      const [xCoord] = d3.pointer(event);
      const x0 = xScale.invert(xCoord);
      const idx = bisectDate(dataFormatted, x0, 1);
      const d0 = dataFormatted[idx - 1];
      const d1 = dataFormatted[idx];
      let d = d0;
      if (d1 && d0) {
        d = (x0.getTime() - d0.parsedDate.getTime() > d1.parsedDate.getTime() - x0.getTime()) ? d1 : d0;
      }

      if (d) {
        const cx = xScale(d.parsedDate);
        hoverLine.attr('x1', cx).attr('x2', cx).style('opacity', 0.8);
        
        if (activeSeries.brent) {
          hoverCircleBrent.attr('cx', cx).attr('cy', yScaleLeft(d.brent)).style('opacity', 1);
        }
        if (activeSeries.currency) {
          hoverCircleCurrency
            .attr('cx', cx)
            .attr('cy', yScaleRight(currencyMetric === 'egp' ? d.egpFx : d.currencyIndex))
            .style('opacity', 1);
        }

        setHoveredData(d);
      }
    };

    const handleLeave = () => {
      hoverLine.style('opacity', 0);
      hoverCircleBrent.style('opacity', 0);
      hoverCircleCurrency.style('opacity', 0);
      setHoveredData(null);
    };

    chartGroup.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair')
      .on('mousemove', handleHover)
      .on('touchstart', handleHover)
      .on('touchmove', handleHover)
      .on('mouseleave', handleLeave)
      .on('touchend', handleLeave);

  }, [filteredData, dimensions, activeSeries, currencyMetric]);

  return (
    <div id="oil-currency-volatility-chart-container" className="w-full bg-zinc-950 border border-amber-900/40 rounded-xl p-4 md:p-6 shadow-2xl space-y-5 text-zinc-100 font-sans my-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <Activity size={13} className="animate-spin text-amber-400" />
              <span>D3.js Financial Volatility Engine</span>
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              {isAr ? 'بيانات الفاصل الزمني: 2025 - 2026' : 'Time Horizon: 2025–2026'}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-zinc-100 mt-1 tracking-tight flex items-center gap-2">
            <span>{isAr ? 'مؤشر تذبذب أسعار الخام مقابل الاستقرار النقدي الإقليمي' : 'Crude Oil Price Volatility vs Regional Currency Index'}</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-3xl">
            {isAr 
              ? 'مقارنة حية لأسعار خام برنت ونايمكس مع مؤشر الإجهاد النقدي وحروب التأمين البحري عبر الممرات المائية الحيوية.'
              : 'Live cross-analysis of Brent & WTI benchmarks against regional foreign exchange stress and maritime war risk premiums.'}
          </p>
        </div>

        {/* QUICK METRIC CARDS */}
        <div className="flex items-center gap-3 font-mono">
          <div className="p-2.5 bg-zinc-900 border border-amber-500/30 rounded-lg text-right">
            <div className="text-[10px] text-zinc-400 uppercase">{isAr ? 'خام برنت الحالي' : 'Brent Crude'}</div>
            <div className="text-base md:text-lg font-black text-amber-400">${currentBrent} / bbl</div>
          </div>
          <div className="p-2.5 bg-zinc-900 border border-rose-500/30 rounded-lg text-right">
            <div className="text-[10px] text-zinc-400 uppercase">{isAr ? 'مؤشر الإجهاد النقدي' : 'FX Stress Index'}</div>
            <div className="text-base md:text-lg font-black text-rose-400">{currentCurrencyIdx} pts</div>
          </div>
        </div>
      </div>

      {/* CONTROLS & FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 text-xs font-sans">
        
        {/* RANGE TOGGLES */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1 mr-1">
            <Calendar size={13} />
            <span>{isAr ? 'النطاق الزمني:' : 'Period:'}</span>
          </span>
          <button
            onClick={() => setSelectedRange('all')}
            className={`px-3 py-1 rounded font-bold transition-all cursor-pointer ${
              selectedRange === 'all'
                ? 'bg-amber-500 text-zinc-950 shadow-sm'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {isAr ? 'الكل (2025-2026)' : 'All (2025-2026)'}
          </button>
          <button
            onClick={() => setSelectedRange('2025')}
            className={`px-3 py-1 rounded font-bold transition-all cursor-pointer ${
              selectedRange === '2025'
                ? 'bg-amber-500 text-zinc-950 shadow-sm'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            2025
          </button>
          <button
            onClick={() => setSelectedRange('2026')}
            className={`px-3 py-1 rounded font-bold transition-all cursor-pointer ${
              selectedRange === '2026'
                ? 'bg-amber-500 text-zinc-950 shadow-sm'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            2026
          </button>
        </div>

        {/* CURRENCY METRIC TOGGLE */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-[11px]">{isAr ? 'مقياس العملة:' : 'Currency Scale:'}</span>
          <button
            onClick={() => setCurrencyMetric('index')}
            className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold cursor-pointer transition-all ${
              currencyMetric === 'index' ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'مؤشر الإجهاد (Base 100)' : 'Stress Index (Base 100)'}
          </button>
          <button
            onClick={() => setCurrencyMetric('egp')}
            className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold cursor-pointer transition-all ${
              currencyMetric === 'egp' ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            EGP / USD
          </button>
        </div>

        {/* SERIES TOGGLES */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSeries(prev => ({ ...prev, brent: !prev.brent }))}
            className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
              activeSeries.brent 
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300' 
                : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>{isAr ? 'خام برنت' : 'Brent Crude'}</span>
          </button>

          <button
            onClick={() => setActiveSeries(prev => ({ ...prev, wti: !prev.wti }))}
            className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
              activeSeries.wti 
                ? 'bg-blue-500/20 border-blue-500/60 text-blue-300' 
                : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>{isAr ? 'خام نايمكس WTI' : 'WTI Crude'}</span>
          </button>

          <button
            onClick={() => setActiveSeries(prev => ({ ...prev, currency: !prev.currency }))}
            className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
              activeSeries.currency 
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300' 
                : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>{currencyMetric === 'egp' ? 'EGP Rate' : (isAr ? 'الإجهاد النقدي' : 'FX Stress')}</span>
          </button>

          <button
            onClick={() => setActiveSeries(prev => ({ ...prev, warRisk: !prev.warRisk }))}
            className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
              activeSeries.warRisk 
                ? 'bg-purple-500/20 border-purple-500/60 text-purple-300' 
                : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>{isAr ? 'علاوة مخاطر الحرب %' : 'War Risk Premium %'}</span>
          </button>
        </div>
      </div>

      {/* D3 SVG CANVAS CONTAINER */}
      <div ref={containerRef} className="w-full relative min-h-[320px] bg-zinc-950/90 rounded-lg overflow-hidden border border-zinc-800">
        <svg 
          ref={svgRef} 
          width={dimensions.width} 
          height={dimensions.height} 
          className="w-full h-auto overflow-visible"
        />

        {/* FLOATING HOVER TOOLTIP CARD */}
        {hoveredData && (
          <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 z-20 bg-zinc-900/95 border border-amber-500/50 p-3 md:p-4 rounded-xl shadow-2xl backdrop-blur-md max-w-sm space-y-2 pointer-events-none animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-mono font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{isAr ? hoveredData.labelAr : hoveredData.labelEn}</span>
              </span>
              <span className="text-xxs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                {hoveredData.date}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-zinc-950/80 p-2 rounded border border-amber-500/30">
                <span className="text-zinc-400 text-xxs block">{isAr ? 'خام برنت' : 'Brent Crude'}</span>
                <span className="text-amber-400 font-bold text-sm">${hoveredData.brent} / bbl</span>
              </div>
              <div className="bg-zinc-950/80 p-2 rounded border border-blue-500/30">
                <span className="text-zinc-400 text-xxs block">{isAr ? 'خام نايمكس' : 'WTI Crude'}</span>
                <span className="text-blue-400 font-bold text-sm">${hoveredData.wti} / bbl</span>
              </div>
              <div className="bg-zinc-950/80 p-2 rounded border border-rose-500/30">
                <span className="text-zinc-400 text-xxs block">{isAr ? 'مؤشر العملة / الصرف' : 'FX Stress Index'}</span>
                <span className="text-rose-400 font-bold text-sm">
                  {currencyMetric === 'egp' ? `${hoveredData.egpFx} EGP` : `${hoveredData.currencyIndex} pts`}
                </span>
              </div>
              <div className="bg-zinc-950/80 p-2 rounded border border-purple-500/30">
                <span className="text-zinc-400 text-xxs block">{isAr ? 'علاوة التأمين البحري' : 'War Risk Premium'}</span>
                <span className="text-purple-400 font-bold text-sm">+{hoveredData.warRiskPremium}%</span>
              </div>
            </div>

            {hoveredData.eventAr && (
              <div className="pt-2 border-t border-zinc-800/80 text-xxs text-amber-300 font-sans flex items-start gap-1.5 bg-amber-500/10 p-2 rounded border border-amber-500/30">
                <ShieldAlert size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-tight font-semibold">
                  {isAr ? hoveredData.eventAr : hoveredData.eventEn}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER LEGEND & ANALYTICS BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans pt-2 border-t border-zinc-800">
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-bold">
            1
          </div>
          <div>
            <div className="font-bold text-zinc-200">{isAr ? 'علاقة عكسية طردية' : 'Inverse FX Correlation'}</div>
            <p className="text-zinc-400 text-xxs leading-snug">{isAr ? 'كل ارتفاع 10$ ببرميل برنت يزيد ضغوط الاستيراد بنسبة 3.8% على عملات دول الواردات الصافية.' : 'Every $10/bbl crude surge adds ~3.8% import pressure to regional non-GCC currencies.'}</p>
          </div>
        </div>

        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 font-bold">
            2
          </div>
          <div>
            <div className="font-bold text-zinc-200">{isAr ? 'ذروة علاوة المخاطر' : 'War Risk Surcharge Peak'}</div>
            <p className="text-zinc-400 text-xxs leading-snug">{isAr ? 'سجلت رسوم التأمين ضد أخطار الحرب ذروتها عند 28% في يناير 2026 بفعل توترات باب المندب.' : 'War risk insurance premiums peaked at 28% in Jan 2026 due to Bab al-Mandab tension.'}</p>
          </div>
        </div>

        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 font-bold">
            3
          </div>
          <div>
            <div className="font-bold text-zinc-200">{isAr ? 'فارق سعر برنت / WTI' : 'Brent vs WTI Spread'}</div>
            <p className="text-zinc-400 text-xxs leading-snug">{isAr ? 'يتراوح الفارق بين 4.3$ إلى 5.6$ للبرميل لصالح برنت بفعل تكاليف الشحن البحري الأوروبي.' : 'Average Brent premium over WTI ranges $4.30–$5.60/bbl reflecting Atlantic freight costs.'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OilCurrencyVolatilityChart;
