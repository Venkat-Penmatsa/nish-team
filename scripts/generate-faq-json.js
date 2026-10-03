const fs = require('fs');
const inputPath = 'd:/NISH-Projects/new/nish-team/src/app/component/faq/faq.component.html';
const outputPath = 'd:/NISH-Projects/new/nish-team/src/assets/data/faqs.json';

const html = fs.readFileSync(inputPath, 'utf8');
const sectionMatches = [...html.matchAll(/<section\s+id="([^"]+)"\s+class="sec">/g)];
console.log('section ids:', sectionMatches.length, sectionMatches.map((m) => m[1]));

const result = [];

for (const match of sectionMatches) {
  const sectionId = match[1];
  const startIndex = (match.index ?? 0) + match[0].length;
  const endIndex = html.indexOf('</section>', startIndex);
  const sectionHtml = html.slice(startIndex, endIndex);

  console.log('section debug', sectionId, 'matchIndex=', match.index, 'endIndex=', endIndex, 'snippet=', sectionHtml.slice(0, 120));

  const titleMatch = sectionHtml.match(/<h2>([\s\S]*?)<\/h2>/);
  const title = titleMatch
    ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    : sectionId;

  const groups = [];
  const groupRegex = /\s*<div class="subgroup">([\s\S]*?)<\/div>/g;
  const groupMatches = [...sectionHtml.matchAll(groupRegex)];

  for (const groupMatch of groupMatches) {
    const groupHtml = groupMatch[1];
    const headingMatch = groupHtml.match(/\s*<h3 class="subh">([\s\S]*?)<\/h3>/);
    const heading = headingMatch
      ? headingMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : '';

    const items = [];
    const detailRegex = /\s*<details\s+class="qa"[^>]*data-q="([^"]*)"[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<div class="a">([\s\S]*?)<\/div>\s*<\/details>/g;
    const detailMatches = [...groupHtml.matchAll(detailRegex)];

    for (const detailMatch of detailMatches) {
      const searchText = detailMatch[1] || '';
      const question = detailMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const answer = detailMatch[3].trim();

      if (!question) continue;

      items.push({
        question,
        answer,
        searchText: (searchText || `${question} ${answer}`).replace(/\s+/g, ' ').trim(),
      });
    }

    if (items.length) {
      groups.push({ heading, items });
    }
  }

  if (groups.length) {
    const contact = sectionId === 'comp' ? 'payroll@nishtech.be' : 'hr@nishtech.be';
    const escalation = sectionId === 'comp' ? 'nivia@nishtech.be' : 'info@nishtech.be';
    result.push({ id: sectionId, title, contact, escalation, groups });
  }
}

console.log('result sections:', result.length);
fs.mkdirSync('d:/NISH-Projects/new/nish-team/src/assets/data', { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
console.log(`Saved ${result.length} sections and ${result.reduce((sum, s) => sum + s.groups.reduce((gSum, g) => gSum + g.items.length, 0), 0)} questions.`);
