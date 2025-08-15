import { useState, useEffect } from 'react';

const ModalScrollProgress = ({ scrollContainerRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef?.current) return;
      
      const element = scrollContainerRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(progress);
    };

    const element = scrollContainerRef?.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [scrollContainerRef]);

  return (
    <div className="absolute top-0 right-0 h-full w-1 bg-gray-200/50 dark:bg-gray-800/50 z-10">
      <div
        className="w-full bg-gradient-to-b from-emerald-500 to-blue-500 transition-all duration-200 ease-out"
        style={{ 
          height: `${progress}%`,
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
        }}
      />
    </div>
  );
};

export default ModalScrollProgress;