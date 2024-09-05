import { exec } from 'child_process';
import { writeFile, readFile } from 'fs/promises';

interface WifiConfig {
    ssid: string;
    psk: string;
}

const WPA_SUPPLICANT_CONF = '/etc/wpa_supplicant/wpa_supplicant.conf';
const BACKUP_CONF = '/etc/wpa_supplicant/wpa_supplicant.backup.conf';

export const changeWifi = async (newSsid: string, newPassword: string) => {
    try {
        // Backup current WiFi configuration
        await backupCurrentConfig();
        
        // Update WiFi configuration with new SSID and Password
        await updateWifiConfig(newSsid, newPassword);

        // Restart the network to apply changes
        await restartNetwork();

        // Check internet connectivity
        const isConnected = await checkInternetConnectivity(35);
        if (!isConnected) {
            console.log('Failed to connect. Reverting to old configuration.');
            // Revert to old configuration
            await revertToOldConfig();
            await restartNetwork();
        } else {
            console.log('Connected to the new WiFi successfully.');
        }
    } catch (error) {
        console.error('Error:', error);
        // On any error, revert to old configuration
        await revertToOldConfig();
        await restartNetwork();
    }
};

const backupCurrentConfig = async () => {
    const currentConfig = await readFile(WPA_SUPPLICANT_CONF, 'utf-8');
    await writeFile(BACKUP_CONF, currentConfig);
};

const updateWifiConfig = async (ssid: string, password: string) => {
    const newConfig = `
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="${ssid}"
    psk="${password}"
    key_mgmt=WPA-PSK
}`;
    await writeFile(WPA_SUPPLICANT_CONF, newConfig);
};

const restartNetwork = () => {
    return new Promise<void>((resolve, reject) => {
        exec('sudo systemctl restart networking', (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
};

const checkInternetConnectivity = (timeoutInSeconds: number) => {
    return new Promise<boolean>((resolve) => {
        let timeout: NodeJS.Timeout;
        const interval = setInterval(() => {
            exec('ping -c 1 google.com', (error) => {
                if (!error) {
                    clearInterval(interval);
                    clearTimeout(timeout);
                    resolve(true);
                }
            });
        }, 5000);

        timeout = setTimeout(() => {
            clearInterval(interval);
            resolve(false);
        }, timeoutInSeconds * 1000) as NodeJS.Timeout;
    });
};

const revertToOldConfig = async () => {
    const backupConfig = await readFile(BACKUP_CONF, 'utf-8');
    await writeFile(WPA_SUPPLICANT_CONF, backupConfig);
};
