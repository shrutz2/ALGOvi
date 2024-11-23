import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AlgorithmDescriptionProps {
  type: string;
  algorithm: string;
}

const descriptions = {
  sorting: {
    bubble: {
      title: 'Bubble Sort',
      description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      steps: [
        'Compare adjacent elements',
        'Swap if they are in wrong order',
        'Repeat until no swaps needed',
      ],
      complexity: 'O(n²)',
    },
    quick: {
      title: 'Quick Sort',
      description: 'Uses a divide-and-conquer strategy by selecting a pivot element and partitioning the array around it.',
      steps: [
        'Choose a pivot element',
        'Partition array around pivot',
        'Recursively sort subarrays',
      ],
      complexity: 'O(n log n)',
    },
    // Add other sorting algorithms...
  },
  searching: {
    binary: {
      title: 'Binary Search',
      description: 'Efficiently finds items in a sorted array by repeatedly dividing the search interval in half.',
      steps: [
        'Compare with middle element',
        'If target is greater, search right half',
        'If target is smaller, search left half',
      ],
      complexity: 'O(log n)',
    },
    // Add other searching algorithms...
  },
  graph: {
    bfs: {
      title: 'Breadth-First Search',
      description: 'Explores a graph level by level, visiting all neighbors of a vertex before moving to the next level.',
      steps: [
        'Start from root node',
        'Visit all neighbors',
        'Move to next level',
      ],
      complexity: 'O(V + E)',
    },
    // Add other graph algorithms...
  },
};

export function AlgorithmDescription({ type, algorithm }: AlgorithmDescriptionProps) {
  const algo = descriptions[type as keyof typeof descriptions]?.[algorithm as any];
  
  if (!algo) return null;

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg">{algo.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{algo.description}</p>
        <div className="space-y-2">
          <h4 className="font-medium">Steps:</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {algo.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <span className="font-medium">Time Complexity:</span> {algo.complexity}
        </div>
      </CardContent>
    </Card>
  );
}