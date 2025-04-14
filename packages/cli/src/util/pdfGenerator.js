const puppeteer = require('puppeteer');
const path = require('path');
const logger = require('./logger');

/**
 * Generates a PDF from a given URL, extracting only the main content
 * @param {string} url - The URL to generate PDF from
 * @param {string} filename - The output filename
 * @returns {Promise<Buffer>} - PDF file as buffer
 */
async function generatePdf(url, filename) {
  let browser;
  try {
    logger.info('Launching browser for PDF generation...');

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set viewport for better rendering
    await page.setViewport({
      width: 1200,
      height: 800,
    });

    // Increase default timeout
    page.setDefaultTimeout(60000);

    // Navigate to the page with a more resilient approach
    logger.info(`Navigating to: ${url}`);
    try {
      // Use domcontentloaded for faster loading
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000, // 60 seconds
      });

      // Wait for main content to be available
      logger.info('Waiting for content to be available...');
      await page.waitForSelector('#content-wrapper', { timeout: 30000 });

      logger.info('Page loaded, applying styles...');
    } catch (navError) {
      logger.error(`Navigation or content loading failed: ${navError.message}`);
      throw navError;
    }

    // Insert CSS to hide navigation and other elements
    await page.addStyleTag({
      content: `
        #site-nav, nav#page-nav, header, footer, .scroll-top-button {
          display: none !important;
        }
        
        #content-wrapper {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 20px !important;
        }
        
        body {
          display: block !important;
        }
        
        #flex-body {
          display: block !important;
        }
        
        @media print {
          @page {
            margin: 2cm;
          }
        }
      `,
    });

    // Using standard setTimeout instead of page.waitForTimeout
    logger.info('Waiting for styles to apply...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    logger.info('Generating PDF...');

    // Generate PDF with appropriate settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      path: filename ? path.resolve(process.cwd(), filename) : undefined,
    });

    logger.info('PDF generated successfully');
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    logger.error(`PDF generation failed: ${error.message}`);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

module.exports = {
  generatePdf,
};
