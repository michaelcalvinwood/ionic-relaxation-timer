import './Presets.scss';
import React, { FunctionComponent, useContext, useState } from "react";
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    isPlatform,
    IonFab,
    IonFabButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonToast
} from "@ionic/react";

import { add, trashOutline, createOutline } from 'ionicons/icons';
import { Preset } from '../data/app-context';

import AppContext from "../data/app-context";
import EditPreset from './EditPreset';

function convertHMS(sec: number) {
    let hours: string | number = Math.floor(sec / 3600); // get hours
    let minutes: string | number = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds: string | number = sec - (hours * 3600) - (minutes * 60); //  get seconds

    if (hours > 0 && hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    if (hours) return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
    return minutes + ':' + seconds;
}

type Props = {component: FunctionComponent} & RouteComponentProps;


const Presets: React.FC = () => {
    const [errorMsg, setErrorMsg] = useState<string>('');
    const appCtx = useContext(AppContext);
    const history = useHistory();

    const deletePreset = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        if (appCtx.presets.length === 1) {
            setErrorMsg('You must keep at least one preset.')
            return;
        }
        appCtx.deletePreset(id);
    }

    const editPreset = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();

   
        history.push('/edit-preset/' + id);
    }

    const selectPreset = (preset: Preset) => {
        appCtx.setCurPreset(preset);
        history.push('/timer');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Presets
                    </IonTitle>
                    {isPlatform('ios') && (
                        <IonButtons slot="end">
                            <IonButton routerLink="/add-preset" color="light" routerDirection='none'>
                                <IonIcon slot="icon-only" icon={add} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent className="presets__content">
                <p className="presets__instructions">Tap to select</p>
                {appCtx.presets
                    .sort((a, b) => (a.reps * a.duration) - (b.reps * b.duration))
                    .map(preset => {
                    return (
                        <IonCard className='presets__card' key={preset.id} onClick={()=>selectPreset(preset)}>
                            <IonCardHeader className="ion-text-center">
                                <IonCardTitle>
                                    {preset.name}
                                </IonCardTitle>
                                <IonCardSubtitle>
                                    {`${convertHMS(preset.reps * preset.duration)}`}
                                </IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{preset.reps} reps</p>
                                <p>{preset.duration} seconds each</p>
                                <div className="presets__actions">
                                    <IonIcon className="presets__action" icon={trashOutline} color="warning" onClick={e => deletePreset(e, preset.id)}/>
                                    <IonIcon className="presets__action" icon={createOutline} color="primary" onClick={e => editPreset(e, preset.id)}/>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    )
                })}
                {!isPlatform('ios') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton routerLink="/add-preset" routerDirection='none'>
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
            <IonToast
                color="secondary"
                message={errorMsg}
                isOpen={!!errorMsg}
                duration={3000}
                onDidDismiss={() => setErrorMsg('')} />
        </IonPage>
    )
}

export default withRouter(Presets);