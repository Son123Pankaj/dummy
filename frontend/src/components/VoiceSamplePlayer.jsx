import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';
import { claimPlayback, onOtherPlayback } from '../utils/playback';
import { getAssetUrl } from '../utils/assetUrl';

/**
 * Reusable, compact, accessible Voice Sample Player for Industry Cards
 * Integrates with global single-instance playback via claimPlayback & onOtherPlayback.
 */
export default function VoiceSamplePlayer({
  src,
  title = 'AI Voice Demo',
  scenario = '',
  id,
  accentColor = '#0b99a7'
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const playerId = id || `voice-player-${src}`;

  // Format time in M:SS
  const formatTime = (secs) => {
    if (!secs || isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Listen to other playback events to auto-pause when another audio starts
  useEffect(() => {
    const unsubscribe = onOtherPlayback(playerId, () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [playerId]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setHasError(false);
      setIsLoading(true);
      try {
        claimPlayback(playerId);
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio playback failed:', err);
        setHasError(true);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
      setHasError(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar || !duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  const resolvedSrc = getAssetUrl(src);

  return (
    <div 
      className={`industry-voice-player ${isPlaying ? 'is-playing' : ''} ${hasError ? 'has-error' : ''}`}
      style={{ '--player-accent': accentColor }}
      role="region"
      aria-label={`Voice sample: ${title}`}
    >
      <audio
        ref={audioRef}
        src={resolvedSrc}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
      />

      <div className="player-meta-row">
        <div className="player-label-group">
          <span className="player-badge">
            <Volume2 size={12} className="player-badge-icon" />
            AI Voice Sample
          </span>
          <span className="player-sample-title">{title}</span>
        </div>
        <span className="player-time-display">
          {formatTime(currentTime)} / {formatTime(duration || 14)}
        </span>
      </div>

      {scenario && (
        <p className="player-scenario-caption">
          <strong>Scenario:</strong> {scenario}
        </p>
      )}

      <div className="player-controls-row">
        <button
          type="button"
          className="player-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pause ${title}` : `Listen to ${title}`}
          title={isPlaying ? 'Pause voice demo' : 'Listen to AI voice demo'}
          disabled={hasError}
        >
          {isLoading ? (
            <span className="player-spinner" aria-hidden="true" />
          ) : isPlaying ? (
            <Pause size={15} />
          ) : (
            <Play size={15} style={{ marginLeft: '2px' }} />
          )}
          <span className="player-btn-label">
            {isPlaying ? 'Pause Voice' : 'Listen to AI Voice'}
          </span>
        </button>

        <div
          ref={progressBarRef}
          className="player-progress-track"
          onClick={handleSeek}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Audio progress bar"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              if (audioRef.current) audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 2);
            } else if (e.key === 'ArrowLeft') {
              if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 2);
            }
          }}
        >
          <div 
            className="player-progress-fill" 
            style={{ width: `${progress}%`, backgroundColor: accentColor }} 
          />
        </div>
      </div>

      {hasError && (
        <div className="player-error-banner" role="alert">
          <AlertCircle size={13} />
          <span>Audio sample currently unavailable. Please request a live demo.</span>
        </div>
      )}
    </div>
  );
}
