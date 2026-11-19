const EVENT = 'avyukta:playback';
export function claimPlayback(owner) {
  window.speechSynthesis?.cancel();
  window.dispatchEvent(new CustomEvent(EVENT, { detail: owner }));
}
export function onOtherPlayback(owner, pause) {
  const listener = event => { if (event.detail !== owner) pause(); };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
