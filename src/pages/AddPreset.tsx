import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonToast
} from "@ionic/react";
import React, { useState, useRef, useContext } from "react";
import { add } from 'ionicons/icons';
import { Preset } from '../data/app-context';
import AppContext from "../data/app-context";
import { RouteComponentProps, useHistory, withRouter } from 'react-router';

const AddPreset: React.FC = () => {
    const [errorMsg, setErrorMsg] = useState<string>('');
    const nameRef = useRef<HTMLIonInputElement>(null);
    const repsRef = useRef<HTMLIonInputElement>(null);
    const durationRef = useRef<HTMLIonInputElement>(null);
    const appCtx = useContext(AppContext);
    const history = useHistory();

    const isValidNumber = (testVal: string | null | undefined) => {
        if (!testVal) return false;
        if (testVal.toLocaleLowerCase().indexOf('e') !== -1) return false;
        if (testVal.toLocaleLowerCase().indexOf('.') !== -1) return false;
        if (Number(testVal) <= 0) return false;
        return true;
    }

    const addPreset = () => {
        let name = nameRef.current!.value;

        if (!name) {
            setErrorMsg('Please input a preset name.');
            return;
        }

        name = name.toString();

        const repeat = appCtx.presets.find(preset => preset.name.toLowerCase() === name!.toString().toLowerCase());

        if (repeat) {
            setErrorMsg('Please enter a unique name.');
            return;
        }

        let reps = repsRef.current!.value;

        if (!isValidNumber(reps?.toString())) {
            setErrorMsg('Please input a valid number of reps');
            return;
        }

        reps = Number(reps);

        let duration = durationRef.current!.value;

        if (!isValidNumber(duration?.toString())) {
            setErrorMsg('Please input a valid number of seconds');
            return;
        }

        duration = Number(duration);

        const id = Math.random().toString();

        appCtx.addPreset(name, reps, duration);

        history.push('/presets');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/timer" color="light" />
                    </IonButtons>
                    <IonTitle>
                        Add Preset
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="fixed" color='primary'>Preset Name</IonLabel>
                                <IonInput type='text' ref={nameRef}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="fixed" color="primary">Reps</IonLabel>
                                <IonInput
                                    type='number'
                                    value="1"
                                    ref={repsRef} />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="fixed" color="primary">Seconds per rep</IonLabel>
                                <IonInput type='number' value="30" ref={durationRef}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <IonButton className="ion-margin-top" fill="solid" onClick={addPreset}>
                                <IonIcon icon={add} slot="start" />
                                <IonLabel>Set Preset</IonLabel>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
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

export default withRouter(AddPreset);