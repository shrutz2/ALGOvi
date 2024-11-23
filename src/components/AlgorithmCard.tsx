import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlgorithmVisualizer } from './visualization/AlgorithmVisualizer';

interface AlgorithmCardProps {
  title: string;
  type: string;
  complexity: string;
  description: string;
}

export function AlgorithmCard({
  title,
  type,
  complexity,
  description,
}: AlgorithmCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-full bg-gradient-to-br from-background to-muted border border-border/50 hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <Badge variant="outline" className="ml-2">
              {type}
            </Badge>
          </div>
          <Badge variant="secondary" className="w-fit">
            {complexity}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-red-900 to-red-950 hover:from-red-800 hover:to-red-900">
                <Play className="mr-2 h-4 w-4" /> Visualize
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl">
              <DialogHeader>
                <DialogTitle>{title} Visualization</DialogTitle>
              </DialogHeader>
              <AlgorithmVisualizer />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
}