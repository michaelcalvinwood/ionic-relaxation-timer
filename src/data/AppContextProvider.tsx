import React, { useState, useEffect, useCallback } from "react";
import AppContext, { Preset, Song } from "./app-context";
import { Storage } from '@capacitor/storage';

import angelPic from '../assets/images/base64/angel';
import cactusPic from "../assets/images/base64/cactus";
import infinityPic from "../assets/images/base64/infinity";
import moonPic from "../assets/images/base64/moon";
import longMeditaitonPic from "../assets/images/base64/long-meditation";

import angelSong from '../assets/music/Somewhere-an-Angel.mp3';
import longMeditationSong from '../assets/music/Long-Meditation.mp3';
import moonSatelliteSong from '../assets/music/MoonSatellite_WithoutPiano.mp3';
import stringsOfInfinitySong from '../assets/music/Strings-of-the-Infinity.mp3';
import westCactusSong from '../assets/music/WestCactusDream.mp3';

const angelAudio = new Audio(angelSong);
const longMeditationAudio = new Audio(longMeditationSong);
const moonSatelliteAudio = new Audio(moonSatelliteSong);
const stringsOfInfinityAudio = new Audio(stringsOfInfinitySong);
const westCactusAudio = new Audio(westCactusSong);

const AppContextProvider: React.FC = props => {
  // define what we want to share with the components
  const [presets, setPresets] = useState<Preset[]>([]);
  const [curPreset, setCurPreset] = useState<Preset | null>(null);
  const [curMusic, setCurMusic] = useState<string>("")
  const [rounds, setRounds] = useState<number>(1);
  const [totalTime, setTotalTime] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [staticValue, setStaticValue] = useState<number>(() => 1);

  const [playMusic, setPlayMusic] = useState<boolean>(false);
  const [musicAudio, setMusicAudio] = useState<HTMLMediaElement | null>(null);

  /* Data */

  const defaultPresets: Preset[] = [
    {
        id: '1',
        name: 'Serenity Regardless',
        reps: 6,
        duration: 50
    },
    {
        id: '2',
        name: 'Yoga Nidra - 61 Points',
        reps: 61,
        duration: 5
    },
    {
        id: '3',
        name: 'Gayatri Mudra Sequence',
        reps: 24,
        duration: 60
    },
    {
        id: '4',
        name: 'RASCON - 12 Zones',
        reps: 12,
        duration: 30
    },
    {
        id: '5',
        name: 'RASCON - 6 Zones',
        reps: 6,
        duration: 30
    }
]

const defaultSongs: Song[] = [
    {
      id: 'song-01',
      pic: moonPic,
      name: "Moon Satellite",
      artist: "Den Elbriggs",
      audio: moonSatelliteAudio
    },
    {
      id: 'song-02',
      pic: angelPic,
      name: "Somewhere an Angel",
      artist: "IVLIOR",
      audio: angelAudio
    },
    {
      id: 'song-03',
      pic: longMeditaitonPic,
      name: "LongMeditation",
      artist: "SoundRose",
      audio: longMeditationAudio
    },  
    {
      id: 'song-04',
      pic: cactusPic,
      name: "West Cactus Dream",
      artist: "Christos Anestopoulos",
      audio: westCactusAudio
    },
    {
      id: 'song-05',
      pic: infinityPic,
      name: "Strings of Infinity",
      artist: "Christos Anestopoulos",
      audio: stringsOfInfinityAudio
    },
    
  ]
  
  const getCurSong = () => {
    return defaultSongs!.find(song => song.id === curMusic);
  }
    /* Set storage */

    useEffect(() => {
        Storage.set({
            key: 'presets',
            value: JSON.stringify(presets)
        })
    }, [presets]);

    useEffect(() => {
        if (curPreset === null) return;

        Storage.set({
            key: 'curPreset',
            value: JSON.stringify(curPreset)
        })

        setRounds(1);
        setTotalTime(curPreset.reps * curPreset.duration);
    }, [curPreset]);

    useEffect(() => {
        if (!curMusic) return;

        if (musicAudio && playMusic) {
            musicAudio.pause();
            musicAudio.currentTime = 0;
        }

        const curSong = getCurSong();

        if (curSong) setMusicAudio(curSong.audio);

        Storage.set({
            key: 'curMusic',
            value: curMusic
        })
    }, [curMusic]);

    useEffect(() => {
        if (!musicAudio) return;

        musicAudio.volume = 1;
        musicAudio.loop = true;
        musicAudio.currentTime = 0;

        if (playMusic){
            musicAudio.play();
        }
    }, [musicAudio])

    useEffect(() => {
        if (!musicAudio) return;

        if (playMusic) musicAudio?.play();
        else {
            musicAudio.pause();
            musicAudio.currentTime = 0;
        }
    }, [playMusic])

    /* Set state dependencies */

    useEffect(() => {
        if (!curPreset) return;
        setTotalTime(curPreset.reps * curPreset.duration * rounds);
    }, [rounds]);

    /* State-management functions */

    const addPreset = (name: string, reps: number, duration: number) => {
        const newPreset: Preset = {
            id: Math.random().toString(),
            name,
            reps,
            duration
        }

        setPresets(curPresets => {
            return [...curPresets, newPreset];
        })
    };

    const deletePreset = (id: string) => {
        setPresets(curPresets => {
            return curPresets.filter(preset => preset.id !== id);
        })
    }

    const editPreset = (id: string, name: string, reps: number, duration: number) => {
        setPresets(curPresets => {
            const newPresets: Preset[] = [ ...curPresets ];
        
            for (let i = 0; i < newPresets.length; ++i) {
                if (newPresets[i].id === id) {
                    newPresets[i].name = name;
                    newPresets[i].reps = reps;
                    newPresets[i].duration = duration;
                    break;
                }
            }
    
            return([ ...newPresets]);
        })

        if (curPreset && id === curPreset.id) {
            setTotalTime(rounds * reps * duration);
        }
    }

    const decrementRounds = () => {
        setRounds(curRounds => {
            if (curRounds === undefined) return 1;
            if (curRounds === 1) return 1;
            return curRounds - 1;
        })
    }

    const incrementRounds = () => {
        setRounds(curRounds => {
            return ++curRounds;
        })
    }

    /* initContext defines initial values when app is run */

    const initContext = async () => {
        if (staticValue === 2) return;
        setStaticValue(2);

        const presetsData = await Storage.get({key: 'presets'});
        const currentPresets =  presetsData.value && presetsData.value.length ? JSON.parse(presetsData.value) : defaultPresets;
        const curPresetData = await Storage.get({key: 'curPreset'});
        const curMusicData = await Storage.get({key: 'curMusic'});

        setPresets(currentPresets);

        const selectedPreset = curPresetData.value && curPresetData.value.length ?
            JSON.parse(curPresetData.value) : 
            {id: '1', name: "Serenity Regardless", reps: 6, duration: 50};
        
        setCurPreset(selectedPreset);

        if (selectedPreset) setTotalTime(selectedPreset.reps * selectedPreset.duration);

        const selectedMusic = curMusicData.value && curMusicData.value.length ?
            curMusicData.value :
            "song-01";
        
        setCurMusic(selectedMusic);
    };

    initContext();

    return (
        <AppContext.Provider
            value = {{
                presets,
                curPreset: curPreset ? curPreset : {id: '1', name: 'Serenity Regardless', reps: 6, duration: 50},
                songs: defaultSongs,
                curMusic: curMusic,
                rounds,
                totalTime,
                isRunning,
                isError,
                playMusic,
                setPlayMusic,
                setCurPreset,
                setCurMusic,
                addPreset,
                deletePreset,
                editPreset,
                decrementRounds,
                incrementRounds,
                setIsRunning,
                setIsError,    
                initContext
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;