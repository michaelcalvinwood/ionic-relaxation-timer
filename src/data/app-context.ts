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
    curPreset: Preset,
    rounds: number,
    totalTime: number,
    isRunning: boolean;
    isError: boolean;
    setCurPreset: (preset: Preset) => void;
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
    rounds: 1,
    totalTime: 300,
    isRunning: false,
    isError: false,
    setCurPreset: () => {},
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