import { useState } from 'react';
import Confetti from 'react-canvas-confetti/dist/presets/realistic';
import { Button } from './ui/button';

export default function ConfettiButton() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button className='w-full mt-3' onClick={() => setIsVisible(true)}>
        {isVisible && (
          <Confetti
            className='overflow-visible fixed w-full h-full top-0 pointer-events-none'
            autorun={{ speed: 0.3, duration: 2500 }}
          />
        )}
        Sign up
      </Button>
    </>
  );
}
