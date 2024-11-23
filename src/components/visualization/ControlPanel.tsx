import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from 'lucide-react';
import { useAlgoStore } from '@/lib/store';
import { useEffect, useCallback } from 'react';

export function ControlPanel() {
  const { 
    speed, 
    setSpeed, 
    isRunning, 
    setIsRunning, 
    generateRandomArray,
    currentStep,
    setCurrentStep,
    steps,
    nextStep,
    prevStep,
    resetSteps,
    generateSteps
  } = useAlgoStore();

  const handlePlayPause = () => {
    if (!isRunning && currentStep === steps.length - 1) {
      setCurrentStep(0);
    }
    setIsRunning(!isRunning);
  };

  const runAnimation = useCallback(() => {
    if (isRunning && currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        nextStep();
      }, 1000 - speed * 9);
      return () => clearTimeout(timeout);
    } else if (currentStep === steps.length - 1) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep, speed, nextStep, steps.length, setIsRunning]);

  useEffect(() => {
    return runAnimation();
  }, [runAnimation]);

  const handleReset = () => {
    resetSteps();
    generateRandomArray();
    generateSteps();
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg shadow-xl">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => prevStep()}
          disabled={currentStep === 0 || isRunning}
          className="w-10 h-10"
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          className="w-12 h-12"
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => nextStep()}
          disabled={currentStep === steps.length - 1 || isRunning}
          className="w-10 h-10"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="w-10 h-10"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Speed</span>
          <span>{speed}x</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>
      <div className="text-sm text-center text-muted-foreground">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
}