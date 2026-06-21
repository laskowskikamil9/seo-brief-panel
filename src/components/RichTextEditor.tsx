"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-[320px] outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();

    if (value !== currentHtml) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rich-editor text-sm text-zinc-500">
        Ładowanie edytora...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2">
        <ToolbarButton
          label="P"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        />

        <ToolbarButton
          label="H1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        />

        <ToolbarButton
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />

        <ToolbarButton
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />

        <ToolbarButton
          label="B"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        <ToolbarButton
          label="I"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <ToolbarButton
          label="• Lista"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />

        <ToolbarButton
          label="1. Lista"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />

        <ToolbarButton
          label="Cytat"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />

        <ToolbarButton
          label="Cofnij"
          active={false}
          onClick={() => editor.chain().focus().undo().run()}
        />

        <ToolbarButton
          label="Ponów"
          active={false}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      <div className="rich-editor">
        <EditorContent editor={editor} />
      </div>

      <p className="text-xs leading-5 text-zinc-500">
        Wklej tekst bezpośrednio z Google Docs. Edytor powinien zachować podstawową
        strukturę: nagłówki, listy, pogrubienia i linki.
      </p>
    </div>
  );
}

function ToolbarButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
        active
          ? "bg-lime-400 text-black"
          : "border border-zinc-700 text-zinc-200 hover:border-lime-400 hover:text-lime-300"
      }`}
    >
      {label}
    </button>
  );
}