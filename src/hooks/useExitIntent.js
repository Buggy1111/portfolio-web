import { useEffect, useState } from 'react';

/**
 * Senior-level Exit Intent Detection Hook
 * Detects when user is about to leave and triggers callback
 * Features:
 * - Mouse leave detection
 * - Mobile back button detection
 * - Scroll up velocity tracking
 * - Time-based triggers
 * - Smart suppression (don't annoy users)
 */
export const useExitIntent = (options = {}) => {
  const {
    onExit,
    delay = 1000,
    triggerOnMobile = true,
    cookieDays = 7,
    scrollThreshold = 10,
    timeOnPage = 5000, // minimum time before showing
  } = options;

  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if already shown recently
    const exitIntentShown = localStorage.getItem('exitIntentShown');
    const lastShown = exitIntentShown ? new Date(exitIntentShown) : null;
    const daysSinceShown = lastShown 
      ? (new Date() - lastShown) / (1000 * 60 * 60 * 24) 
      : cookieDays + 1;

    if (daysSinceShown < cookieDays) {
      return; // Don't show if recently shown
    }

    let timeoutId;
    let scrollY = window.scrollY;
    let isDelayActive = false;
    const startTime = Date.now();

    // Desktop exit intent - mouse leave
    const handleMouseLeave = (e) => {
      if (hasTriggered || Date.now() - startTime < timeOnPage) return;

      // Only trigger when mouse leaves from top
      if (e.clientY <= scrollThreshold && !isDelayActive) {
        isDelayActive = true;
        timeoutId = setTimeout(() => {
          if (!hasTriggered) {
            setShowExitIntent(true);
            setHasTriggered(true);
            localStorage.setItem('exitIntentShown', new Date().toISOString());
            onExit?.();
          }
        }, delay);
      }
    };

    // Mobile exit intent - scroll up quickly
    const handleScroll = () => {
      if (!triggerOnMobile || hasTriggered) return;

      const currentScrollY = window.scrollY;
      const scrollVelocity = scrollY - currentScrollY;

      // Detect fast upward scroll (user scrolling to top to leave)
      if (scrollVelocity > 50 && currentScrollY < 100) {
        if (!hasTriggered && Date.now() - startTime > timeOnPage) {
          setShowExitIntent(true);
          setHasTriggered(true);
          localStorage.setItem('exitIntentShown', new Date().toISOString());
          onExit?.();
        }
      }

      scrollY = currentScrollY;
    };

    // Mobile back button detection
    const handlePopState = () => {
      if (triggerOnMobile && !hasTriggered && Date.now() - startTime > timeOnPage) {
        setShowExitIntent(true);
        setHasTriggered(true);
        localStorage.setItem('exitIntentShown', new Date().toISOString());
        onExit?.();
      }
    };

    // Tab visibility change (user switching tabs)
    const handleVisibilityChange = () => {
      if (document.hidden && !hasTriggered && Date.now() - startTime > timeOnPage * 2) {
        setShowExitIntent(true);
        setHasTriggered(true);
        localStorage.setItem('exitIntentShown', new Date().toISOString());
        onExit?.();
      }
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        isDelayActive = false;
      }
    };

    // Event listeners
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, triggerOnMobile, cookieDays, scrollThreshold, timeOnPage, hasTriggered, onExit]);

  const dismissExitIntent = () => {
    setShowExitIntent(false);
    // Optional: Set longer cookie for dismissed popups
    localStorage.setItem('exitIntentDismissed', new Date().toISOString());
  };

  const resetExitIntent = () => {
    setShowExitIntent(false);
    setHasTriggered(false);
    localStorage.removeItem('exitIntentShown');
    localStorage.removeItem('exitIntentDismissed');
  };

  return {
    showExitIntent,
    dismissExitIntent,
    resetExitIntent,
    hasTriggered
  };
};

export default useExitIntent;