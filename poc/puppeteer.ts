import puppeteer from 'puppeteer';

(async () => {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: true }); // Set to true for headless mode
    const page = await browser.newPage();

    try {
        // Navigate to the speedtest page
        await page.goto('https://speedtest.ok8.sh', { waitUntil: 'networkidle2' });

        // Wait for the start button to appear (adjust selector if needed)
        await page.waitForSelector('#startButtonDesk.startButton');

        // Click the start button to start the test
        await page.click('#startButtonDesk.startButton');

        console.log("Speed test started...");

        await page.waitForFunction(
            () => document.querySelector('#oDoLiveStatus.oDoLive-Status')?.textContent === 'All done',
            { timeout: 240000 } // Timeout after 4 minutes (adjust as necessary)
        );
        // Extract speed test results
        const results = await page.evaluate(() => {
            // Retrieve download speed, upload speed, ping, and jitter from the page
            const download = document.querySelector('#downResultC1 #downResult')?.textContent;
            const upload = document.querySelector('#upResultC2 #upRestxt')?.textContent;
            const ping = document.querySelector('#pingResultC3 #pingResult')?.textContent;
            const jitter = document.querySelector('#jitterResultC3 #jitterDesk')?.textContent;

            // Retrieve their units (Mbps for speeds, ms for ping/jitter)
            const downloadUnit = document.querySelector('#downResultC1 .rtextmbms')?.textContent || 'Mbps';
            const uploadUnit = document.querySelector('#upResultC2 .rtextmbms')?.textContent || 'Mbps';
            const pingUnit = document.querySelector('#pingResultC3 .rtextmbms')?.textContent || 'ms';
            const jitterUnit = document.querySelector('#jitterResultC3 .rtextmbms')?.textContent || 'ms';

            return {
                download: `${download} ${downloadUnit}`,
                upload: `${upload} ${uploadUnit}`,
                ping: `${ping} ${pingUnit}`,
                jitter: `${jitter} ${jitterUnit}`,
            };
        });

        // Display the results in the console
        console.log('Speed Test Results:');
        console.log(`Download Speed: ${results.download}`);
        console.log(`Upload Speed: ${results.upload}`);
        console.log(`Ping: ${results.ping}`);
        console.log(`Jitter: ${results.jitter}`);
    } catch (error) {
        console.error("Error during speed test:", error);
    } finally {
        // Close the browser
        await browser.close();
    }
})();
