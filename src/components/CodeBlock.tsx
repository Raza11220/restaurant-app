import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ code, title, showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "restaurant_ordering_system.sql";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const highlightSQL = (text: string) => {
    const keywords = /\b(CREATE|TABLE|VIEW|SEQUENCE|TRIGGER|FUNCTION|PROCEDURE|INSERT|INTO|VALUES|SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|NULL|PRIMARY|FOREIGN|KEY|UNIQUE|CHECK|CONSTRAINT|DEFAULT|REFERENCES|DROP|ALTER|UPDATE|DELETE|SET|AS|BEGIN|END|IF|THEN|ELSE|ELSIF|LOOP|FOR|WHILE|RETURN|DECLARE|IS|IN|OUT|NUMBER|VARCHAR2|CHAR|DATE|TIMESTAMP|COMMIT|ROLLBACK|EXCEPTION|WHEN|RAISE|INTO|RETURNING|ORDER|BY|GROUP|HAVING|DISTINCT|COUNT|SUM|AVG|MAX|MIN|NVL|TRUNC|ROUND|SYSDATE|SYSTIMESTAMP|DUAL|NEXTVAL|CURRVAL|ROWCOUNT|DBMS_OUTPUT|PUT_LINE|RAISE_APPLICATION_ERROR|CASCADE|REPLACE|LIKE|BETWEEN|EXISTS|ALL|ANY|NULLS|LAST|DESC|ASC)\b/gi;
    const strings = /('[^']*')/g;
    const comments = /(--.*$)/gm;
    const numbers = /\b(\d+\.?\d*)\b/g;
    const functions = /\b(fn_\w+|sp_\w+|trg_\w+|vw_\w+|seq_\w+)\b/gi;

    return text
      .replace(comments, '<span class="sql-comment">$1</span>')
      .replace(strings, '<span class="sql-string">$1</span>')
      .replace(keywords, '<span class="sql-keyword">$1</span>')
      .replace(functions, '<span class="sql-function">$1</span>')
      .replace(numbers, '<span class="sql-number">$1</span>');
  };

  const lines = code.split("\n");

  return (
    <div className="code-block rounded-xl overflow-hidden border border-border/20">
      {title && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/20 bg-secondary/5">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download
            </Button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto scrollbar-thin">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="code-content">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none pr-4 text-right w-12 text-muted-foreground/50 flex-shrink-0">
                    {index + 1}
                  </span>
                )}
                <span
                  dangerouslySetInnerHTML={{ __html: highlightSQL(line) || "&nbsp;" }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
