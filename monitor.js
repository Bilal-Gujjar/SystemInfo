const si = require('systeminformation');

async function getSystemInfo() {
  try {
    const tempData = await si.cpuTemperature();
    const currentLoad = await si.currentLoad();
    const memData = await si.mem();
    const diskData = await si.diskLayout();

    console.clear();
    console.log('--- CPU Temperature ---');
    console.log(`Main CPU temperature: ${tempData.main}`);
    if (tempData.cores) {
      tempData.cores.forEach((core, index) => {
        console.log(`Core ${index} temperature: ${core}`);
      });
    }
    if (tempData.max !== -1) {
      console.log(`Max CPU temperature: ${tempData.max}`);
    }

    console.log('--- CPU Load ---');
    console.log(`Current Load: ${currentLoad.currentLoad.toFixed(2)}%`);

    console.log('--- Memory ---');
    console.log(`Total Memory: ${(memData.total / 1073741824).toFixed(2)} GB`);
    console.log(`Used Memory: ${(memData.used / 1073741824).toFixed(2)} GB`);
    console.log(`Free Memory: ${(memData.free / 1073741824).toFixed(2)} GB`);

    console.log('--- Disk ---');
    diskData.forEach((disk, index) => {
      console.log(`Disk ${index}: ${disk.device} - ${(disk.size / 1073741824).toFixed(2)} GB`);
    });
  } catch (error) {
    console.error(error);
  }
}

setInterval(getSystemInfo, 100);
