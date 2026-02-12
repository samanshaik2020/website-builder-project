// This script helps identify all contentEditable instances that need to be replaced
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\saman\\OneDrive\\Desktop\\Project Files\\webstie builder\\v0-website-builder-project\\components\\templates\\portfolio\\default.tsx';

const content = fs.readFileSync(filePath, 'utf8');

// Find all contentEditable instances
const regex = /data-eid="([^"]+)"\s+contentEditable=\{editable\}/g;
let match;
const eids = [];

while ((match = regex.exec(content)) !== null) {
    eids.push(match[1]);
}

console.log('Found contentEditable elements with eids:');
eids.forEach(eid => console.log(`  - ${eid}`));
console.log(`\nTotal: ${eids.length} elements`);
