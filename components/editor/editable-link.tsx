'use client';

import React from 'react';

interface EditableLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  editable?: boolean;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  href,
  children,
  className = '',
  editable = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // In edit mode, don't navigate
    if (editable) {
      return;
    }
    
    // Handle anchor links (smooth scroll)
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } 
    // Handle external URLs (open in new tab)
    else if (href.startsWith('http://') || href.startsWith('https://')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    // Handle relative URLs (navigate in same window)
    else {
      window.location.href = href;
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
