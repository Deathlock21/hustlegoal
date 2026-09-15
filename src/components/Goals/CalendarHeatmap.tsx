import { format, subDays, eachDayOfInterval } from 'date-fns';
import type { CheckIn } from '../../types';
import './CalendarHeatmap.css';

interface CalendarHeatmapProps {
  checkins: CheckIn[];
  weeks?: number;
}

export default function CalendarHeatmap({ checkins, weeks = 12 }: CalendarHeatmapProps) {
  const today = new Date();
  const start = subDays(today, weeks * 7 - 1);
  const days = eachDayOfInterval({ start, end: today });

  const checkMap = new Map(checkins.map(c => [c.date, c.status]));

  // Pad to start on Sunday
  const startDow = start.getDay();
  const padded = Array(startDow).fill(null).concat(days);

  const MONTHS: string[] = [];
  let prevMonth = -1;
  days.forEach(d => {
    const m = d.getMonth();
    if (m !== prevMonth) { MONTHS.push(format(d, 'MMM')); prevMonth = m; }
    else MONTHS.push('');
  });

  return (
    <div className="heatmap">
      <div className="heatmap-day-labels">
        {['S','M','T','W','T','F','S'].map((d,i) => (
          <div key={i} className="heatmap-day-label">{d}</div>
        ))}
      </div>
      <div className="heatmap-grid">
        {padded.map((day, i) => {
          if (!day) return <div key={`pad-${i}`} className="heatmap-cell empty" />;
          const dateStr = format(day, 'yyyy-MM-dd');
          const status = checkMap.get(dateStr);
          const isToday = dateStr === format(today, 'yyyy-MM-dd');
          return (
            <div
              key={dateStr}
              className={`heatmap-cell ${status ? status : 'none'} ${isToday ? 'today' : ''}`}
              title={`${format(day, 'MMM d')} — ${status ?? 'no data'}`}
            />
          );
        })}
      </div>
      <div className="heatmap-legend">
        <span className="caption">Less</span>
        <div className="heatmap-cell legend-cell none" />
        <div className="heatmap-cell legend-cell skip" />
        <div className="heatmap-cell legend-cell done" />
        <span className="caption">More</span>
        <div style={{ flex: 1 }} />
        <div className="heatmap-cell legend-cell missed" />
        <span className="caption">Missed</span>
      </div>
    </div>
  );
}
