'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, TextField, IconButton } from '@mui/material';
import { Code as CodeIcon, Upload as UploadIcon, OpenInFull as OpenInFullIcon, CloseFullscreen as CloseFullscreenIcon } from '@mui/icons-material';

interface CustomHtmlProps {
    editable?: boolean;
    data?: Record<string, any>;
    onContentChange?: (eid: string, value: any) => void;
}

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Custom Website</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 3rem;
            border-radius: 1rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Custom HTML!</h1>
        <p>Replace this code with your own HTML, CSS, and JS.</p>
    </div>
</body>
</html>`;

export default function CustomHtmlTemplate({ editable = false, data = {}, onContentChange }: CustomHtmlProps) {
    const customHtml = data.custom_html?.code || defaultHtml;
    const [localCode, setLocalCode] = useState(customHtml);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (data.custom_html?.code) {
            setLocalCode(data.custom_html.code);
        }
    }, [data.custom_html?.code]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        setLocalCode(newCode);
        if (onContentChange) {
            onContentChange('custom_html', { code: newCode });
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setLocalCode(content);
                if (onContentChange) {
                    onContentChange('custom_html', { code: content });
                }
            };
            reader.readAsText(file);
        }
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        if (!editable) return;

        const handleMessage = (event: MessageEvent) => {
            if (event.source !== iframeRef.current?.contentWindow) return;

            if (event.data?.type === 'CUSTOM_HTML_UPDATE') {
                const newCode = event.data.code;
                setLocalCode(newCode); // keep local text editor in sync
                if (onContentChange) {
                    onContentChange('custom_html', { code: newCode });
                }
            } else if (event.data?.type === 'CUSTOM_HTML_SELECT') {
                const textToFind = event.data.text;
                if (textToFind && textAreaRef.current) {
                    // We search the local code for exactly the selected string
                    const index = localCode.indexOf(textToFind);
                    if (index !== -1) {
                        const textArea = textAreaRef.current;
                        textArea.focus();
                        textArea.setSelectionRange(index, index + textToFind.length);

                        // Magic autoscroll algorithm for exact line height positioning
                        const textBeforeSelection = localCode.substring(0, index);
                        const linesBefore = (textBeforeSelection.match(/\n/g) || []).length;

                        // Roughly 20.8px per line height based on 1.6 line height and 13px font
                        const scrollPosition = (linesBefore * 20.8) - (textArea.clientHeight / 2);
                        textArea.scrollTop = scrollPosition;
                    }
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [editable, onContentChange]);

    const injectEditorCode = (code: string) => {
        if (!editable) return code;

        // We inject a script at the end of the body to enable Visual Click-to-Edit
        const scriptToInject = `
            <script id="editor-injected-script">
                document.addEventListener('DOMContentLoaded', () => {
                    document.querySelectorAll('[data-eid]').forEach(el => {
                        el.setAttribute('contenteditable', 'true');
                        el.style.outline = '1px dashed rgba(147, 51, 234, 0.4)';
                        el.style.cursor = 'text';
                        el.style.transition = 'outline 0.2s ease';
                        
                        el.addEventListener('focus', () => {
                            el.style.outline = '2px solid rgba(147, 51, 234, 0.8)';
                        });
                        
                        el.addEventListener('blur', () => {
                            el.style.outline = '1px dashed rgba(147, 51, 234, 0.4)';
                            
                            // Prepare clean HTML to send back by cloning
                            const docClone = document.documentElement.cloneNode(true);
                            
                            // Target the clones to strip out the editor attributes
                            docClone.querySelectorAll('[data-eid]').forEach(c => {
                               c.removeAttribute('contenteditable');
                               c.style.outline = '';
                               c.style.cursor = '';
                               c.style.transition = '';
                               if (c.getAttribute('style') === '') c.removeAttribute('style');
                            });
                            
                            const scriptNode = docClone.querySelector('#editor-injected-script');
                            if(scriptNode) scriptNode.remove();
                            
                            const finalCode = "<!DOCTYPE html>\\n" + docClone.outerHTML;
                            window.parent.postMessage({ type: 'CUSTOM_HTML_UPDATE', code: finalCode }, '*');
                        });
                        
                        // Handle Link / Button URLs on Double Click
                        el.addEventListener('dblclick', (e) => {
                            const isAnchor = el.tagName === 'A';
                            // Try to find if the element itself or a parent has a link
                            if (isAnchor || el.hasAttribute('href') || el.hasAttribute('data-url')) {
                                e.stopPropagation(); // prevent triggering other double clicks
                                const currentUrl = el.getAttribute('href') || el.getAttribute('data-url') || '#';
                                const newUrl = window.prompt("Developer Tools \\nEnter new URL for this link/button:", currentUrl);
                                if (newUrl !== null) {
                                    if(isAnchor || el.hasAttribute('href')) el.setAttribute('href', newUrl);
                                    if(el.hasAttribute('data-url')) el.setAttribute('data-url', newUrl);
                                    el.blur(); // Trigger a save blur event immediately
                                }
                            }
                        });
                    });
                    
                    // Listen for text selection to highlight in code editor
                    document.addEventListener('mouseup', () => {
                        const selectedText = window.getSelection().toString();
                        if (selectedText && selectedText.trim().length > 0) {
                            window.parent.postMessage({ type: 'CUSTOM_HTML_SELECT', text: selectedText }, '*');
                        }
                    });
                });
            </script>
        `;

        if (code.includes('</body>')) {
            return code.replace('</body>', scriptToInject + '</body>');
        }
        return code + scriptToInject;
    };

    const iframeRef = useRef<HTMLIFrameElement>(null);

    // If we are in view mode (public page)
    if (!editable) {
        return (
            <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', bgcolor: '#fff' }}>
                <iframe
                    ref={iframeRef}
                    srcDoc={localCode}
                    style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
                    title="Custom HTML Content"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
            </Box>
        );
    }

    // Editable Mode (Side-by-Side Editor & Preview)
    return (
        <Box sx={{ width: '100%', height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a' }}>
            {/* Header Section */}
            <Box sx={{ p: { xs: 2, md: 3 }, borderBottom: '1px solid #334155', bgcolor: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1, bgcolor: 'rgba(59, 130, 246, 0.1)', borderRadius: 2, display: 'flex', color: '#3b82f6' }}>
                        <CodeIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', lineHeight: 1.2 }}>
                            Custom HTML Editor
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            Paste your code or upload an .html file directly. Content is updated live.
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ bgcolor: 'rgba(147, 51, 234, 0.15)', color: '#c084fc', px: 2, py: 0.75, borderRadius: 1.5, fontSize: 13, fontWeight: 500, display: { xs: 'none', lg: 'flex' }, alignItems: 'center', border: '1px solid rgba(147, 51, 234, 0.3)' }}>
                        ✨ Visual Clicking & Editing Enabled
                    </Box>
                    <input
                        type="file"
                        accept=".html, .htm, .txt"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <Button
                        variant="contained"
                        startIcon={<UploadIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                            bgcolor: '#3b82f6',
                            '&:hover': { bgcolor: '#2563eb' },
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2
                        }}
                    >
                        Upload HTML File
                    </Button>
                    <IconButton
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        sx={{
                            color: '#94a3b8',
                            border: '1px solid #334155',
                            borderRadius: 2,
                            '&:hover': { color: '#f8fafc', bgcolor: '#334155' }
                        }}
                        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
                    >
                        {isFullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                    </IconButton>
                </Box>
            </Box>

            {/* Side-by-Side Workspace */}
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Code Editor (Left) - Hides when fullscreen */}
                {!isFullscreen && (
                    <Box sx={{ flex: 1, borderRight: { md: '1px solid #334155' }, borderBottom: { xs: '1px solid #334155', md: 'none' }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <TextField
                            inputRef={textAreaRef}
                            multiline
                            fullWidth
                            value={localCode}
                            onChange={handleCodeChange}
                            placeholder="<html>\n  <body>\n    <h1>My Website</h1>\n  </body>\n</html>"
                            variant="outlined"
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                '& .MuiOutlinedInput-root': {
                                    color: '#fbbf24',
                                    fontFamily: '"Fira Code", "Source Code Pro", monospace',
                                    fontSize: '13px',
                                    bgcolor: '#0f172a',
                                    lineHeight: 1.6,
                                    padding: '16px',
                                    height: '100%',
                                    alignItems: 'flex-start',
                                    '& fieldset': { border: 'none' },
                                },
                            }}
                        />
                    </Box>
                )}

                {/* Live Preview (Right) */}
                <Box sx={{ flex: 1, bgcolor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
                    <iframe
                        ref={iframeRef}
                        srcDoc={injectEditorCode(localCode)}
                        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                        title="Custom HTML Content Live Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                </Box>
            </Box>
        </Box>
    );
}
