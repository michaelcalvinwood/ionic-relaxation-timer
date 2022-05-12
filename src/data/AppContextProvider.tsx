import React, { useState, useEffect, useCallback } from "react";
import AppContext, { Preset } from "./app-context";
import { Storage } from '@capacitor/storage';

const AppContextProvider: React.FC = props => {
  // define what we want to share with the components
  const [presets, setPresets] = useState<Preset[]>([]);
  const [curPreset, setCurPreset] = useState<Preset | null>(null);
  const [rounds, setRounds] = useState<number>(1);
  const [totalTime, setTotalTime] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [staticValue, setStaticValue] = useState<number>(() => 1);
    
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

    /* initContext defines initial values when app is run */

    const initContext = async () => {
        if (staticValue === 2) return;
        setStaticValue(2);

        const presetsData = await Storage.get({key: 'presets'});
        const currentPresets =  presetsData.value && presetsData.value.length ? JSON.parse(presetsData.value) : defaultPresets;
        const curPresetData = await Storage.get({key: 'curPreset'});

        setPresets(currentPresets);

        const selectedPreset = curPresetData.value && curPresetData.value.length ?
            JSON.parse(curPresetData.value) : 
            {id: '1', name: "Serenity Regardless", reps: 6, duration: 50};
        
        setCurPreset(selectedPreset);

        if (selectedPreset) setTotalTime(selectedPreset.reps * selectedPreset.duration);
    };

    initContext();

    return (
        <AppContext.Provider
            value = {{
                presets,
                curPreset: curPreset ? curPreset : {id: '1', name: 'Serenity Regardless', reps: 6, duration: 50},
                rounds,
                totalTime,
                isRunning,
                isError,
                setCurPreset,
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