"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableText } from "../shared/editable"

export function EmptyTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      {/* Main Section */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center space-y-6">
          {/* Heading */}
          <EditableText
            id="empty-heading"
            as="h1"
            className="text-4xl md:text-5xl font-bold text-gray-900"
            editable={editable}
            {...props}
          >
            Your Heading Text Here
          </EditableText>

          {/* Paragraph */}
          <EditableText
            id="empty-paragraph"
            as="p"
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            Add your paragraph text here. This is a simple template to get you started. You can customize everything to match your needs.
          </EditableText>

          {/* Button */}
          <div className="pt-4">
            <EditableButton
              id="empty-button"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition-colors"
              editable={editable}
              {...props}
            >
              Click Here
            </EditableButton>
          </div>
        </div>
      </section>
    </main>
  )
}
