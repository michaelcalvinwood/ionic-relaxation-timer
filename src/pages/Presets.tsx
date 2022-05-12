import './Presets.scss';
import React, { useContext } from "react";
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
    IonCardContent
} from "@ionic/react";

import { add, trashOutline, createOutline } from 'ionicons/icons';

import AppContext from "../data/app-context";

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

const Presets: React.FC = () => {
    const appCtx = useContext(AppContext);

    const deletePreset = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();

        console.log('delete', id);
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
                            <IonButton routerLink="/add-preset" color="light">
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
                        <IonCard className='presets__card' key={preset.id}>
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
                                    <IonIcon className="presets__action" icon={createOutline} color="primary"/>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    )
                })}
                {!isPlatform('ios') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton routerLink="/add-preset">
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
        </IonPage>
    )
}

export default Presets;