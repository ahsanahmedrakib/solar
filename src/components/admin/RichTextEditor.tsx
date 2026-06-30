"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEditor, EditorContent, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  ImageIcon,
  Strikethrough,
  Undo,
  Redo,
  Quote,
  Code,
} from "lucide-react";
import { useCallback, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

function MenuButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded transition cursor-pointer ${
        active
          ? "bg-(--admin-accent-muted) text-(--admin-accent)"
          : "text-(--admin-text-secondary) hover:bg-(--admin-surface-2) hover:text-(--admin-text-primary)"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  label,
  error,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
    ],
    content: value as Content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-3 text-sm text-(--admin-text-primary)",
      },
    },
  });

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        editor?.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, [editor]);

  const handleLinkClick = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href || "";
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value as Content, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
          {label} *
        </label>
      )}
      <div
        className={`border rounded-lg overflow-hidden ${
          error ? "border-(--admin-danger)" : "border-(--admin-border)"
        }`}
      >
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-(--admin-border) bg-(--admin-surface-2)">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold size={15} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic size={15} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          >
            <Strikethrough size={15} />
          </MenuButton>

          <span className="w-px h-5 bg-(--admin-border) mx-1" />

          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
          >
            <Heading1 size={15} />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 size={15} />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            <Heading3 size={15} />
          </MenuButton>

          <span className="w-px h-5 bg-(--admin-border) mx-1" />

          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List size={15} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered size={15} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <Quote size={15} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
          >
            <Code size={15} />
          </MenuButton>

          <span className="w-px h-5 bg-(--admin-border) mx-1" />

          <MenuButton onClick={handleImageUpload} active={false}>
            <ImageIcon size={15} />
          </MenuButton>
          <MenuButton
            onClick={handleLinkClick}
            active={editor.isActive("link")}
          >
            <LinkIcon size={15} />
          </MenuButton>

          <span className="w-px h-5 bg-(--admin-border) mx-1" />

          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            active={false}
          >
            <Undo size={15} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            active={false}
          >
            <Redo size={15} />
          </MenuButton>
        </div>

        <EditorContent editor={editor} />
      </div>

      {error && (
        <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-(--admin-danger)" /> {error}
        </span>
      )}
    </div>
  );
}
