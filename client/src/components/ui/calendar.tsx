import { useState } from "react";
import dayjs from 'dayjs';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [hoursStart,setHoursStart] = useState<number>(0)
    const [minuteStart,setMinuteStart] = useState<number>(0)
    const [hoursEnd,setHoursEnd] = useState<number>(0)
    const [minuteEnd,setMinuteEnd] = useState<number>(0)

    const handleIncreaseTime = (callback:CallableFunction) => {
        callback(value=>value+1)
    }
    const handleDecreaseTime = (callback:CallableFunction) => {
        callback(value=>value-1)
    }
    const checkValidTime = () => {
        
    }
    const formatTime = (timeNumber) => {
        let timeStr = "" + timeNumber
        while(timeStr.length < 2)
            timeStr = "0" + timeStr
        return timeStr
    }
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
        <div className="w-3/4 border-2 border-cyan-500 border-solid rounded-lg">
            <div className="flex">
                <div className="time bg-blue-200 w-1/3 rounded-bl-lg  flex flex-col justify-center items-center">
                    <div className="time-start flex gap-2 text-white text-lg items-center">
                        <span>From</span>
                        <div className="flex flex-col gap-1 items-center ">
                            <button onClick={()=>handleIncreaseTime(setHoursStart)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <span>{formatTime(hoursStart)}</span>
                            <button onClick={()=>handleDecreaseTime(setHoursStart)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        <span>:</span>
                        <div className="flex flex-col gap-1 items-center">
                            <button onClick={()=>handleIncreaseTime(setMinuteStart)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <span>{formatTime(minuteStart)}</span>
                            <button onClick={()=>handleDecreaseTime(setMinuteStart)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="time-end flex gap-2 text-white text-lg items-center">
                        <span>To</span>
                        <div className="flex flex-col gap-1 items-center ">
                            <button onClick={()=>handleIncreaseTime(setHoursEnd)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <span>{formatTime(hoursEnd)}</span>
                            <button onClick={()=>handleDecreaseTime(setHoursEnd)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        <span>:</span>
                        <div className="flex flex-col gap-1 items-center">
                            <button onClick={()=>handleIncreaseTime(setMinuteEnd)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <span>{formatTime(minuteEnd)}</span>
                            <button onClick={()=>handleDecreaseTime(setMinuteEnd)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="calendar-container w-2/3">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-semibold text-slate-500 font-mono">
                            {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate)}
                        </h2>
                        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} className="text-center font-bold text-blue-400 font-mono">
                            {day}
                        </div>
                        ))}
                        {generateCalendar().map((day, index) => (
                        <div
                            key={index}
                            onClick={() => handleDateClick(day)}
                            className={`text-center p-[4px] cursor-pointer w-8 h-8 rounded-lg 
                            ${day ? 'hover:bg-blue-200 hover:text-white hover:rounded-3xl' : 'text-white'} 
                            ${day === selectedDate.getDate() ? 'bg-blue-400 text-white rounded-3xl' : ''}`}
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