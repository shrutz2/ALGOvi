import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AlgorithmGrid } from '@/components/AlgorithmGrid';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted">
        <Header />
        <main className="flex-1">
          <div className="container py-8">
            <AlgorithmGrid />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;