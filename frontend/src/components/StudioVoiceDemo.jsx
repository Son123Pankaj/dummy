import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Headphones, ArrowUpRight, AudioLines } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';
const VOICES_BY_GENDER = {
  male: [
    { title: 'Lead qualification', option: 'Silver', category: 'Silver · Male voice', src: '/samples/silver-1.mp3' },
    { title: 'Lead qualification', option: 'Gold', category: 'Gold · Male voice', src: '/samples/gold-1.mp3' },
    { title: 'Lead qualification', option: 'Diamond', category: 'Diamond · Male voice', src: '/samples/platinum-4.mp3' }
  ],
  female: [
    { title: 'Lead qualification', option: 'Silver', category: 'Silver · Female voice', src: '/samples/silver-2.mp3' },
    { title: 'Lead qualification', option: 'Gold', category: 'Gold · Female voice', src: '/samples/gold-2.mp3' },
    { title: 'Lead qualification', option: 'Diamond', category: 'Diamond · Female voice', src: '/samples/platinum-5.mp3' }
  ]
};
export default function StudioVoiceDemo({ compact = false }) {
  const ref = useRef(null);
  const playRequestRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [gender, setGender] = useState('male');
  const [playing, setPlaying] = useState(false);
  const demos = VOICES_BY_GENDER[gender];
  useEffect(() => () => {if(ref.current) ref.current.pause()}, []);
  const select = async (i, selectedGender = gender) => {
    const audio = ref.current;
    if (!audio) return;
    const request = ++playRequestRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.src = getAssetUrl(VOICES_BY_GENDER[selectedGender][i].src);
    setIndex(i);
    setGender(selectedGender);
    setPlaying(false);
    try {
      await audio.play();
      if (playRequestRef.current === request) setPlaying(true);
    } catch {
      if (playRequestRef.current === request) setPlaying(false);
    }
  };
  const toggle = async () => {
    const audio = ref.current;
    if (!audio) return;
    if (playing) {
      playRequestRef.current++;
      audio.pause();
      setPlaying(false);
      return;
    }
    if (!audio.getAttribute('src')) audio.src = getAssetUrl(demos[index].src);
    const request = ++playRequestRef.current;
    try {
      await audio.play();
      if (playRequestRef.current === request) setPlaying(true);
    } catch {
      if (playRequestRef.current === request) setPlaying(false);
    }
  };
  return <div className={`studio-voice-demo ${compact ? 'compact' : ''}`}>
    <audio ref={ref} preload="none" onEnded={()=>setPlaying(false)} />
    <div className="studio-demo-top"><div className="studio-demo-tag"><span className="studio-live-dot"/> VOICE EXPERIENCE</div><Headphones size={20}/></div>
    <div className="studio-demo-playback"><button className="studio-demo-play" type="button" onClick={toggle} aria-label={playing ? 'Pause voice sample' : 'Play voice sample'}>{playing?<Pause size={25} fill="currentColor"/>:<Play size={26} fill="currentColor"/>}</button><div className="studio-demo-track"><span>LISTEN TO THE DIFFERENCE</span><strong>{demos[index].title}</strong></div><AudioLines size={24} className="studio-demo-audio-icon" /></div>
    <div className={`studio-wave-bars ${playing?'is-playing':''}`} aria-hidden="true">{[20,34,54,38,72,86,48,34,61,92,48,31,70,48,35,82,54,36,68,92,56,28,75,46,26,64,84,42,68,32,58,24].map((n,i)=><i key={i} style={{'--bar-height': `${n}%`, '--bar-delay':`${(i%6)*.11}s`}}/>)}</div>
    <div className="studio-demo-controls">
      <div className="studio-demo-genders" role="group" aria-label="Filter voice by gender">
        {['male', 'female'].map(option=><button type="button" key={option} className={gender===option?'active':''} aria-pressed={gender===option} onClick={()=>select(index, option)}>{option === 'male' ? 'Male' : 'Female'}</button>)}
      </div>
      <div className="studio-demo-options" role="group" aria-label="Choose lead qualification voice tier">{demos.map((demo,i)=><button type="button" key={demo.option} className={index===i?'active':''} aria-pressed={index===i} onClick={()=>select(i)}>{demo.option}</button>)}</div>
    </div>
    <div className="studio-demo-bottom"><span>{demos[index].category}</span><span>Real audio sample <ArrowUpRight size={14}/></span></div>
  </div>;
}
