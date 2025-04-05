import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MatrixTyping.css';

const MatrixTyping = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(true);

  const messages = {
    en: [
      "Something is coming...",
      "Find your will...",
      "Freedom awaits...",
      "The time is near...",
      "Search within...",
      "The path will be clear...",
      "Your moment is coming...",
      "Stay strong...",
      "The truth will be revealed...",
      "Prepare for change..."
    ],
    by: [
      "Нешта набліжаецца...",
      "Знайдзі сваю волю...",
      "Свабода чакае...",
      "Час набліжаецца...",
      "Шукай унутры...",
      "Шлях будзе ясны...",
      "Твой момант набліжаецца...",
      "Будзь моцны...",
      "Праўда будзе адкрыта...",
      "Рыхтуйся да змен..."
    ]
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        if (response.data.country_code === 'BY') {
          setLanguage('by');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let currentMessage = messages[language][0];
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      if (isDeleting) {
        currentText = currentText.slice(0, -1);
        typingSpeed = 30;
      } else {
        currentText = currentMessage.slice(0, currentText.length + 1);
        typingSpeed = 100;
      }

      setText(currentText);

      if (!isDeleting && currentText === currentMessage) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % messages[language].length;
        currentMessage = messages[language][currentIndex];
        typingSpeed = 500;
      }

      if (isTyping) {
        setTimeout(type, typingSpeed);
      }
    };

    type();

    return () => {
      setIsTyping(false);
    };
  }, [language, isTyping]);

  return (
    <div className="matrix-container">
      <div className="matrix-text" data-text={text}>{text}</div>
      <div className="matrix-overlay"></div>
      <div className="matrix-noise"></div>
    </div>
  );
};

export default MatrixTyping; 