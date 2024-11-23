import { AlgorithmCard } from './AlgorithmCard';

const algorithms = {
  sorting: [
    {
      title: 'Bubble Sort',
      type: 'Sorting',
      complexity: 'O(n²)',
      description:
        'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    },
    {
      title: 'Quick Sort',
      type: 'Sorting',
      complexity: 'O(n log n)',
      description:
        'An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements by partitioning around a pivot.',
    },
    {
      title: 'Merge Sort',
      type: 'Sorting',
      complexity: 'O(n log n)',
      description:
        'A divide-and-conquer algorithm that recursively breaks down a list into smaller sublists until each sublist consists of a single element.',
    },
    {
      title: 'Insertion Sort',
      type: 'Sorting',
      complexity: 'O(n²)',
      description:
        'Builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.',
    },
    {
      title: 'Selection Sort',
      type: 'Sorting',
      complexity: 'O(n²)',
      description:
        'Divides the input list into a sorted and an unsorted region, repeatedly selecting the smallest element from the unsorted region.',
    },
  ],
  searching: [
    {
      title: 'Binary Search',
      type: 'Searching',
      complexity: 'O(log n)',
      description:
        'An efficient algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search space in half.',
    },
    {
      title: 'Linear Search',
      type: 'Searching',
      complexity: 'O(n)',
      description:
        'A simple search algorithm that checks each element in the list until a match is found or the whole list has been searched.',
    },
  ],
  graph: [
    {
      title: 'Breadth-First Search',
      type: 'Graph',
      complexity: 'O(V + E)',
      description:
        'Explores a graph level by level, visiting all neighbors of a vertex before moving to the next level of vertices.',
    },
    {
      title: 'Depth-First Search',
      type: 'Graph',
      complexity: 'O(V + E)',
      description:
        'Explores a graph by going as deep as possible along each branch before backtracking to explore other branches.',
    },
  ],
};

export function AlgorithmGrid() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-900 bg-clip-text text-transparent">
          Sorting Algorithms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithms.sorting.map((algo) => (
            <AlgorithmCard key={algo.title} {...algo} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-900 bg-clip-text text-transparent">
          Searching Algorithms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {algorithms.searching.map((algo) => (
            <AlgorithmCard key={algo.title} {...algo} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-900 bg-clip-text text-transparent">
          Graph Algorithms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {algorithms.graph.map((algo) => (
            <AlgorithmCard key={algo.title} {...algo} />
          ))}
        </div>
      </section>
    </div>
  );
}