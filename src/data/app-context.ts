import React from "react";

// use interface to create a variable that defines the type of data to be included in the object
export interface Preset {
    id: string;
    name: string;
    reps: number;
    duration: number;
}

export interface Song {
    id: string;
    pic: string;
    name: string;
    artist: string;
    audio: HTMLMediaElement;
}

const AppContext = React.createContext<{
    // what type of data are we going to share?
    presets: Preset[],
    curPreset: Preset,
    songs: Song[],
    curMusic: string,
    rounds: number,
    totalTime: number,
    isRunning: boolean;
    isError: boolean;
    playMusic: boolean;
    setPlayMusic: (state: boolean) => void;
    setCurPreset: (preset: Preset) => void;
    setCurMusic: (song: string) => void;
    addPreset: (name: string, reps: number, duration: number) => void;
    deletePreset: (id: string) => void;
    editPreset: (id: string, name: string, reps: number, duration: number) => void;
    decrementRounds: () => void;
    incrementRounds: () => void;
    setIsRunning: (state: boolean) => void;
    setIsError: (state: boolean) => void;
    initContext: () => void;

}>({
    // what is the default value of the data we are going to share?
    presets: [],
    curPreset: {
        id: '1',
        name: 'Serenity Regardless',
        reps: 6,
        duration: 50
    },
    songs: [],
    curMusic: 'song-01',
    rounds: 1,
    totalTime: 300,
    isRunning: false,
    isError: false,
    playMusic: false,
    setPlayMusic: () => {},
    setCurPreset: () => {},
    setCurMusic: () => {},
    addPreset: () => {},
    deletePreset: () => {},
    editPreset: () => {},
    decrementRounds: () => {},
    incrementRounds: () => {},
    setIsRunning: () => {},
    setIsError: () => {},    
    initContext: () => {}
});

export default AppContext;