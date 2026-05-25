const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const htmlPath = path.resolve(__dirname, 'presentation.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  // Set PDF options for a flyer-like layout (A4 portrait)
  const outputPath = path.resolve(__dirname, 'Technical_DeepDive_Flyer.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
  });
  await browser.close();
  console.log(`PDF generated at ${outputPath}`);
})();
