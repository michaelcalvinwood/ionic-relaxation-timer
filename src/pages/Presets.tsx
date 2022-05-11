import React from "react";
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
    IonFabButton
} from "@ionic/react";

import { add } from 'ionicons/icons';

const Presets: React.FC = () => {
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
            <IonContent>
                <h2>Presets</h2>
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