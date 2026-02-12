'use client';

import { useState, useRef, useEffect, FC, CSSProperties, MouseEvent, FormEvent, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link2, X } from 'lucide-react';

interface EditableButtonProps {
  eid: string;
  defaultText: string;
  defaultUrl?: string;
  className?: string;
  style?: CSSProperties;
  editable?: boolean;
  onChange?: ((eid: string, value: { button: { text: string; url: string } }) => void) | undefined;
}

export const EditableButton: FC<EditableButtonProps> = ({
  eid,
  defaultText,
  defaultUrl = '#',
  className = '',
  style,
  editable = false,
  onChange,
}) => {
  const [text, setText] = useState(defaultText);
  const [url, setUrl] = useState(defaultUrl);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setText(defaultText);
    setUrl(defaultUrl);
  }, [defaultText, defaultUrl]);

  const handleClick = (e: MouseEvent) => {
    if (editable) {
      e.preventDefault();
      e.stopPropagation();
      setShowUrlInput(true);
    }
  };

  const handleTextChange = (e: FormEvent<HTMLSpanElement>) => {
    const newText = e.currentTarget.textContent || '';
    setText(newText);
    if (onChange) {
      onChange(eid, { button: { text: newText, url } });
    }
  };

  const handleUrlSave = () => {
    if (onChange) {
      onChange(eid, { button: { text, url } });
    }
    setShowUrlInput(false);
  };

  const handleUrlCancel = () => {
    setUrl(defaultUrl);
    setShowUrlInput(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUrlSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleUrlCancel();
    }
  };

  useEffect(() => {
    if (showUrlInput && urlInputRef.current) {
      urlInputRef.current.focus();
      urlInputRef.current.select();
    }
  }, [showUrlInput]);

  if (!editable) {
    const handleButtonClick = (e: MouseEvent) => {
      e.preventDefault();

      // If URL is empty or just '#', do nothing
      if (!url || url === '#') {
        return;
      }

      // Open ALL button URLs in new tab (including anchor links)
      // Get the current page URL for anchor links
      if (url.startsWith('#')) {
        const currentUrl = window.location.href.split('#')[0];
        window.open(currentUrl + url, '_blank', 'noopener,noreferrer');
      } else {
        // For all other URLs (http://, https://, relative paths)
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    };

    return (
      <button
        data-eid={eid}
        className={className}
        style={style}
        onClick={handleButtonClick}
      >
        {text}
      </button>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        data-eid={eid}
        className={`${className} relative group`}
        style={style}
        onClick={handleClick}
      >
        <span
          contentEditable={editable}
          suppressContentEditableWarning
          onInput={handleTextChange}
          onBlur={handleTextChange}
          className="outline-none"
        >
          {text}
        </span>
        {editable && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <Link2 size={14} className="text-white" />
          </span>
        )}
      </button>

      {/* URL Input Modal - Use portal to render outside template DOM */}
      {mounted && showUrlInput && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-[10000] pt-32">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Edit Button Link</h3>
              <button
                onClick={handleUrlCancel}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Enter button text..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Link URL
                </label>
                <input
                  ref={urlInputRef}
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="https://example.com or #section"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Use # for anchor links (e.g., #contact) or full URLs
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUrlCancel}
                className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUrlSave}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
