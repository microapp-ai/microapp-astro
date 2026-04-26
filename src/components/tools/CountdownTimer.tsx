import React, { useState, useEffect, useRef } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
      alert('Time is up!');
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setTimeRemaining(totalSeconds);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const faqs: FAQItem[] = [
    {
      question: 'How do I set a custom countdown time?',
      answer: 'To set a custom countdown time, simply input the desired number of hours, minutes, and seconds into the corresponding fields. For example, to set a 30-minute timer, you would enter \'0\' in hours, \'30\' in minutes, and \'0\' in seconds.',
    },
    {
      question: 'Can I pause and resume the countdown timer?',
      answer: 'Yes, you can. The countdown timer includes \'Pause\' and \'Resume\' buttons. Clicking \'Pause\' will temporarily stop the timer at its current duration, and clicking \'Resume\' will continue the countdown from where it left off.',
    },
    {
      question: 'What happens when the countdown reaches zero?',
      answer: 'When the countdown timer reaches zero, it will typically display a notification or play an audible alert to indicate that the set time has elapsed. This ensures you are aware that your designated period has ended.',
    },
    {
      question: 'Is this countdown timer suitable for long durations, like days or weeks?',
      answer: 'While this specific implementation focuses on hours, minutes, and seconds, the underlying concept can be extended for longer durations. For this tool, it\'s best suited for tasks measurable within hours. For days or weeks, you might need a more specialized event countdown tool.',
    },
    {
      question: 'Can I run multiple countdown timers simultaneously?',
      answer: 'This particular tool is designed to run one countdown timer at a time. If you need to manage multiple timers concurrently, you would typically use a dedicated multi-timer application or open several instances of this tool in separate browser tabs.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Pomodoro Timer', slug: '/pomodoro-timer', emoji: '🍅' },
    { title: 'Stopwatch', slug: '/stopwatch', emoji: '⏱️' },
    { title: 'Days Between', slug: '/days-between', emoji: '🗓️' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-6xl font-bold mb-8 text-green-700">
          {formatTime(timeRemaining)}
        </div>
        <div className="flex space-x-4 mb-8">
          <input
            type="number"
            className="w-24 p-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="HH"
            value={hours.toString().padStart(2, '0')}
            onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            disabled={isRunning}
          />
          <input
            type="number"
            className="w-24 p-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="MM"
            value={minutes.toString().padStart(2, '0')}
            onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            min="0"
            max="59"
            disabled={isRunning}
          />
          <input
            type="number"
            className="w-24 p-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="SS"
            value={seconds.toString().padStart(2, '0')}
            onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            min="0"
            max="59"
            disabled={isRunning}
          />
        </div>
        <div className="flex space-x-4">
          {!isRunning && timeRemaining === 0 && (
            <button
              onClick={startTimer}
              className="px-6 py-3 bg-green-700 text-white rounded-md shadow-lg hover:bg-green-800 transition-colors duration-200"
            >
              Start
            </button>
          )}
          {isRunning && (
            <button
              onClick={pauseTimer}
              className="px-6 py-3 bg-yellow-300 text-gray-800 rounded-md shadow-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              Pause
            </button>
          )}
          {!isRunning && timeRemaining > 0 && (
            <button
              onClick={startTimer}
              className="px-6 py-3 bg-green-700 text-white rounded-md shadow-lg hover:bg-green-800 transition-colors duration-200"
            >
              Resume
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md shadow-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;