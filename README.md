# SeleniumDemo

Hi,
Thanks for submitting the issue.
According to ChromeDriver:3415, a few things you could try.
1. Running with --no-sandbox --disable-dev-shm-usage options similar to comment#6 from above.
2. Make sure your system have enough system resources (memory, CPU cycles, etc).
3. Refer to https://github.com/SeleniumHQ/docker-selenium#standalone for docker config.


Comment 6 by eespi...@gmail.com on Fri, Mar 22, 2019, 3:51 AM GMT+8
This issue may be related to https://bugs.chromium.org/p/chromedriver/issues/detail?id=2489, if not and is solely related to the container please try the following:

1. Explicitly set the remote debugging port as an argument
2. Make your driver headless, using chrome Options

Lemme provide an example, lets start a standalone container for easier debugging:

docker run --name chrome_container -p 4444:4444 -d selenium/standalone-chrome

I'll guess you're using python, if not please lemme know so I can provide proper code:

from selenium import webdriver
options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")
options.add_argument("--remote-debugging-port=9222")
options.headless = True
command_executor = "http://localhost:4444/wd/hub"
driver = webdriver.Remote(command_executor, desired_capabilities=options.to_capabilities())
driver.get("https://google.com")

If no errors popup, means that the tip should work for you. Now, lets get rid of that container:

docker stop chrome_container
docker rm chrome_container

Any further assistance you might need just email me, I'm glad to help.
