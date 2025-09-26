import { useEffect } from 'react';

interface UseKeyboardOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  preventDefault?: boolean;
}

export const useKeyboard = ({ onEscape, onEnter, preventDefault = false }: UseKeyboardOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (preventDefault) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'Escape':
          onEscape?.();
          break;
        case 'Enter':
          onEnter?.();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape, onEnter, preventDefault]);
};