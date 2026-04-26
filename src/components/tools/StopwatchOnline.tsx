import React, { useState, useEffect, useRef } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const StopwatchOnline: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      timerRef.current = window.setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, time]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    milliseconds %= 3600000;
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    const seconds = Math.floor(milliseconds / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return (
      String(hours).padStart(2, '0') + ':' +
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0') + '.' +
      String(centiseconds).padStart(2, '0')
    );
  };

  const faqs: FAQItem[] = [
    {
      question: "What is an online stopwatch?",
      answer: "An online stopwatch is a digital timer accessible via a web browser that allows you to measure time intervals with precision. It's useful for tracking durations of activities, exercises, or experiments without needing a physical device.",
    },
    {
      question: "How do I use this stopwatch?",
      answer: "Simply click the 'Start' button to begin timing. You can click 'Stop' to pause, 'Reset' to clear the timer and laps, and 'Lap' to record intermediate times while the stopwatch is running.",
    },
    {
      question: "Can I track multiple lap times?",
      answer: "Yes, this online stopwatch includes a lap tracking feature. While the stopwatch is running, click the 'Lap' button to record the current time. All recorded lap times will be displayed below the main timer.",
    },
    {
      question: "Is this stopwatch accurate?",
      answer: "Our online stopwatch is designed for high precision, updating every 10 milliseconds. Its accuracy is dependent on your device's processing power and browser performance, but it's generally reliable for most common timing needs.",
    },
    {
      question: "Can I use this stopwatch offline?",
      answer: "No, this is an online tool and requires an active internet connection to function. However, once loaded, basic timing might continue for a short period even if connectivity is lost, but it's not designed for offline use.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Countdown Timer", slug: "countdown-timer", emoji: "⏳" },
    { title: "Pomodoro Timer", slug: "pomodoro-timer", emoji: "🍅" },
    { title: "Age Calculator", slug: "age-calculator", emoji: "🎂" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-6xl md:text-7xl font-mono text-green-700 mb-8 font-bold">
          {formatTime(time)}
        </div>
        <div className="flex space-x-4 mb-8">
          {!isRunning ? (
            <button
              onClick={start}
              className="px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stop}
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Stop
            </button>
          )}
          <button
            onClick={lap}
            disabled={!isRunning}
            className={`px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${isRunning ? 'bg-yellow-300 text-gray-800 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
          >
            Lap
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Lap Times</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {laps.map((lapTime, index) => (
                <li key={index} className="flex justify-between items-center text-gray-700 border-b pb-2 last:border-b-0">
                  <span className="font-medium">Lap {index + 1}:</span>
                  <span className="font-mono text-lg">{formatTime(lapTime)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopwatchOnline;