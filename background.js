let color = '#3aa757';
let pawn = 'bp';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ pawn });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
