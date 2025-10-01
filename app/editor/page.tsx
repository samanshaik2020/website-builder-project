'use client'

import { useState } from 'react'
import { SlateEditor } from '@/components/slate-editor'
import { EnhancedSlateEditor } from '@/components/enhanced-slate-editor'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EditorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Slate.js Floating Toolbar Demo</h1>
        <p className="text-gray-600 mb-6">
          Two implementations of floating text toolbars using Slate.js. Select any text 
          in either editor to see the floating toolbar in action with different feature sets.
        </p>
      </div>
      
      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="enhanced">Enhanced Editor</TabsTrigger>
          <TabsTrigger value="basic">Basic Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced" className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-2 text-blue-900">Enhanced Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
              <li>Advanced floating toolbar with expandable sections</li>
              <li>Link insertion and editing with URL validation</li>
              <li>Text color picker with preset colors</li>
              <li>Text alignment controls (left, center, right)</li>
              <li>Automatic URL detection and link creation</li>
              <li>Enhanced keyboard shortcuts (Ctrl+K for links)</li>
              <li>Better visual design and animations</li>
            </ul>
          </div>
          <EnhancedSlateEditor />
        </TabsContent>
        
        <TabsContent value="basic" className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-2 text-green-900">Basic Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
              <li>Simple floating toolbar that appears on text selection</li>
              <li>Text formatting: Bold, Italic, Underline, Code</li>
              <li>Block formatting: Paragraph, Heading 1, Heading 2, Quote</li>
              <li>Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, etc.)</li>
              <li>Clean and minimal design</li>
              <li>Responsive positioning</li>
            </ul>
          </div>
          <SlateEditor />
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4">Implementation Details:</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">Key Technologies:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Slate.js - Powerful rich text editor framework</li>
              <li>React - Component-based UI</li>
              <li>TypeScript - Type safety and better DX</li>
              <li>Tailwind CSS - Utility-first styling</li>
              <li>Lucide React - Beautiful icons</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Toolbar Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Dynamic positioning based on text selection</li>
              <li>Prevents focus loss during toolbar interaction</li>
              <li>Smooth animations and transitions</li>
              <li>Responsive design for different screen sizes</li>
              <li>Extensible architecture for adding new tools</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}