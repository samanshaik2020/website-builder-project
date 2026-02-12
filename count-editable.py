import re
import os

file_path = r'c:\Users\saman\OneDrive\Desktop\Project Files\webstie builder\v0-website-builder-project\components\templates\portfolio\default.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Count remaining contentEditable instances
count = len(re.findall(r'contentEditable=\{editable\}', content))
print(f"Found {count} remaining contentEditable elements")

# Find all instances with their line numbers
lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if 'contentEditable={editable}' in line:
        # Find the eid
        eid_match = re.search(r'data-eid="([^"]+)"', line)
        if eid_match:
            print(f"Line {i}: {eid_match.group(1)}")
