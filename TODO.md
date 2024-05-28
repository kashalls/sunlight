# Todo

Just a list of ideas I think I should implement:

- Ray should have some kind of WebRTC module built into the puppeteer automation to automatically start a two way voice stream. ~10Mbps @ 1080p bi-directional per stream.

- Server should have a secondary webserver to cache versions of user defined sites, allowing rays to pretend surf the web.

- iPerf 3 currently only supports one-way transfer tests, where as iPerf supports bi-directional, maybe consider spinning up server and client pairs on each machine to implement this?

- [DONE] Server should have a static serve option, thinking maybe minio in the back