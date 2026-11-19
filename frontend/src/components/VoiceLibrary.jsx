import React, { useEffect, useId, useRef, useState } from 'react';
import { Play, Pause, Headphones, ArrowUpRight, RotateCcw } from 'lucide-react';
import { PLANS, SAMPLES, demoUrl, normalizePlan } from '../data/offer';
import { getAssetUrl } from '../utils/assetUrl';
import { claimPlayback, onOtherPlayback } from '../utils/playback';

const time = seconds => `${Math.floor((seconds || 0) / 60)}:${String(Math.floor((seconds || 0) % 60)).padStart(2, '0')}`;
export default function VoiceLibrary({ compact = false, navigateTo, initialPlan }) {
  const owner = useId();
  const audio = useRef(null);
  const request = useRef(0);
  const [plan, setPlan] = useState(normalizePlan(initialPlan) || 'silver');
  const [sampleId, setSampleId] = useState(`${normalizePlan(initialPlan) || 'silver'}-1`);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const sample = SAMPLES.find(item => item.id === sampleId);
  const options = SAMPLES.filter(item => item.plan === plan);
  const pause = () => { request.current++; audio.current?.pause(); setStatus('paused'); };
  useEffect(() => {
    const element = audio.current;
    const sequence = request;
    const remove = onOtherPlayback(owner, () => { request.current++; element?.pause(); setStatus('paused'); });
    return () => { sequence.current++; element?.pause(); remove(); };
  }, [owner]);
  const select = (id, nextPlan = plan) => { pause(); setSampleId(id); setPlan(nextPlan); setStatus('idle'); setElapsed(0); setDuration(0); setError(''); };
  const play = async () => {
    if (status === 'playing' || status === 'loading') { pause(); return; }
    const token = ++request.current;
    claimPlayback(owner); setError(''); setStatus('loading');
    try { await audio.current.play(); if (token === request.current) setStatus('playing'); }
    catch (failure) { if (token === request.current && failure.name !== 'AbortError') { setStatus('error'); setError('This sample could not play. Please retry or choose another voice.'); } }
  };
  const target = demoUrl(plan, sample.name);
  return <section className={`voice-library ${compact ? 'voice-library-compact' : ''}`} aria-label={compact ? 'Featured voice sample' : 'Prerecorded voice samples'}>
    <audio ref={audio} src={getAssetUrl(sample.src)} preload="none" onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onTimeUpdate={event => setElapsed(event.currentTarget.currentTime)} onPlay={() => setStatus('playing')} onPause={() => setStatus(current => current === 'error' ? current : 'paused')} onEnded={() => setStatus('ended')} onError={() => { setStatus('error'); setError('Audio is unavailable. Try another sample or request a demo.'); }} />
    <div className="voice-library-top"><span><Headphones size={16}/> THE VOICE STUDIO</span><span>PRERECORDED EXAMPLES</span></div>
    <h3>{compact ? 'Hear your next conversation.' : 'A voice that fits your business.'}</h3><p>Compare the sound. Choose a voice. No signup or microphone needed.</p>
    <div className="voice-tier-tabs" role="group" aria-label="Voice plan">{PLANS.map(item => <button key={item.id} type="button" aria-pressed={plan === item.id} onClick={() => select(`${item.id}-1`, item.id)}>{item.name}</button>)}</div>
    <div className="voice-now-playing"><button className="voice-play" type="button" onClick={play} aria-label={`${status === 'playing' || status === 'loading' ? 'Pause' : 'Play'} ${sample.name} ${sample.tier} sample`}>{status === 'playing' || status === 'loading' ? <Pause size={24}/> : <Play size={24}/>}</button><div><span>{sample.tier} · Voice preview</span><strong>{sample.name}</strong></div><span className="voice-time">{time(elapsed)} / {duration ? time(duration) : '—'}</span></div>
    <div className={`studio-wave-bars ${status === 'playing' ? 'is-playing' : ''}`} aria-hidden="true">{Array.from({length: 36}, (_, i) => <i key={i} style={{'--bar-height': `${24 + (i * 37 % 72)}%`, '--bar-delay': `${i % 6 * .11}s`}}/>)}</div>
    <input className="voice-seek" type="range" min="0" max={duration || 1} step="0.1" value={Math.min(elapsed, duration || 1)} disabled={!duration} aria-label={`Seek within ${sample.name} sample`} aria-valuetext={`${time(elapsed)} of ${time(duration)}`} onChange={event => { audio.current.currentTime = Number(event.target.value); setElapsed(Number(event.target.value)); }}/>
    <div className="voice-options" role="group" aria-label={`${sample.tier} voice choices`}>{options.slice(0, expanded ? options.length : compact ? 2 : 3).map(item => <button type="button" key={item.id} aria-pressed={sampleId === item.id} onClick={() => select(item.id)}>{item.name}</button>)}</div>
    {!compact && <button className="voice-expand" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? 'Show fewer voices' : `Show all ${options.length} ${sample.tier} voices`}</button>}
    <span className="voice-status" role="status">{status === 'loading' ? 'Loading audio…' : status === 'playing' ? 'Playing prerecorded sample' : status === 'ended' ? 'Sample finished. Hear another voice or request a demo.' : 'Select a voice, then press play.'}</span>
    {error && <div className="voice-error" role="alert">{error}<button type="button" onClick={() => { audio.current.load(); setStatus('idle'); setError(''); }}><RotateCcw size={14}/> Retry</button></div>}
    <a className="voice-demo-link" href={target} onClick={navigateTo ? event => {event.preventDefault(); navigateTo(target);} : undefined}>Request a demo with {sample.name}<ArrowUpRight size={16}/></a>
    {!compact && <p className="voice-disclaimer">Recordings demonstrate voice sound. A tailored demo lets you check language, business script and two-way call behaviour.</p>}
  </section>;
}
