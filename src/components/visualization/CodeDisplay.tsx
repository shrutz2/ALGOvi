import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const implementations = {
  sorting: {
    bubble: {
      cpp: `template<typename T>
void bubbleSort(vector<T>& arr) {
    int n = arr.size();
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
    },
    quick: {
      cpp: `template<typename T>
int partition(vector<T>& arr, int low, int high) {
    T pivot = arr[high];
    int i = low - 1;
    
    for(int j = low; j < high; j++) {
        if(arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

template<typename T>
void quickSort(vector<T>& arr, int low, int high) {
    if(low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
    }
  },
  searching: {
    binary: {
      cpp: `template<typename T>
int binarySearch(const vector<T>& arr, T target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target)
            return mid;
            
        if(arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}`,
      javascript: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    
    if (arr[mid] === target)
      return mid;
      
    if (arr[mid] < target)
      left = mid + 1;
    else
      right = mid - 1;
  }
  return -1;
}`
    }
  },
  graph: {
    bfs: {
      cpp: `void bfs(vector<vector<int>>& graph, int start) {
    int n = graph.size();
    vector<bool> visited(n, false);
    queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while(!q.empty()) {
        int vertex = q.front();
        q.pop();
        cout << vertex << " ";
        
        for(int adj : graph[vertex]) {
            if(!visited[adj]) {
                visited[adj] = true;
                q.push(adj);
            }
        }
    }
}`,
      javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex);
    
    for (const adj of graph[vertex]) {
      if (!visited.has(adj)) {
        visited.add(adj);
        queue.push(adj);
      }
    }
  }
}`
    }
  }
};

interface CodeDisplayProps {
  type: string;
  algorithm: string;
  language?: 'cpp' | 'javascript';
}

export function CodeDisplay({ type, algorithm, language = 'javascript' }: CodeDisplayProps) {
  const code = implementations[type as keyof typeof implementations]?.[algorithm as any]?.[language];
  
  if (!code) return null;

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg">Implementation ({language.toUpperCase()})</CardTitle>
      </CardHeader>
      <CardContent>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            background: 'hsl(var(--muted))',
          }}
          className="text-sm"
        >
          {code}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
}