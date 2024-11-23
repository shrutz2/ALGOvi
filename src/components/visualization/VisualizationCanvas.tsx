import { useRef, useEffect } from 'react';
import { useAlgoStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function VisualizationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { array, type, algorithm, isRunning, currentStep, steps } = useAlgoStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    switch (type) {
      case 'sorting':
        drawSortingVisualization(ctx, array, width, height, currentStep);
        break;
      case 'searching':
        drawSearchingVisualization(ctx, array, width, height, currentStep);
        break;
      case 'graph':
        drawGraphVisualization(ctx, array, width, height, currentStep);
        break;
    }
  }, [array, type, algorithm, isRunning, currentStep, steps]);

  const drawSortingVisualization = (
    ctx: CanvasRenderingContext2D,
    data: number[],
    width: number,
    height: number,
    step: number
  ) => {
    const barWidth = (width - 100) / data.length;
    const spacing = 2;
    const maxValue = Math.max(...data);

    data.forEach((value, index) => {
      const x = 50 + index * (barWidth + spacing);
      const barHeight = (value / maxValue) * (height - 100);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(x, height - 50 - barHeight, x, height - 50);
      
      // Highlight bars being compared
      if (steps[currentStep]?.comparing?.includes(index)) {
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#FFA500');
      } 
      // Highlight sorted portion
      else if (steps[currentStep]?.sorted?.includes(index)) {
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#45A049');
      }
      // Default color
      else {
        gradient.addColorStop(0, '#800000');
        gradient.addColorStop(1, '#4A0404');
      }
      
      ctx.fillStyle = gradient;
      
      // Add 3D effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Draw bar with rounded corners
      ctx.beginPath();
      ctx.moveTo(x + barWidth, height - 50);
      ctx.lineTo(x + barWidth, height - 50 - barHeight + 5);
      ctx.quadraticCurveTo(x + barWidth, height - 50 - barHeight, x + barWidth - 5, height - 50 - barHeight);
      ctx.lineTo(x + 5, height - 50 - barHeight);
      ctx.quadraticCurveTo(x, height - 50 - barHeight, x, height - 50 - barHeight + 5);
      ctx.lineTo(x, height - 50);
      ctx.fill();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      
      // Add value label
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, height - 55);
    });
  };

  const drawSearchingVisualization = (
    ctx: CanvasRenderingContext2D,
    data: number[],
    width: number,
    height: number,
    step: number
  ) => {
    const boxSize = Math.min((width - 100) / data.length, 60);
    const spacing = 10;
    const startX = (width - (data.length * (boxSize + spacing))) / 2;
    const startY = height / 2 - boxSize / 2;

    data.forEach((value, index) => {
      const x = startX + index * (boxSize + spacing);
      const y = startY;

      // Draw connection lines
      if (index < data.length - 1) {
        ctx.strokeStyle = '#4A0404';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + boxSize, y + boxSize / 2);
        ctx.lineTo(x + boxSize + spacing, y + boxSize / 2);
        ctx.stroke();
      }

      // Create gradient for box
      const gradient = ctx.createLinearGradient(x, y, x, y + boxSize);
      
      // Highlight current element being searched
      if (steps[currentStep]?.current === index) {
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#FFA500');
      }
      // Highlight found element
      else if (steps[currentStep]?.found === index) {
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#45A049');
      }
      // Highlight eliminated range
      else if (steps[currentStep]?.eliminated?.includes(index)) {
        gradient.addColorStop(0, '#FF6B6B');
        gradient.addColorStop(1, '#FF4949');
      }
      // Default color
      else {
        gradient.addColorStop(0, '#800000');
        gradient.addColorStop(1, '#4A0404');
      }

      // Draw box with shadow and rounded corners
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, boxSize, boxSize, 10);
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';

      // Draw value
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), x + boxSize / 2, y + boxSize / 2);
    });
  };

  const drawGraphVisualization = (
    ctx: CanvasRenderingContext2D,
    data: number[],
    width: number,
    height: number,
    step: number
  ) => {
    const nodes = new Set(data);
    const nodeRadius = 25;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    // Draw edges with animations
    ctx.strokeStyle = '#4A0404';
    ctx.lineWidth = 3;
    for (let i = 0; i < data.length; i += 2) {
      const angle1 = (i * 2 * Math.PI) / nodes.size;
      const angle2 = ((i + 1) * 2 * Math.PI) / nodes.size;
      const x1 = centerX + radius * Math.cos(angle1);
      const y1 = centerY + radius * Math.sin(angle1);
      const x2 = centerX + radius * Math.cos(angle2);
      const y2 = centerY + radius * Math.sin(angle2);
      
      // Animate edge if it's being traversed
      if (steps[currentStep]?.edge === i) {
        ctx.strokeStyle = '#FFD700';
        ctx.setLineDash([5, 5]);
      } else {
        ctx.strokeStyle = '#4A0404';
        ctx.setLineDash([]);
      }
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Draw nodes with effects
    Array.from(nodes).forEach((_, i) => {
      const angle = (i * 2 * Math.PI) / nodes.size;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Create radial gradient for 3D effect
      const gradient = ctx.createRadialGradient(
        x - 5, y - 5, 0,
        x, y, nodeRadius
      );

      // Set node color based on state
      if (steps[currentStep]?.current === i) {
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#FFA500');
      } else if (steps[currentStep]?.visited?.includes(i)) {
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#45A049');
      } else {
        gradient.addColorStop(0, '#800000');
        gradient.addColorStop(1, '#4A0404');
      }

      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      // Draw node
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';

      // Add node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), x, y);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-lg bg-card p-4 shadow-xl"
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full rounded-md bg-background"
      />
      <AnimatePresence>
        {steps[currentStep]?.message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg"
          >
            {steps[currentStep].message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}