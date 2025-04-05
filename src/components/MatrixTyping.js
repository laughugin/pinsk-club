import React, { useState, useEffect, useRef } from 'react';
import './MatrixTyping.css';

const MatrixTyping = ({ messages, language }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [waitingForLanguage, setWaitingForLanguage] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (cmd) => {
    if (cmd.trim() === '') return;
    
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setOutput(prev => [...prev, `$ ${cmd}`]);
    
    if (cmd === 'ls') {
      setOutput(prev => [...prev, 'README.md']);
    } else if (cmd === 'help') {
      setOutput(prev => [...prev, 'Available commands:']);
      setOutput(prev => [...prev, 'ls - List files']);
      setOutput(prev => [...prev, 'help - Show this help message']);
      setOutput(prev => [...prev, 'show <filename> - Show file contents']);
      setOutput(prev => [...prev, 'clear - Clear terminal']);
      setOutput(prev => [...prev, 'exit - Exit terminal']);
    } else if (cmd === 'clear') {
      setOutput([]);
    } else if (cmd === 'exit') {
      setOutput(prev => [...prev, 'Terminal session ended']);
    } else if (cmd.startsWith('show ')) {
      const filename = cmd.split(' ')[1];
      if (filename === 'README.md') {
        setOutput(prev => [...prev, 'Select language (en/by):']);
        setWaitingForLanguage(true);
      } else {
        setOutput(prev => [...prev, `File not found: ${filename}`]);
      }
    } else if (waitingForLanguage && (cmd === 'en' || cmd === 'by')) {
      setWaitingForLanguage(false);
      setSelectedLanguage(cmd);
      setIsTyping(true);
      setCurrentMessageIndex(0);
      startTypingMessages(cmd);
    } else if (waitingForLanguage) {
      setOutput(prev => [...prev, 'Please select language: en or by']);
    } else {
      setOutput(prev => [...prev, `Command not found: ${cmd}`]);
    }
  };

  const startTypingMessages = (lang) => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    const messagesList = messages[lang];
    if (!messagesList || messagesList.length === 0) {
      setOutput(prev => [...prev, 'Error: No messages available']);
      setIsTyping(false);
      return;
    }

    const currentMessage = messagesList[currentMessageIndex];
    let currentIndex = 0;
    let currentLine = '';
    
    setOutput(prev => [...prev, '']);
    
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < currentMessage.length) {
        currentLine += currentMessage[currentIndex];
        setOutput(prev => {
          const newOutput = [...prev];
          newOutput[newOutput.length - 1] = currentLine;
          return newOutput;
        });
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        const nextIndex = currentMessageIndex + 1;
        if (nextIndex < messagesList.length) {
          setTimeout(() => {
            setCurrentMessageIndex(nextIndex);
            startTypingMessages(lang);
          }, 500);
        } else {
          setIsTyping(false);
          setCurrentMessageIndex(0);
        }
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(command);
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      setOutput(prev => [...prev, '^C']);
      setIsTyping(false);
      setWaitingForLanguage(false);
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setOutput([]);
    }
  };

  return (
    <div className="matrix-typing">
      <div className="terminal-output" ref={outputRef}>
        {output.map((line, index) => (
          <div key={index} className="output-line">{line}</div>
        ))}
      </div>
      <div className="terminal-input">
        <span className="prompt">$</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyPress}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default MatrixTyping; 