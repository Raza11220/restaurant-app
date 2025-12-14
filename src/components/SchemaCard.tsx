import { Database } from "lucide-react";

interface SchemaCardProps {
  title: string;
  description: string;
  columns: string[];
}

const SchemaCard = ({ title, description, columns }: SchemaCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Database className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {columns.map((col, index) => (
          <span
            key={index}
            className={`text-xs px-2 py-1 rounded-md ${
              col.includes("PK")
                ? "bg-primary/15 text-primary font-medium"
                : col.includes("FK")
                ? "bg-accent/15 text-accent font-medium"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {col}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SchemaCard;
