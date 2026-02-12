import re

file_path = r'c:\Users\saman\OneDrive\Desktop\Project Files\webstie builder\v0-website-builder-project\components\templates\portfolio\default.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_element(match):
    full_match = match.group(0)
    
    # Extract components
    tag = match.group(1)  # h2, h3, h4, p, span
    eid = match.group(2)
    class_name = match.group(3)
    text_key = match.group(4)
    default_text = match.group(5)
    
    # Remove whitespace-pre-wrap break-words from className
    class_name = class_name.replace(' whitespace-pre-wrap break-words', '').replace('whitespace-pre-wrap break-words ', '').replace('whitespace-pre-wrap break-words', '')
    
    # Determine indentation
    indent = '                  ' if 'project_' in eid or 'testimonial_' in eid or 'contact_' in eid or 'resume_' in eid else '            '
    
    # Create replacement
    replacement = f'''<TiptapEditableText
{indent}eid="{eid}"
{indent}defaultText={{getText('{text_key}', '{default_text}')}}
{indent}className="{class_name}"
{indent}editable={{editable}}
{indent}onChange={{handleTextChange}}
{indent}as="{tag}"
{indent}/>'''
    
    return replacement

# Pattern to match contentEditable elements
pattern = r'<(h[2-4]|p|span)\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\(\'([^\']+)\',\s*\'([^\']+)\'\)\}\s*<\/\1>'

# Replace all matches
new_content = re.sub(pattern, replace_element, content, flags=re.MULTILINE | re.DOTALL)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replacement complete!")

# Count how many were replaced
count = len(re.findall(pattern, content))
print(f"Replaced {count} elements")
