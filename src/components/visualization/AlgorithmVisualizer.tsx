import { useEffect } from 'react';
import { VisualizationCanvas } from './VisualizationCanvas';
import { ControlPanel } from './ControlPanel';
import { CodeDisplay } from './CodeDisplay';
import { AlgorithmDescription } from './AlgorithmDescription';
import { DataInput } from './DataInput';
import { useAlgoStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AlgorithmVisualizer() {
  const { generateRandomArray, type, algorithm, generateSteps } = useAlgoStore();

  useEffect(() => {
    generateRandomArray();
    generateSteps();
  }, [generateRandomArray, generateSteps]);

  return (
    <ScrollArea className="h-[80vh]">
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-4 bg-card shadow-xl">
            <VisualizationCanvas />
            <div className="mt-4">
              <DataInput />
            </div>
            <div className="mt-4">
              <ControlPanel />
            </div>
          </Card>
          <div className="space-y-4">
            <AlgorithmDescription type={type} algorithm={algorithm} />
            <Tabs defaultValue="cpp" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="cpp" className="flex-1">C++</TabsTrigger>
                <TabsTrigger value="js" className="flex-1">JavaScript</TabsTrigger>
              </TabsList>
              <TabsContent value="cpp">
                <CodeDisplay type={type} algorithm={algorithm} language="cpp" />
              </TabsContent>
              <TabsContent value="js">
                <CodeDisplay type={type} algorithm={algorithm} language="javascript" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}