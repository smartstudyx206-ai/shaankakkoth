import { useCallback, useEffect, useMemo, useState } from "react";

export type ProjectFileLanguage = "typescript" | "tsx" | "json" | "markdown" | "arduino" | "text";

export interface ProjectFile {
  path: string; // e.g. src/App.tsx or arduino/blink.ino
  content: string;
  language: ProjectFileLanguage;
}

export interface LocalProjectState {
  files: ProjectFile[];
  activePath: string;
}

const STORAGE_KEY = "faraday.localProject.v1";

const DEFAULT_STATE: LocalProjectState = {
  files: [
    {
      path: "src/App.tsx",
      language: "tsx",
      content: `import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
`,
    },
    {
      path: "arduino/blink.ino",
      language: "arduino",
      content: `// Blink (Arduino)
// Built-in LED is usually on pin 13, or use LED_BUILTIN.

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
`,
    },
  ],
  activePath: "src/App.tsx",
};

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function inferLanguageFromPath(path: string): ProjectFileLanguage {
  const lower = path.toLowerCase();
  if (lower.endsWith(".tsx")) return "tsx";
  if (lower.endsWith(".ts")) return "typescript";
  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".md")) return "markdown";
  if (lower.endsWith(".ino")) return "arduino";
  return "text";
}

export function useLocalProjectFiles() {
  const [state, setState] = useState<LocalProjectState>(DEFAULT_STATE);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = safeJsonParse<LocalProjectState>(raw);
    if (!parsed?.files?.length || !parsed.activePath) return;
    setState({
      files: parsed.files.map((f) => ({
        ...f,
        language: f.language ?? inferLanguageFromPath(f.path),
      })),
      activePath: parsed.activePath,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activeFile = useMemo(
    () => state.files.find((f) => f.path === state.activePath) ?? state.files[0],
    [state.files, state.activePath]
  );

  const setActivePath = useCallback((path: string) => {
    setState((prev) => ({
      ...prev,
      activePath: prev.files.some((f) => f.path === path) ? path : prev.activePath,
    }));
  }, []);

  const upsertFile = useCallback((file: ProjectFile) => {
    setState((prev) => {
      const idx = prev.files.findIndex((f) => f.path === file.path);
      const nextFile: ProjectFile = {
        ...file,
        language: file.language ?? inferLanguageFromPath(file.path),
      };
      const nextFiles = idx === -1
        ? [nextFile, ...prev.files]
        : prev.files.map((f, i) => (i === idx ? nextFile : f));
      return {
        ...prev,
        files: nextFiles,
        activePath: file.path,
      };
    });
  }, []);

  const updateActiveContent = useCallback((content: string) => {
    setState((prev) => ({
      ...prev,
      files: prev.files.map((f) => (f.path === prev.activePath ? { ...f, content } : f)),
    }));
  }, []);

  const replaceAll = useCallback((next: LocalProjectState) => {
    setState(next);
  }, []);

  return {
    files: state.files,
    activePath: state.activePath,
    activeFile,
    setActivePath,
    upsertFile,
    updateActiveContent,
    replaceAll,
  };
}
