import { useMemo } from "react";
import { FileText, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectFile } from "@/hooks/useLocalProjectFiles";

type TreeNode =
  | { type: "folder"; name: string; path: string; children: TreeNode[] }
  | { type: "file"; name: string; path: string; file: ProjectFile };

function buildTree(files: ProjectFile[]): TreeNode[] {
  const root: { type: "folder"; name: string; path: string; children: TreeNode[] } = {
    type: "folder",
    name: "root",
    path: "",
    children: [],
  };

  const ensureFolder = (parent: TreeNode[], name: string, path: string) => {
    let existing = parent.find((n) => n.type === "folder" && n.name === name) as
      | Extract<TreeNode, { type: "folder" }>
      | undefined;
    if (!existing) {
      existing = { type: "folder", name, path, children: [] };
      parent.push(existing);
      parent.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === "folder" ? -1 : 1));
    }
    return existing;
  };

  for (const f of files) {
    const parts = f.path.split("/").filter(Boolean);
    let cursor = root.children;
    let accPath = "";
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      accPath = accPath ? `${accPath}/${part}` : part;
      const isLast = i === parts.length - 1;
      if (isLast) {
        cursor.push({ type: "file", name: part, path: accPath, file: f });
        cursor.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === "folder" ? -1 : 1));
      } else {
        const folder = ensureFolder(cursor, part, accPath);
        cursor = folder.children;
      }
    }
  }

  return root.children;
}

function FileNode({
  node,
  activePath,
  onSelect,
  depth,
}: {
  node: TreeNode;
  activePath: string;
  onSelect: (path: string) => void;
  depth: number;
}) {
  if (node.type === "file") {
    const active = node.file.path === activePath;
    return (
      <button
        type="button"
        onClick={() => onSelect(node.file.path)}
        className={cn(
          "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
          active
            ? "bg-accent text-foreground"
            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        )}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <FileText className="h-4 w-4 shrink-0 opacity-70" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  // folder (simple always-open tree like Lovable)
  return (
    <div>
      <div
        className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground"
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        {node.children.length > 0 ? (
          <FolderOpen className="h-4 w-4 opacity-70" />
        ) : (
          <Folder className="h-4 w-4 opacity-70" />
        )}
        <span className="truncate">{node.name}</span>
      </div>
      <div>
        {node.children.map((c) => (
          <FileNode key={c.path} node={c} activePath={activePath} onSelect={onSelect} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}

export default function FileTree({
  files,
  activePath,
  onSelect,
}: {
  files: ProjectFile[];
  activePath: string;
  onSelect: (path: string) => void;
}) {
  const tree = useMemo(() => buildTree(files), [files]);

  return (
    <div className="h-full overflow-auto px-1 py-2">
      {tree.map((n) => (
        <FileNode key={n.path} node={n} activePath={activePath} onSelect={onSelect} depth={0} />
      ))}
    </div>
  );
}
