import { useState } from 'react';
import { useAlgoStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DataInput() {
  const { type, setArray } = useAlgoStore();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'sorting' || type === 'searching') {
      const numbers = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
      setArray(numbers);
    } else if (type === 'graph') {
      // Parse graph input format: "1-2,2-3,3-4" for edges
      const edges = input.split(',').map(edge => {
        const [from, to] = edge.split('-').map(n => parseInt(n.trim()));
        return [from, to];
      });
      setArray(edges.flat());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>Enter {type === 'graph' ? 'edges (format: 1-2,2-3)' : 'numbers (comma-separated)'}</Label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={type === 'graph' ? '1-2,2-3,3-4' : '64,34,25,12,22,11,90'}
          className="font-mono"
        />
      </div>
      <Button type="submit" className="w-full">Update Data</Button>
    </form>
  );
}