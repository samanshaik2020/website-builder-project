"use client"

type GetText = (id: string, fallback?: string) => string
type GetButton = (id: string) => { href: string; text: string }

/**
 * Helper function to escape HTML
 */
function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Generates HTML for Empty Template
 */
export function generateEmptyHTML(
    getText: GetText,
    getButton: GetButton
): string {
    const button = getButton("empty-button")

    return `
    <main class="bg-white text-gray-900 min-h-screen">
      <!-- Main Section -->
      <section class="mx-auto max-w-4xl px-4 py-16">
        <div class="text-center space-y-6">
          <!-- Heading -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
            ${escapeHtml(getText("empty-heading", "Your Heading Text Here"))}
          </h1>

          <!-- Paragraph -->
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            ${escapeHtml(getText("empty-paragraph", "Add your paragraph text here. This is a simple template to get you started. You can customize everything to match your needs."))}
          </p>

          <!-- Button -->
          <div class="pt-4">
            <a href="${escapeHtml(button.href)}" class="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition-colors inline-block">
              ${escapeHtml(button.text)}
            </a>
          </div>
        </div>
      </section>
    </main>
  `
}
