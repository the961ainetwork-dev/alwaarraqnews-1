import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Topic {
  tag: string;
  nameAr: string;
  nameEn: string;
  score: number;
}

interface GeopoliticalImpactChartProps {
  topics: Topic[];
  language: 'ar' | 'en';
}

export default function GeopoliticalImpactChart({ topics, language }: GeopoliticalImpactChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 350, height: 160 });
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    text: string;
    score: number;
  }>({ show: false, x: 0, y: 0, text: '', score: 0 });
  const isAr = language === 'ar';

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width } = entries[0].contentRect;
      setDimensions({
        width: Math.max(260, width),
        height: 160,
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !topics || topics.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { 
      top: 10, 
      right: isAr ? 15 : 120, 
      bottom: 25, 
      left: isAr ? 120 : 15 
    };
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale (0 to 100)
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range(isAr ? [chartWidth, 0] : [0, chartWidth]);

    // Y scale (Topics)
    const yScale = d3.scaleBand()
      .domain(topics.map(d => isAr ? d.nameAr : d.nameEn))
      .range([0, chartHeight])
      .padding(0.3);

    // Draw background grid lines
    const gridTicks = [25, 50, 75, 100];
    g.selectAll('.grid-line')
      .data(gridTicks)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', d => xScale(d))
      .attr('y1', 0)
      .attr('x2', d => xScale(d))
      .attr('y2', chartHeight)
      .attr('stroke', '#e4e4e7')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2');

    // Draw full backgrounds for each bar row
    g.selectAll('.bar-bg')
      .data(topics)
      .enter()
      .append('rect')
      .attr('class', 'bar-bg')
      .attr('x', 0)
      .attr('y', d => yScale(isAr ? d.nameAr : d.nameEn) || 0)
      .attr('width', chartWidth)
      .attr('height', yScale.bandwidth())
      .attr('fill', '#f4f4f5')
      .attr('rx', 2);

    // Draw active colored bars with hover interactions
    const bars = g.selectAll('.bar')
      .data(topics)
      .enter()
      .append('rect')
      .attr('class', 'bar cursor-pointer transition-all duration-150 hover:brightness-90 hover:stroke-[2px]')
      .attr('x', d => isAr ? xScale(d.score) : 0)
      .attr('y', d => yScale(isAr ? d.nameAr : d.nameEn) || 0)
      .attr('width', d => isAr ? chartWidth - xScale(d.score) : xScale(d.score))
      .attr('height', yScale.bandwidth())
      .attr('fill', '#b91c1c') // Retro tactical red
      .attr('stroke', '#000000')
      .attr('stroke-width', 1.5)
      .attr('rx', 2);

    bars.on('pointerenter pointerover', function(event, d) {
      const [mx, my] = d3.pointer(event, containerRef.current);
      setTooltip({
        show: true,
        x: mx,
        y: my,
        text: isAr ? d.nameAr : d.nameEn,
        score: d.score,
      });
    })
    .on('pointermove', function(event) {
      const [mx, my] = d3.pointer(event, containerRef.current);
      setTooltip(prev => ({
        ...prev,
        x: mx,
        y: my,
      }));
    })
    .on('pointerleave', function() {
      setTooltip(prev => ({ ...prev, show: false }));
    });

    // Score text tags
    g.selectAll('.score-label')
      .data(topics)
      .enter()
      .append('text')
      .attr('class', 'score-label pointer-events-none')
      .attr('x', d => {
        if (isAr) {
          return xScale(d.score) - 8;
        } else {
          return xScale(d.score) + 8;
        }
      })
      .attr('y', d => (yScale(isAr ? d.nameAr : d.nameEn) || 0) + yScale.bandwidth() / 2 + 4)
      .attr('text-anchor', isAr ? 'end' : 'start')
      .attr('fill', '#000000')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-weight', 'bold')
      .text(d => `${d.score}%`);

    // Topic axis labels
    g.selectAll('.axis-label')
      .data(topics)
      .enter()
      .append('text')
      .attr('class', 'axis-label pointer-events-none')
      .attr('x', isAr ? chartWidth + 8 : -8)
      .attr('y', d => (yScale(isAr ? d.nameAr : d.nameEn) || 0) + yScale.bandwidth() / 2 + 4)
      .attr('text-anchor', isAr ? 'start' : 'end')
      .attr('fill', '#18181b')
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', 'bold')
      .text(d => isAr ? d.nameAr : d.nameEn);

    // X-Axis line
    g.append('line')
      .attr('x1', 0)
      .attr('y1', chartHeight)
      .attr('x2', chartWidth)
      .attr('y2', chartHeight)
      .attr('stroke', '#000000')
      .attr('stroke-width', 1.5);

    // X-Axis tick numeric values
    const ticks = [0, 25, 50, 75, 100];
    g.selectAll('.tick-label')
      .data(ticks)
      .enter()
      .append('text')
      .attr('class', 'tick-label pointer-events-none')
      .attr('x', d => xScale(d))
      .attr('y', chartHeight + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#71717a')
      .attr('font-size', '8px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text(d => `${d}%`);

  }, [topics, dimensions, isAr]);

  return (
    <div ref={containerRef} className="w-full bg-white border border-zinc-200 p-2.5 rounded-xs select-none relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="overflow-visible w-full block"
      />
      {tooltip.show && (
        <div
          className="absolute z-50 pointer-events-none bg-black text-white px-2.5 py-1.5 rounded border border-zinc-700 shadow-xl text-[11px] font-mono font-bold flex items-center gap-1.5 whitespace-nowrap transition-all duration-75"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -125%)',
          }}
        >
          <span className="text-zinc-300">{tooltip.text}:</span>
          <span className="text-amber-400 font-extrabold">{tooltip.score}%</span>
        </div>
      )}
    </div>
  );
}
