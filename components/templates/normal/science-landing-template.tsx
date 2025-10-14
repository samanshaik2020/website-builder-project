"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function ScienceLandingTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Top Header */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="mx-auto max-w-6xl">
          <EditableText
            id="sl-top-heading"
            as="p"
            className="text-center text-sm text-gray-600"
            editable={editable}
            {...props}
          >
            Add Your Heading Text Here
          </EditableText>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="text-center">
          <EditableText
            id="sl-hero-title"
            as="h1"
            className="text-4xl md:text-5xl font-bold mb-6"
            editable={editable}
            {...props}
          >
            welcome to landing page
          </EditableText>
          
          <EditableText
            id="sl-hero-subtitle"
            as="h2"
            className="text-2xl md:text-3xl font-semibold mb-4"
            editable={editable}
            {...props}
          >
            Add Your Heading Text Here Add Your Heading Text HereAdd Your Heading Text HereAdd Your Heading
          </EditableText>

          <EditableText
            id="sl-hero-description"
            as="p"
            className="mx-auto max-w-4xl text-base leading-relaxed text-gray-700 mb-8"
            editable={editable}
            {...props}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </EditableText>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <EditableImage
            id="sl-main-image"
            src="/placeholder.svg?height=400&width=700&query=brain science"
            alt="The Science of Sleep"
            className="mx-auto w-full max-w-3xl rounded-lg shadow-lg"
            editable={editable}
            {...props}
          />
        </div>

        {/* CTA Button */}
        <div className="text-center mb-12">
          <EditableButton
            id="sl-cta-1"
            className="bg-gray-600 text-white hover:bg-gray-700 px-6 py-3 rounded"
            editable={editable}
            {...props}
          >
            Click here
          </EditableButton>
        </div>

        {/* Description Section */}
        <div className="mb-12">
          <EditableText
            id="sl-description"
            as="p"
            className="text-base leading-relaxed text-gray-700 mb-6"
            editable={editable}
            {...props}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </EditableText>
        </div>

        {/* Content Heading */}
        <div className="text-center mb-8">
          <EditableText
            id="sl-content-heading"
            as="h3"
            className="text-2xl md:text-3xl font-semibold mb-6"
            editable={editable}
            {...props}
          >
            Add Your Heading Text Here
          </EditableText>

          <EditableText
            id="sl-content-description"
            as="p"
            className="text-base text-gray-700 mb-8"
            editable={editable}
            {...props}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </EditableText>
        </div>

        {/* Bullet Points */}
        <div className="mx-auto max-w-3xl mb-12">
          <ul className="space-y-4">
            {[1, 2, 3].map((n) => (
              <li key={n} className="flex items-start">
                <span className="mr-3 text-gray-600">•</span>
                <EditableText
                  id={`sl-bullet-${n}`}
                  as="p"
                  className="text-base text-gray-700"
                  editable={editable}
                  {...props}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </EditableText>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Heading and CTA */}
        <div className="text-center mb-12">
          <EditableText
            id="sl-bottom-heading"
            as="h3"
            className="text-2xl md:text-3xl font-semibold mb-6"
            editable={editable}
            {...props}
          >
            Add Your Heading Text Here
          </EditableText>

          <EditableButton
            id="sl-cta-2"
            className="bg-gray-600 text-white hover:bg-gray-700 px-6 py-3 rounded"
            editable={editable}
            {...props}
          >
            Click here
          </EditableButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <EditableText
                id="sl-footer-1"
                as="h4"
                className="text-sm font-semibold mb-2"
                editable={editable}
                {...props}
              >
                affiliate desclimination
              </EditableText>
            </div>
            <div>
              <EditableText
                id="sl-footer-2"
                as="h4"
                className="text-sm font-semibold mb-2"
                editable={editable}
                {...props}
              >
                terms and conditions
              </EditableText>
            </div>
            <div>
              <EditableText
                id="sl-footer-3"
                as="h4"
                className="text-sm font-semibold mb-2"
                editable={editable}
                {...props}
              >
                policy
              </EditableText>
            </div>
            <div>
              <EditableText
                id="sl-footer-4"
                as="h4"
                className="text-sm font-semibold mb-2"
                editable={editable}
                {...props}
              >
                about us
              </EditableText>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
