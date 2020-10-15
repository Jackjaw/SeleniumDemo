# SeleniumDemo

Hi,
Thanks for submitting the issue.
According to ChromeDriver:3415, a few things you could try.
1. Running with --no-sandbox --disable-dev-shm-usage options similar to comment#6 from above.
2. Make sure your system have enough system resources (memory, CPU cycles, etc).
3. Refer to https://github.com/SeleniumHQ/docker-selenium#standalone for docker config.
