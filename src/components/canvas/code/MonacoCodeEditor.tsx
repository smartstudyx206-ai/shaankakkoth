import Editor from "@monaco-editor/react";
import type { ProjectFileLanguage } from "@/hooks/useLocalProjectFiles";

function toMonacoLanguage(lang: ProjectFileLanguage) {
  switch (lang) {
    case "tsx":
      return "typescript";
    case "typescript":
      return "typescript";
    case "json":
      return "json";
    case "markdown":
      return "markdown";
    case "arduino":
      // closest built-in: C++
      return "cpp";
    default:
      return "plaintext";
  }
}

export default function MonacoCodeEditor({
  value,
  onChange,
  language,
}: {
  value: string;
  onChange: (next: string) => void;
  language: ProjectFileLanguage;
}) {
  return (
    <Editor
      height="100%"
      language={toMonacoLanguage(language)}
      value={value}
      theme="vs-dark"
      onChange={(v) => onChange(v ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        lineHeight: 20,
        wordWrap: "on",
        scrollBeyondLastLine: false,
        renderLineHighlight: "all",
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
      }}
    />
  );
}
