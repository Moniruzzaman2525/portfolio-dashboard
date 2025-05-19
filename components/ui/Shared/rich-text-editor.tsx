"use client"

import type React from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, List, ListOrdered, Heading2, Undo, Redo, Code } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class:
                    "min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1 rounded-md border border-input bg-background p-1">
                <MenuButton
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    isActive={editor?.isActive("bold") ?? false}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    isActive={editor?.isActive("italic") ?? false}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor?.isActive("heading", { level: 2 }) ?? false}
                    title="Heading"
                >
                    <Heading2 className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    isActive={editor?.isActive("bulletList") ?? false}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    isActive={editor?.isActive("orderedList") ?? false}
                    title="Ordered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                    isActive={editor?.isActive("codeBlock") ?? false}
                    title="Code Block"
                >
                    <Code className="h-4 w-4" />
                </MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().undo().run()} title="Undo" disabled={!editor?.can().undo()}>
                    <Undo className="h-4 w-4" />
                </MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().redo().run()} title="Redo" disabled={!editor?.can().redo()}>
                    <Redo className="h-4 w-4" />
                </MenuButton>
            </div>
            <EditorContent editor={editor} className="prose prose-sm dark:prose-invert max-w-none" />
            {!editor?.isEmpty && editor?.getHTML() === "" && placeholder && (
                <p className="text-sm text-muted-foreground absolute top-[120px] left-[16px] pointer-events-none">
                    {placeholder}
                </p>
            )}
        </div>
    )
}

interface MenuButtonProps {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    title: string
    children: React.ReactNode
}

function MenuButton({ onClick, isActive, disabled, title, children }: MenuButtonProps) {
    return (
        <Toggle
            size="sm"
            pressed={isActive}
            onPressedChange={() => onClick()}
            disabled={disabled}
            title={title}
            className={cn("h-8 px-2", isActive && "bg-accent text-accent-foreground")}
        >
            {children}
        </Toggle>
    )
}
