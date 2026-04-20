import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('posApi', {
  ping: () => 'hello from preload'
})