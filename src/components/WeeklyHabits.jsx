import React from 'react';
import { SectionCard, Checkbox } from './ui.jsx';
import { DEFAULT_WEEKLY_HABITS } from '../data/constants.js';
import { getDateKey, isWeekend } from '../utils/dates.js';
import { format, getDay } from 'date-fns';

export function WeeklyHabits({ dates, habitsState, onToggleHabit }) {
    if (!dates || dates.length === 0) {
        return null;
    }

    const todayDate = new Date();
    const todayKey = getDateKey(todayDate);

    // Group dates into weekdays (Mon-Fri) and weekends
    const weekdays = dates.filter(d => !isWeekend(d));
    const isTodayWeekend = isWeekend(todayDate);

    // Get today's habit if today is a weekday
    const todayDayOfWeek = getDay(todayDate); // 0 = Sun, 1 = Mon ... 6 = Sat
    const todayHabitDef = DEFAULT_WEEKLY_HABITS.find(h => h.day === todayDayOfWeek && h.active);

    const weekDone = weekdays.reduce((acc, date) => {
        const dKey = getDateKey(date);
        const dayOfWeek = getDay(date);
        const habitDef = DEFAULT_WEEKLY_HABITS.find(h => h.day === dayOfWeek && h.active);

        if (habitDef && habitsState[dKey]?.[habitDef.id]) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <SectionCard
            title="This Week's Weekday Habit"
            subtitle={`${weekDone}/${weekdays.length} days done · 45–60 min hard stop each day`}
        >
            {isTodayWeekend && (
                <div style={{ padding: '12px', background: 'rgba(217, 164, 65, 0.1)', borderRadius: '8px', marginBottom: '16px', border: '1px solid rgba(217, 164, 65, 0.3)'}}>
                    <strong>It's the weekend!</strong> Weekday habits are closed. Focus on your weekend anchors (CSE / open source) and rest.
                </div>
            )}

            {weekdays.map((date) => {
                const dateKey = getDateKey(date);
                const dayOfWeek = getDay(date); // 1 = Mon, 5 = Fri
                const habitDef = DEFAULT_WEEKLY_HABITS.find(h => h.day === dayOfWeek && h.active);

                if (!habitDef) return null;

                const isToday = dateKey === todayKey;
                const isChecked = !!(habitsState[dateKey]?.[habitDef.id]);

                // Optional: prevent checking future days? For now keep it flexible, but visually highlight today

                return (
                    <Checkbox
                        key={dateKey}
                        checked={isChecked}
                        isToday={isToday}
                        onChange={() => onToggleHabit(dateKey, habitDef.id)}
                        label={`${format(date, 'EEE (MMM d)')} — ${habitDef.detail}`}
                    />
                );
            })}
        </SectionCard>
    );
}
