import os from "os";

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const formatTime = (seconds) => {
  function pad(s) {
    return (s < 10 ? "0" : "") + s;
  }
  let hours = Math.floor(seconds / (60 * 60));
  let minutes = Math.floor((seconds % (60 * 60)) / 60);
  let secs = Math.floor(seconds % 60);

  return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
};

const healthCheck = async (req, res) => {
  try {
    const healthcheckData = {
      message: "🛠️ API is working!",
      serverUptime: formatTime(process.uptime()),
      osUptime: formatTime(os.uptime()),
      timestamp: today.toUTCString(),
      cpus: os.cpus(),
      architecture: os.arch(),
      networkInterfaces: os.networkInterfaces(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      platform: os.platform(),
      osType: os.type(),
      osRelease: os.release(),
      osVersion: os.version(),
      hostname: os.hostname(),
      userInfo: os.userInfo(),
      reqIP: req.ip,
    };
    res.status(200).json(healthcheckData);
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { healthCheck };
