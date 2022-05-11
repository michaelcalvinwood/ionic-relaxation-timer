import React from "react";

// use interface to create a variable that defines the type of data to be included in the object
export interface Preset {
    id: string;
    name: string;
    reps: number;
    duration: number;
}

const AppContext = React.createContext<{
    // what type of data are we going to share?
    presets: Preset[],
    curPreset: string,
    rounds: number,
    totalTime: number,
    isRunning: boolean;
    isError: boolean;
    setCurPreset: (id: string) => void;
    addPreset: (name: string, reps: number, duration: number) => void;
    editPreset: (id: string, name: string, reps: number, duration: number) => void;
    decrementRounds: () => void;
    incrementRounds: () => void;
    setIsRunning: (state: boolean) => void;
    setIsError: (state: boolean) => void;
    initContext: () => void;
}>({
    // what is the default value of the data we are going to share?
    presets: [],
    curPreset: '',
    rounds: 1,
    totalTime: 300,
    isRunning: false,
    isError: false,
    setCurPreset: () => {},
    addPreset: () => {},
    editPreset: () => {},
    decrementRounds: () => {},
    incrementRounds: () => {},
    setIsRunning: () => {},
    setIsError: () => {},    
    initContext: () => {}
});

export default AppContext;