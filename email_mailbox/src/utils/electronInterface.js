import { labels } from './systemLabels';
import { cleanDataLogout as cleanData, createSignalTables } from './ipc';

const { remote } = window.require('electron');
const { getCurrentWindow, dialog } = remote;

const newsClient = remote.require('./src/newsClient');
const globalManager = remote.require('./src/globalManager');

export const myAccount = remote.require('./src/Account');
export const mySettings = remote.require('./src/Settings');
export const { requiredMinLength, requiredMaxLength } = remote.require(
  './src/validationConsts'
);

export const { FILE_SERVER_APP_ID, FILE_SERVER_KEY } = remote.require(
  './src/utils/const'
);

const additionalLabels = {
  search: {
    id: -2,
    text: 'Search'
  },
  allmail: {
    id: -1,
    text: 'All Mail'
  }
};
export const LabelType = Object.assign(labels, additionalLabels);

export const getDeviceType = () => globalManager.deviceType.id;

export const setCanceledSyncStatus = status => {
  globalManager.canceledSync.set(status);
};

export const getCanceledSyncStatus = () => {
  return globalManager.canceledSync.get();
};

/*  Window events
----------------------------- */
export const reloadWindow = () => {
  getCurrentWindow().reload();
};

export const showSaveFileDialog = (fileName, callback) => {
  dialog.showSaveDialog(null, { defaultPath: fileName }, callback);
};

export const showOpenBackupFileDialog = (extensions, callback) => {
  dialog.showOpenDialog(
    null,
    {
      openFile: true,
      multiSelections: false,
      filters: [{ name: 'Criptext Backup Files', extensions }]
    },
    callback
  );
};

/*  News Client
----------------------------- */
export const getNews = ({ code }) => {
  return newsClient.getNews({ code });
};

/*  DataBase
----------------------------- */
export const cleanDataLogout = async recipientId => {
  await cleanData(recipientId);
  return createSignalTables();
};
