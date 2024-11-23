// src/components/ShiftCalendar.js
import React from 'react';
import { formatDate } from '../utils/dateUtils';
import './ShiftCalendar.css';

const ShiftCalendar = ({ shifts, month }) => {
  const timeSlots = [
    { id: 0, time: '9:00-12:00' },
    { id: 1, time: '13:30-14:50' },
    { id: 2, time: '14:55-15:55' },
    { id: 3, time: '16:00-17:00' },
    { id: 4, time: '17:05-18:05' },
    { id: 5, time: '18:10-19:10' },
    { id: 6, time: '19:15-20:15' },
    { id: 7, time: '20:20-21:20' }
  ];

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  // 月の全日程を週ごとに分割して取得
  const getWeeksInMonth = () => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const weeks = [];
    let currentWeek = [];
    
    // 月の最初の週の前に空白を追加
    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(null);
    }

    // 月の日付を週ごとに追加
    for (let day = 1; day <= lastDay.getDate(); day++) {
      currentWeek.push(new Date(month.getFullYear(), month.getMonth(), day));
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // 最後の週の後ろに空白を追加
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = getWeeksInMonth();
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const displayedMonth = month.getMonth();

  return (
    <div className="shift-calendar-container">
      <div className="shift-calendar">
        <h2 className="month-header">
          {month.getFullYear()}年{month.getMonth() + 1}月
        </h2>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="week-container">
            <table className="shift-table">
              <thead>
                <tr>
                  <th className="time-column">時限</th>
                  {week.map((day, index) => (
                    <th key={index} className={`date-column ${day && day.getDay() === 0 ? 'sunday' : ''} ${day && day.getDay() === 6 ? 'saturday' : ''} ${day && day.getDate() === currentDate && displayedMonth === currentMonth ? 'current-day' : ''}`}>
                      {day && (
                        <>
                          {formatDate(day)}
                          <div className="weekday">{weekDays[day.getDay()]}</div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td className="time-slot">{slot.time}</td>
                    {week.map((day, dayIndex) => {
                      const shift = day && shifts.find(
                        s => s.date === formatDate(day) && s.timeSlot === slot.id
                      );
                      return (
                        <td 
                          key={dayIndex}
                          className={`shift-cell ${shift ? 'has-shift' : ''} ${day && day.getDay() === 0 ? 'sunday' : ''} ${day && day.getDay() === 6 ? 'saturday' : ''}`}
                        >
                          {shift?.description || ''}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftCalendar;