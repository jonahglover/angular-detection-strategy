declare var System: SystemJSLoader.System;

console.log(JSON.parse('<%= SYSTEM_CONFIG_DEV %>'));

System.config(JSON.parse('<%= SYSTEM_CONFIG_DEV %>'));