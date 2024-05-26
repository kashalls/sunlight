# Sunlight

This project was started in order solve a wish list project of someones. 

It's goal was to allow someone to stress test a network for throughput and resiliency. It eventually can be used to validate network installs.

There is two versions of sunlight:

- Clients
    
    These will connect to the server (listed below) and listen for tasks to preform on their hardware. These could be as simple as starting an iperf3 session with the server or surfing the web on the server's test website to generate some web traffic.

- Server
    
    This will run a postgres database, iperf3 server, openspeed-test server as well as some custom docker sites to simulate www traffic. It's important to note that you **should not** use this outside of your local area network.

This project is in the *planning* stages and will probably not have a working model till late November.


