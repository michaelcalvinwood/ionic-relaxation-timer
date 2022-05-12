import React, { useState, useEffect, useCallback } from "react";
import AppContext, { Preset } from "./app-context";
import { Storage } from '@capacitor/storage';

const AppContextProvider: React.FC = props => {
  // define what we want to share with the components
  const [presets, setPresets] = useState<Preset[]>([]);
  const [curPreset, setCurPreset] = useState<string>('');
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
        Storage.set({
            key: 'curPreset',
            value: curPreset
        })
    }, [curPreset]);

    /* Set state dependencies */

    useEffect(() => {
        if (!curPreset) return;
        // find the preset that matches the id of curPreset
        // setTotalTime based on the rounds * preset.reps * preset.duration
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
            setPresets(currentPresets);

            const curPresetData = await Storage.get({key: 'curPreset'});
            const selectedPresetId = curPresetData.value ? curPresetData.value : '1';
            setCurPreset(selectedPresetId);
    
            const selectedPreset: Preset | undefined = currentPresets.find((item: Preset) => item.id === selectedPresetId);

            if (selectedPreset) setTotalTime(selectedPreset.reps * selectedPreset.duration);
        };

        initContext();

    return (
        <AppContext.Provider
            value = {{
                presets,
                curPreset,
                rounds,
                totalTime,
                isRunning,
                isError,
                setCurPreset,
                addPreset,
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