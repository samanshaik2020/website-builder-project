# Script to convert remaining contentEditable elements to TiptapEditableText
$filePath = "components\templates\portfolio\default.tsx"

$content = Get-Content $filePath -Raw

# Pattern 1: Convert span with contentEditable
$pattern1 = '(?s)<span\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\(''([^'']+)'',\s*''([^'']+)''\)\}\s*</span>'
$replace1 = '<TiptapEditableText
                      eid="$1"
                      defaultText={getText(''$3'', ''$4'')}
                      className="$2"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />'
$content = $content -replace $pattern1, $replace1

# Pattern 2: Convert h3/h4/p with contentEditable
$pattern2 = '(?s)<(h3|h4|h5|p|div)\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\(''([^'']+)'',\s*''([^'']+)''\)\}\s*</(h3|h4|h5|p|div)>'
$replace2 = '<TiptapEditableText
                    eid="$2"
                    defaultText={getText(''$4'', ''$5'')}
                    className="$3"
                    editable={editable}
                    onChange={handleTextChange}
                    as="$1"
                  />'
$content = $content -replace $pattern2, $replace2

# Save the modified content
$content | Set-Content $filePath -NoNewline

Write-Host "Conversion complete!"
