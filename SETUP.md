# Getting Started using Sunlight

## Bill Of Materials

These items were picked to recreate the "ideal" starter network to be on-par with today's technology. WiFi 6 is now just becoming widely available to budget phones, so we decided to start with WiFi 7.

### Nodes

- [Raspberry Pi 5 8GB x3](https://www.canakit.com/raspberry-pi-5-8gb.html)** - $154.95/ea
- [MCUZone's MPW7N (PCIE to M.2 E-key Hat) x3](https://www.aliexpress.us/item/3256806224989235.html) - $15.20/ea
- [Intel WiFi 7 BE200 WiFi Card x3](https://a.co/d/do83E2V) - $28.69/ea

** We ordered the kits for the power supplies, sd cards and additional adapters. The red & white cases did not fit with additional hats, so we used some generic raspberry pi cases we had on hand.

### Infrastructure

- [UniFi Dream Machine Pro Max](https://store.ui.com/us/en/pro/category/cloud-gateways-large-scale/products/udm-pro-max) - $599.00
- [UniFi U7 Pro](https://store.ui.com/us/en/pro/category/all-wifi/products/u7-pro)*** - $189.00
- [10 Gbps SFP+ Direct Attach Cable](https://store.ui.com/us/en/pro/category/accessories-cables-dacs/collections/accessories-pro-direct-attach-cables/products/10gbps-direct-attach-cable?variant=uacc-dac-sfp10-1m)*\*** - $15.00
- [UniFi Pro Max 16](https://store.ui.com/us/en/pro/category/all-switching/products/usw-pro-max-16) - $279.00
- [Minisforum MS-01](https://store.minisforum.com/products/minisforum-ms-01?sscid=51k8_glrqb&variant=44385972191477) - $679.00

*** At the time of purchase, the U7 Pro was the only sourceable WiFi 7 access point available by UniFi. If we had waited, I would have prefered to go with the U7 Pro Max which offers 4x4 as compared to 2x2 on 5Ghz (which the Pi likes to idle on).

**** Used to link the UDM to the Pro Max Switch

We chose the Minisforum MS-01 for its wide range of connection abilities since it had 2x 10GbE SFP+ and 2x 2.5GbE ports. We purchased the i9-12900H and 32GB + 1TB SSD variant.

## Networking 

The only noteable thing was that I disabled all of the IPS/IDS options.
I did keep the Device Identification and Traffic Identification options enabled just so I could see it in the dashboard.

- RSTP Enabled
- IoT Auto-Discovery Enabled

## Setting Up The 

## Setting Up The Nodes (Raspberry Pi 5)

*You should use the `Raspberry Pi Imager v1.8.5+` to flash as it makes it super easy to configure some default options.*

#### Menu Directions:

> [!WARNING]
> Debian and Ubuntu are notoriously slow for releasing new features, especially when using a LTS build. 
> If you need to use an older version of Ubuntu/Debian, you will have to compile a version of the linux kernel that contains the network drivers needed to support your wifi card. This project will not help you do this.
> At the time of writing this, Ubuntu is the only one that supplies a *working* driver and kernel to LTS although it *does not support WiFi 7*. 

`Other general-purpose OS` > `Ubuntu` > `Ubuntu Server 24.04 LTS (64-bit)`


#### Additional Settings:

`/boot/firmware/config.txt`
```txt
# Disable onboard wifi.
dtoverlay=disable-wifi
```

- `sudo apt install network-manager`
    - Allows us to use nmcli command to change wifi.