import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © 2024 AlgoViz. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-transparent p-2 hover:bg-accent"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-transparent p-2 hover:bg-accent"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
}