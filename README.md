# README
Webseite von der Open Knowledge Foundation Deutschland für die Ausstellung auf der MS Wissenschaft.


## How to update the MS Wissenschaften OKF machine

1. Attach USB keyboard and network cable. Boot machine.
2. Switch to different TTY with CTRL+ALT+F6 (Apple keyboard may require additional press of the Fn key)
3. Login with user wikimedia and password.
4. The file download.sh will download latest push from github and extract it:

    `sh download.sh`
5. Reboot the machine which will boot to the latest version

    `sudo reboot`
