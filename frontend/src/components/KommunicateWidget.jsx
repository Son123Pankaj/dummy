import { useEffect } from 'react';

const appId = import.meta.env.VITE_KOMMUNICATE_APP_ID?.trim();
let hasReportedMissingAppId = false;

export default function KommunicateWidget() {
  useEffect(() => {
    if (!appId) {
      if (!hasReportedMissingAppId) {
        console.error('Kommunicate chat is not configured. Set VITE_KOMMUNICATE_APP_ID in the frontend environment.');
        hasReportedMissingAppId = true;
      }
      return;
    }

    if (document.querySelector('script[data-kommunicate-widget]')) return;

    window.kommunicateSettings = {
      appId,
      popupWidget: true,
      automaticChatOpenOnNavigation: false
    };

    const script = document.createElement('script');
    script.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
    script.async = true;
    script.dataset.kommunicateWidget = 'true';
    script.onerror = () => {
      console.error('Kommunicate chat failed to load from widget.kommunicate.io.');
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
