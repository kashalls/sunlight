import { parentPort } from 'worker_threads';
import puppeteer from 'puppeteer';

interface WorkerData {
  host: string;
  port: number;
  duration: number;
  [key: string]: any;
}

// Listen for messages from the main thread
parentPort?.on('message', async (data: WorkerData) => {
  const { host, port, duration, options } = data;

  let browser = null;
  try {
    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      ...options,
    });

    // Create and navigate to the page
    const page = await browser.newPage();
    const url = `http://${host}${port ? ':' : ''}${port}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Stream content for the specified duration
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
      const content = await page.content();
      // Send content back to main thread
      parentPort?.postMessage(content);
      
      // Delay between each stream, e.g., 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await page.close();
  } catch (error) {
    // @ts-expect-error
    parentPort?.postMessage({ error: error.message });
  } finally {
    if (browser) await browser.close();
    parentPort?.close(); // Close the worker when done
  }
});
