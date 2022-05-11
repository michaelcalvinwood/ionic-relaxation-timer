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
    
        /* initContext defines initial values when app is run */
    
        // wrap initContext in useCallback with [] dependency so that this function is never regenerated when the Provider changes. I.e. make it static (created only once)
        // this way we can use initContext as a useEffect dependency in the App component to ensure that it is run only once (as initiContext will never change)
        const initContext = useCallback( async () => {
            const presetsData = await Storage.get({key: 'presets'});
            const curPresetData = await Storage.get({key: 'curPreset'});
    
            setPresets(presetsData.value ? JSON.parse(presetsData.value) : []);
            setCurPreset(curPresetData.value ? curPresetData.value : '');
    
            if (curPresetData.value) {
                // set rounds, totalTime, etc. here
            }
        }, []);
    
        // return the Provider with the value set to that which we want to share
    
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