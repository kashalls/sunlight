# Proof Of Concepts

## Puppeteer

Single Instance: `bun run puppeteer.ts`
Multiple Instances: `bun run puppeteer-fork.ts #`

Requires chromium browser.

ARM64 Required:
```
sudo apt install chromium-browser
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
bun run puppeter.ts
```