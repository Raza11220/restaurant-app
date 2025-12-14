import { Database, FileCode2, BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <Database className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">Restaurant Ordering System</h1>
              <p className="text-xs text-muted-foreground">Oracle SQL Database Project</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#script"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileCode2 className="w-4 h-4" />
              SQL Script
            </a>
            <a
              href="#schema"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Schema
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
