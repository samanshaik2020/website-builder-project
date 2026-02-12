# PowerShell script to convert all remaining contentEditable elements to TiptapEditableText
$filePath = "components\templates\portfolio\default.tsx"

Write-Host "Reading file: $filePath" -ForegroundColor Cyan
$content = Get-Content $filePath -Raw

# Count initial contentEditable instances
$initialCount = ([regex]::Matches($content, 'contentEditable')).Count
Write-Host "Found $initialCount contentEditable instances to convert" -ForegroundColor Yellow

# Pattern 1: Inline span with data-eid, contentEditable, suppressContentEditableWarning, className
# Example: <span data-eid="..." contentEditable={editable} suppressContentEditableWarning className="...">{getText(...)}</span>
$pattern1 = '(?s)<span\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\(''([^'']+)'',\s*''([^'']*)''\)\}\s*</span>'
$content = $content -replace $pattern1, {
    param($match)
    $eid = $match.Groups[1].Value
    $className = $match.Groups[2].Value
    $getTextId = $match.Groups[3].Value
    $defaultText = $match.Groups[4].Value
    
    # Remove whitespace-pre-wrap and break-words from className as TiptapEditableText handles this
    $className = $className -replace '\s*whitespace-pre-wrap\s*', '' -replace '\s*break-words\s*', '' -replace '\s+', ' ' -replace '^\s+|\s+$', ''
    
    return @"
<TiptapEditableText
                      eid="$eid"
                      defaultText={getText('$getTextId', '$defaultText')}
                      className="$className"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
"@
}

# Pattern 2: Block elements (h3, h4, h5, p, div) with data-eid
# Example: <h3 data-eid="..." contentEditable={editable} suppressContentEditableWarning className="...">{getText(...)}</h3>
$blockTags = @('h3', 'h4', 'h5', 'p', 'div')
foreach ($tag in $blockTags) {
    $pattern = "(?s)<$tag\s+data-eid=`"([^`"]+)`"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className=`"([^`"]+)`"\s*>\s*\{getText\('([^']+)',\s*'([^']*)'\)\}\s*</$tag>"
    $content = $content -replace $pattern, {
        param($match)
        $eid = $match.Groups[1].Value
        $className = $match.Groups[2].Value
        $getTextId = $match.Groups[3].Value
        $defaultText = $match.Groups[4].Value
        $currentTag = $tag
        
        # Remove whitespace-pre-wrap and break-words from className
        $className = $className -replace '\s*whitespace-pre-wrap\s*', '' -replace '\s*break-words\s*', '' -replace '\s+', ' ' -replace '^\s+|\s+$', ''
        
        return @"
<TiptapEditableText
                    eid="$eid"
                    defaultText={getText('$getTextId', '$defaultText')}
                    className="$className"
                    editable={editable}
                    onChange={handleTextChange}
                    as="$currentTag"
                  />
"@
    }
}

# Pattern 3: Span elements without inline getText (multiline content)
# Example: <span data-eid="..." contentEditable={editable} suppressContentEditableWarning className="...">
#            {getText(...)}
#          </span>
$pattern3 = '(?s)<span\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\(''([^'']+)'',\s*''([^'']*)''\)\}\s*</span>'
$content = $content -replace $pattern3, {
    param($match)
    $eid = $match.Groups[1].Value
    $className = $match.Groups[2].Value
    $getTextId = $match.Groups[3].Value
    $defaultText = $match.Groups[4].Value
    
    $className = $className -replace '\s*whitespace-pre-wrap\s*', '' -replace '\s*break-words\s*', '' -replace '\s+', ' ' -replace '^\s+|\s+$', ''
    
    return @"
<TiptapEditableText
                      eid="$eid"
                      defaultText={getText('$getTextId', '$defaultText')}
                      className="$className"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
"@
}

# Save the modified content
Write-Host "Saving changes..." -ForegroundColor Cyan
$content | Set-Content $filePath -NoNewline

# Count remaining contentEditable instances
$finalCount = ([regex]::Matches($content, 'contentEditable')).Count
$converted = $initialCount - $finalCount

Write-Host "`nConversion complete!" -ForegroundColor Green
Write-Host "Converted: $converted elements" -ForegroundColor Green
Write-Host "Remaining: $finalCount elements" -ForegroundColor $(if ($finalCount -eq 0) { 'Green' } else { 'Yellow' })

if ($finalCount -gt 0) {
    Write-Host "`nNote: Some elements may require manual conversion if they have complex patterns." -ForegroundColor Yellow
}
