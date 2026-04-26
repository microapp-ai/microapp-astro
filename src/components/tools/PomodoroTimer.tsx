import React, { useState, useEffect } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            if (isBreak) {
              // Break finished, start Pomodoro
              setMinutes(25);
              setIsBreak(false);
            } else {
              // Pomodoro finished, start break
              setMinutes(5);
              setIsBreak(true);
            }
            setSeconds(0);
            setIsRunning(false);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, minutes, seconds, isBreak]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (num: number) => num < 10 ? `0${num}` : num;

  const faqs: FAQItem[] = [
    {
      question: 'What is the Pomodoro Technique?',
      answer: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student.'
    },
    {
      question: 'How does the Pomodoro Timer work?',
      answer: 'Our Pomodoro Timer helps you implement the technique. You work for a set period (default 25 minutes), then take a short break (default 5 minutes). After four pomodoros, you take a longer break (typically 15-30 minutes). The timer guides you through these intervals, helping you stay focused during work periods and ensuring you take necessary breaks.'
    },
    {
      question: 'What are the benefits of using a Pomodoro Timer?',
      answer: 'Using a Pomodoro Timer can significantly improve your focus and productivity. It helps in reducing distractions, managing time effectively, and preventing burnout by ensuring regular breaks. It also provides a sense of accomplishment as you complete each pomodoro.'
    },
    {
      question: 'Can I customize the timer durations?',
      answer: 'While the traditional Pomodoro Technique uses 25-minute work intervals and 5-minute breaks, this specific implementation currently uses fixed durations. However, many advanced Pomodoro apps allow for customization of work and break times to suit individual preferences and tasks.'
    },
    {
      question: 'What should I do during a short break?',
      answer: 'During short breaks, it\'s important to step away from your work and do something relaxing that doesn\'t require much mental effort. This could include stretching, getting a drink, walking around, or looking out a window. Avoid activities that might pull you back into work or cause new distractions, like checking emails or social media.'
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Countdown Timer', slug: '/countdown-timer', emoji: '⏳' },
    { title: 'Stopwatch', slug: '/stopwatch', emoji: '⏱️' },
    { title: 'Age Calculator', slug: '/age-calculator', emoji: '🎂' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-7xl font-bold mb-8 text-green-700">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
        <div className="flex space-x-4">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>
        <p className="mt-8 text-lg text-gray-600">
          {isBreak ? 'Time for a short break!' : 'Focus on your task!'}
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;