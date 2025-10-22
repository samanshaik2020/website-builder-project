'use client';

import React, { useState } from 'react';
import { ImageIcon, Edit } from 'lucide-react';
import { ImageSidebar } from './image-sidebar';

interface EditableImageProps {
  eid: string;
  defaultSrc?: string;
  alt?: string;
  className?: string;
  editable?: boolean;
  onChange?: (eid: string, imageUrl: string) => void;
  placeholderIcon?: React.ReactNode;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  eid,
  defaultSrc = '',
  alt = 'Image',
  className = '',
  editable = false,
  onChange,
  placeholderIcon,
}) => {
  const [imageSrc, setImageSrc] = useState(defaultSrc);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    setImageSrc(imageUrl);
    if (onChange) {
      onChange(eid, imageUrl);
    }
    setShowSidebar(false);
  };

  const handleClick = () => {
    if (editable) {
      setShowSidebar(true);
    }
  };

  if (!editable) {
    if (!imageSrc) {
      return (
        <div data-eid={eid} className={`flex items-center justify-center ${className}`}>
          {placeholderIcon || <ImageIcon size={48} className="text-slate-400" />}
        </div>
      );
    }
    return (
      <img
        data-eid={eid}
        src={imageSrc}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <>
      <div
        data-eid={eid}
        className={`relative group cursor-pointer ${className}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext fill="%23cbd5e1" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
              }}
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
                <div className="text-white text-center">
                  <Edit size={32} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">Click to change image</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-slate-800 border-2 border-dashed border-slate-600 rounded-lg hover:border-purple-500 transition-colors">
            {placeholderIcon || <ImageIcon size={48} className="text-slate-400 mb-2" />}
            <p className="text-slate-400 text-sm font-medium">Click to add image</p>
          </div>
        )}
      </div>

      <ImageSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onImageSelect={handleImageSelect}
        currentImageUrl={imageSrc}
      />
    </>
  );
};
