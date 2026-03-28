'use client';

import { useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/constants';

// ── Toolbar Button ────────────────────────────────────────────────────────────
function ToolbarBtn({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`p-1.5 rounded-md transition-colors ${
        active
          ? 'bg-[#13a884] text-white'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}

// ── Toolbar Divider ───────────────────────────────────────────────────────────
function ToolbarDivider() {
  return <div className="w-px h-5 bg-gray-200 mx-1" />;
}

// ── Toolbar ───────────────────────────────────────────────────────────────────
function EditorToolbar({ editor }) {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (!url) return;
    editor.chain().focus().extendMarkToLink({ href: url }).setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50">
      {/* Text formatting */}
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
        <Bold size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
        <Italic size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
        <UnderlineIcon size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
        <Strikethrough size={15} />
      </ToolbarBtn>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
        <Heading1 size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
        <Heading2 size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
        <Heading3 size={15} />
      </ToolbarBtn>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
        <List size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
        <ListOrdered size={15} />
      </ToolbarBtn>

      <ToolbarDivider />

      {/* Blocks */}
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
        <Quote size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
        <Code size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider">
        <Minus size={15} />
      </ToolbarBtn>

      <ToolbarDivider />

      {/* Link & Image */}
      <ToolbarBtn onClick={addLink} active={editor.isActive('link')} title="Add Link">
        <LinkIcon size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={addImage} active={false} title="Insert Image">
        <ImageIcon size={15} />
      </ToolbarBtn>
    </div>
  );
}

// ── Main BlogEditor ───────────────────────────────────────────────────────────
export default function BlogEditor({
  mode = 'create',           // 'create' | 'edit'
  initialData = null,        // populated when mode === 'edit'
  meta,                      // { title, category, author, img, img2, img3 }
  onMetaChange,              // (field, value) => void
  onSaveDraft,               // async () => void
  onPublish,                 // async () => void
  isSaving = false,
  isPublishing = false,
  editorRef,                 // ref to get HTML content: editorRef.current.getHTML()
}) {
  const router = useRouter();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder: 'Start writing your blog post here...' }),
      CharacterCount,
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-8 py-6',
      },
    },
  });

  // Pre-fill editor content when editing an existing blog
  useEffect(() => {
    if (editor && initialData?.content) {
      editor.commands.setContent(initialData.content);
    }
  }, [editor, initialData]);

  // Expose getHTML via editorRef
  useEffect(() => {
    if (editorRef) {
      editorRef.current = {
        getHTML: () => editor?.getHTML() ?? '',
        isEmpty: () => editor?.isEmpty ?? true,
      };
    }
  }, [editor, editorRef]);

  // Live stats
  const wordCount = editor?.storage?.characterCount?.words() ?? 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleMetaChange = useCallback((e) => {
    const { name, value } = e.target;
    onMetaChange(name, value);
  }, [onMetaChange]);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 h-14 flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.push('/website-aaadminpanel/dashboard/blogs')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>
        <span className="text-gray-300">|</span>
        <span className="text-sm font-semibold text-gray-700">
          {mode === 'create' ? 'New Blog Post' : 'Edit Blog Post'}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Editor column ── */}
        <div className="flex-1 flex flex-col overflow-y-auto">

          {/* Title input */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-100">
            <input
              type="text"
              name="title"
              value={meta.title}
              onChange={handleMetaChange}
              placeholder="Blog title..."
              className="w-full text-3xl font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent"
            />
            <p className="text-xs text-gray-400 mt-2">Slug will be auto-generated from title</p>
          </div>

          {/* Toolbar */}
          <EditorToolbar editor={editor} />

          {/* TipTap editor */}
          <div className="flex-1 cursor-text" onClick={() => editor?.commands.focus()}>
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* ── Metadata sidebar ── */}
        <aside className="w-72 shrink-0 border-l border-gray-200 bg-gray-50 flex flex-col overflow-y-auto">

          {/* Stats */}
          <div className="px-5 py-4 border-b border-gray-200 flex gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">{wordCount.toLocaleString()}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wide">Words</div>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">{readTime}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wide">Min read</div>
            </div>
          </div>

          {/* Metadata fields */}
          <div className="px-5 py-5 space-y-4 flex-1">

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={meta.category}
                onChange={handleMetaChange}
                className="w-full bg-white text-gray-800 text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#13a884] transition-colors"
              >
                <option value="">Select category</option>
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Author <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={meta.author}
                onChange={handleMetaChange}
                placeholder="e.g. John Doe"
                className="w-full bg-white text-gray-800 text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#13a884] transition-colors placeholder:text-gray-400"
              />
            </div>

            {/* Cover image */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Cover Image URL
              </label>
              <input
                type="text"
                name="img"
                value={meta.img}
                onChange={handleMetaChange}
                placeholder="https://..."
                className="w-full bg-white text-gray-800 text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#13a884] transition-colors placeholder:text-gray-400"
              />
              {meta.img && (
                <div className="mt-2 rounded-lg overflow-hidden aspect-video bg-gray-100">
                  <img src={meta.img} alt="cover preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* img2 */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Inline Image 2 URL
              </label>
              <input
                type="text"
                name="img2"
                value={meta.img2}
                onChange={handleMetaChange}
                placeholder="https://..."
                className="w-full bg-white text-gray-800 text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#13a884] transition-colors placeholder:text-gray-400"
              />
            </div>

            {/* img3 */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Inline Image 3 URL
              </label>
              <input
                type="text"
                name="img3"
                value={meta.img3}
                onChange={handleMetaChange}
                placeholder="https://..."
                className="w-full bg-white text-gray-800 text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#13a884] transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-5 py-5 border-t border-gray-200 space-y-3">
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isSaving || isPublishing}
              className="w-full py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSaving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={onPublish}
              disabled={isSaving || isPublishing}
              className="w-full py-2.5 rounded-lg bg-[#13a884] hover:bg-[#0f8c6e] text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPublishing ? <><Loader2 size={14} className="animate-spin" /> Publishing...</> : 'Publish'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
