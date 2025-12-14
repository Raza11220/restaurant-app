import { Database, FileCode2, Table, Layers, GitBranch, Terminal } from "lucide-react";
import Header from "@/components/Header";
import CodeBlock from "@/components/CodeBlock";
import SchemaCard from "@/components/SchemaCard";
import QueryCard from "@/components/QueryCard";
import { oracleSqlScript, schemaExplanation, sampleQueries } from "@/data/sqlScript";

const Index = () => {
  const features = [
    { icon: Table, label: "7 Tables", description: "Fully normalized to 3NF" },
    { icon: Layers, label: "7 Sequences", description: "Auto-increment IDs" },
    { icon: GitBranch, label: "8 Triggers", description: "Automated processes" },
    { icon: Database, label: "3 Views", description: "Pre-built reports" },
    { icon: FileCode2, label: "3 Functions", description: "Reusable logic" },
    { icon: Terminal, label: "4 Procedures", description: "Business operations" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Database className="w-4 h-4" />
            3rd Semester Database Project
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Restaurant Ordering System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A complete Oracle SQL database solution with tables, sequences, triggers, views, 
            functions, and stored procedures. Ready for your university project.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="font-semibold text-sm text-foreground">{feature.label}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SQL Script Section */}
      <section id="script" className="py-12 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileCode2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Complete SQL Script</h2>
              <p className="text-sm text-muted-foreground">Copy or download the entire script</p>
            </div>
          </div>
          <CodeBlock code={oracleSqlScript} title="restaurant_ordering_system.sql" />
        </div>
      </section>

      {/* Schema Section */}
      <section id="schema" className="py-12 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Table className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Schema Explanation</h2>
              <p className="text-sm text-muted-foreground">Understanding the database structure</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemaExplanation.map((table, index) => (
              <SchemaCard
                key={index}
                title={table.title}
                description={table.description}
                columns={table.columns}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sample Queries Section */}
      <section className="py-12 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Sample Queries</h2>
              <p className="text-sm text-muted-foreground">Ready-to-use demo queries</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {sampleQueries.map((query, index) => (
              <QueryCard
                key={index}
                title={query.title}
                query={query.query}
                description={query.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ER Diagram Section */}
      <section className="py-12 px-4 border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Entity Relationships</h2>
              <p className="text-sm text-muted-foreground">How tables connect</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Customer Orders
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Customers → Orders (1:N)</li>
                  <li>• Each customer can place multiple orders</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  Order Processing
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Employees → Orders (1:N)</li>
                  <li>• Orders → Order_Items (1:N)</li>
                  <li>• Orders → Payments (1:1)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Menu Structure
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Menu_Categories → Menu_Items (1:N)</li>
                  <li>• Menu_Items → Order_Items (1:N)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground">
            Restaurant Ordering System — Oracle SQL Database Project
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Designed for 3rd Semester University Database Course
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
