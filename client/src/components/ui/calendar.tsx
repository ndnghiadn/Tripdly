import { TimePicker } from "antd";
import { useState } from "react";
import dayjs from 'dayjs';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return new Date(year, month, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedDate);
        const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
        const blanks = Array(firstDayOfMonth).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return [...blanks, ...days];
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
    };
    return ( 
        <div className="w-3/4">
            <div className="flex">
                <div className="time bg-blue-500 w-1/3 rounded-md flex flex-col justify-end">
                    <label htmlFor="">
                        From: <TimePicker size="small" defaultValue={dayjs('00:00', 'HH:mm')} format={'HH:mm'}/>
                    </label>
                    <label htmlFor="">
                        To: <TimePicker size="small" defaultValue={dayjs('00:00', 'HH:mm')} format={'HH:mm'}/>
                    </label>
                </div>
                <div className="calendar-container w-2/3">
                    <div className="flex justify-between items-center mb-4">
                        <button className="bg-blue-500 text-white p-1 rounded-lg text-center" onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold text-green-500">
                            {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate)}
                        </h2>
                        <button className="bg-blue-500 p-1 text-white rounded-lg text-center" onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} className="text-center font-bold">
                            {day}
                        </div>
                        ))}
                        {generateCalendar().map((day, index) => (
                        <div
                            key={index}
                            onClick={() => handleDateClick(day)}
                            className={`text-center p-[4px] cursor-pointer w-8 h-8 rounded-lg ${
                            day ? 'hover:bg-blue-400 ' : 'text-white'
                            } ${day === selectedDate.getDate() ? 'bg-blue-400 text-white' : ''}`}
                        >
                            {day}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Calendar;