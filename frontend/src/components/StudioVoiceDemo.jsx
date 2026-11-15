import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Headphones, ArrowUpRight, AudioLines } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';
const DEMOS = [
  { title: 'Lead qualification', category: 'Inbound AI agent', src: '/samples/gold-1.mp3', line: 'A natural first conversation, available around the clock.' },
  { title: 'Payment reminders', category: 'Outbound AI agent', src: '/samples/gold-2.mp3', line: 'Personalized follow-ups without adding agent workload.' },
  { title: 'Customer care', category: 'Support automation', src: '/samples/gold-3.mp3', line: 'Help customers with an always-available first response.' }
];
export default function StudioVoiceDemo({ compact = false }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => {if(ref.current) ref.current.pause()}, []);
  const select = i => { if(ref.current){ref.current.pause(); ref.current.currentTime=0;}setPlaying(false);setIndex(i); };
  const toggle = async () => { if(!ref.current)return; if(playing){ref.current.pause();setPlaying(false);return;}try{await ref.current.play();setPlaying(true)}catch {setPlaying(false)} };
  return <div className={`studio-voice-demo ${compact ? 'compact' : ''}`}>
    <audio key={DEMOS[index].src} ref={ref} src={getAssetUrl(DEMOS[index].src)} preload="none" onEnded={()=>setPlaying(false)} onPause={()=>setPlaying(false)} />
    <div className="studio-demo-top"><div className="studio-demo-tag"><span className="studio-live-dot"/> VOICE EXPERIENCE</div><Headphones size={20}/></div>
    <div className="studio-demo-playback"><button className="studio-demo-play" type="button" onClick={toggle} aria-label={playing ? 'Pause voice sample' : 'Play voice sample'}>{playing?<Pause size={25} fill="currentColor"/>:<Play size={26} fill="currentColor"/>}</button><div className="studio-demo-track"><span>LISTEN TO THE DIFFERENCE</span><strong>{DEMOS[index].title}</strong></div><AudioLines size={24} className="studio-demo-audio-icon" /></div>
    <div className={`studio-wave-bars ${playing?'is-playing':''}`} aria-hidden="true">{[20,34,54,38,72,86,48,34,61,92,48,31,70,48,35,82,54,36,68,92,56,28,75,46,26,64,84,42,68,32,58,24].map((n,i)=><i key={i} style={{'--bar-height': `${n}%`, '--bar-delay':`${(i%6)*.11}s`}}/>)}</div>
    <div className="studio-demo-options" role="group" aria-label="Choose voice example">{DEMOS.map((demo,i)=><button type="button" key={demo.title} className={index===i?'active':''} aria-pressed={index===i} onClick={()=>select(i)}>{demo.title}</button>)}</div>
    <div className="studio-demo-bottom"><span>{DEMOS[index].category}</span><span>Real audio sample <ArrowUpRight size={14}/></span></div>
  </div>;
}
