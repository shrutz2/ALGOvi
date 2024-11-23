import { create } from 'zustand';

type AlgorithmType = 'sorting' | 'searching' | 'graph';
type SortingAlgorithm = 'bubble' | 'quick' | 'merge' | 'insertion' | 'selection';
type SearchingAlgorithm = 'binary' | 'linear';
type GraphAlgorithm = 'bfs' | 'dfs';

interface Step {
  comparing?: number[];
  sorted?: number[];
  current?: number;
  found?: number;
  eliminated?: number[];
  edge?: number;
  visited?: number[];
  message?: string;
}

interface AlgoState {
  type: AlgorithmType;
  algorithm: SortingAlgorithm | SearchingAlgorithm | GraphAlgorithm;
  speed: number;
  array: number[];
  isRunning: boolean;
  currentStep: number;
  steps: Step[];
  setType: (type: AlgorithmType) => void;
  setAlgorithm: (algorithm: SortingAlgorithm | SearchingAlgorithm | GraphAlgorithm) => void;
  setSpeed: (speed: number) => void;
  setArray: (array: number[]) => void;
  setIsRunning: (isRunning: boolean) => void;
  setCurrentStep: (step: number) => void;
  setSteps: (steps: Step[]) => void;
  generateRandomArray: () => void;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  generateSteps: () => void;
}

export const useAlgoStore = create<AlgoState>((set, get) => ({
  type: 'sorting',
  algorithm: 'bubble',
  speed: 5,
  array: [],
  isRunning: false,
  currentStep: 0,
  steps: [],
  setType: (type) => set({ type }),
  setAlgorithm: (algorithm) => {
    set({ algorithm });
    get().resetSteps();
    get().generateSteps();
  },
  setSpeed: (speed) => set({ speed }),
  setArray: (array) => {
    set({ array });
    get().resetSteps();
    get().generateSteps();
  },
  setIsRunning: (isRunning) => set({ isRunning }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setSteps: (steps) => set({ steps }),
  generateRandomArray: () => {
    const array = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
    set({ array });
  },
  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isRunning: false });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
  resetSteps: () => set({ currentStep: 0, steps: [], isRunning: false }),
  generateSteps: () => {
    const { type, algorithm, array } = get();
    let steps: Step[] = [];

    if (type === 'sorting' && algorithm === 'bubble') {
      const arr = [...array];
      const n = arr.length;
      
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({
            comparing: [j, j + 1],
            sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - idx - 1),
            message: `Comparing ${arr[j]} and ${arr[j + 1]}`
          });

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            steps.push({
              comparing: [j, j + 1],
              sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - idx - 1),
              message: `Swapping ${arr[j]} and ${arr[j + 1]}`
            });
          }
        }
      }
    }
    // Add other algorithm implementations...

    set({ steps });
  }
}));