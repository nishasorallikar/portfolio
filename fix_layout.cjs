const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages', 'csa');
const files = fs.readdirSync(dir).filter(f => f.startsWith('CSAModule0') && f.endsWith('.jsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  // 1. Fix Layout Alignment Header
  const headerRegex = /(\{?\/\*\s*Header Segment\s*\*\/\s*\}?\s*)<div className="([^"]*?max-w-4xl[^"]*?)">([\s\S]*?)<\/div>\s*<div className="max-w-6xl mx-auto relative">/;
  const match = content.match(headerRegex);

  if (match) {
    console.log('Fixing header and wrapper in:', file);
    
    // Clean header classes
    let newHeaderClasses = match[2].replace('max-w-4xl', '').replace('mx-auto', '').replace(/\s+/g, ' ').trim();
    
    // Process inner content to inject max-w limits
    let innerContent = match[3];
    
    // Add max-w-4xl to the <h1> element
    innerContent = innerContent.replace(/(<h1[^>]*className=")([^"]*)("[^>]*>)/, (m, p1, p2, p3) => {
      if (!p2.includes('max-w-4xl')) return p1 + p2 + ' max-w-4xl' + p3;
      return m;
    });
    
    // Add max-w-3xl to the <p> element
    innerContent = innerContent.replace(/(<p[^>]*className=")([^"]*)("[^>]*>)/, (m, p1, p2, p3) => {
      if (!p2.includes('max-w-3xl')) return p1 + p2 + ' max-w-3xl' + p3;
      return m;
    });

    const replacement = `<div className="max-w-6xl mx-auto relative">\n        ${match[1]}<div className="${newHeaderClasses}">${innerContent}</div>`;
    content = content.replace(headerRegex, replacement);
    changed = true;
  }
  
  // 2. Fix Sticky Tab Bar z-index bug (intersecting bug fix)
  const tabRegex = /(<div className="[^"]*sticky[^"]*)z-40([^"]*")>/;
  if (tabRegex.test(content)) {
    content = content.replace(tabRegex, '$1z-50$2>');
    changed = true;
    console.log('Fixed tab bar z-index in:', file);
  }

  // 3. Fix Tab Content relative z-index
  const contentPanelRegex = /(<div className="min-h-\[600px\] w-[^"]*?)"/;
  if (contentPanelRegex.test(content)) {
    content = content.replace(contentPanelRegex, (m, p1) => {
      if (!p1.includes('relative')) {
        console.log('Fixed tab content relative z-10 in:', file);
        return p1 + ' relative z-10"';
      }
      return m;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(path.join(dir, file), content);
  }
}
console.log('Done processing layout fixes');
