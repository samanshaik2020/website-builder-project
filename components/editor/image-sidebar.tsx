'use client';

import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface ImageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string, linkUrl?: string) => void;
  currentImageUrl?: string;
  currentLinkUrl?: string;
}

export const ImageSidebar: React.FC<ImageSidebarProps> = ({
  isOpen,
  onClose,
  onImageSelect,
  currentImageUrl = '',
  currentLinkUrl = '',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('url');
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [linkUrl, setLinkUrl] = useState(currentLinkUrl);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        onImageSelect(result, linkUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      onImageSelect(imageUrl, linkUrl);
    }
  };

  const handleRemoveImage = () => {
    onImageSelect('', '');
    setImageUrl('');
    setLinkUrl('');
    setUploadedImage(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-slate-900 border-l border-slate-700 z-50 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageIcon className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Image Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'url'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <LinkIcon size={18} className="inline mr-2" />
              URL
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Upload size={18} className="inline mr-2" />
              Upload
            </button>
          </div>

          {/* URL Tab */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={handleUrlSubmit}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-colors"
              >
                Apply Image
              </button>
            </div>
          )}

          {/* Link URL Section */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <LinkIcon size={16} className="text-purple-400" />
              Image Link (Optional)
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Add a clickable link to this image. When shared, clicking the image will open this URL.
            </p>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {linkUrl && (
              <button
                onClick={() => {
                  // Apply link to current image
                  const currentSrc = uploadedImage || imageUrl || currentImageUrl;
                  if (currentSrc) {
                    onImageSelect(currentSrc, linkUrl);
                  }
                }}
                className="w-full mt-3 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Apply Link
              </button>
            )}
          </div>

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="text-slate-400 mb-4" size={48} />
                  <p className="text-white font-medium mb-2">
                    Click to upload image
                  </p>
                  <p className="text-slate-400 text-sm">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>

              {uploadedImage && (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage}
                    alt="Uploaded preview"
                    className="w-full rounded-lg"
                  />
                  <p className="text-green-400 text-sm mt-2 text-center">
                    ✓ Image uploaded successfully
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Current Image Preview */}
          {(currentImageUrl || uploadedImage || imageUrl) && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-3">
                Current Image
              </h3>
              <div className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedImage || imageUrl || currentImageUrl}
                  alt="Current"
                  className="w-full rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext fill="%23cbd5e1" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
                  }}
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 p-4 bg-slate-800 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">💡 Tips</h4>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Use high-quality images for best results</li>
              <li>• Recommended size: 1200x800px</li>
              <li>• Supported formats: JPG, PNG, GIF, WebP</li>
              <li>• Images are stored as base64 or URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
