import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons
} from "@ionic/react";
import React from "react";

const AddPreset: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/timer" color="light"/>
                    </IonButtons>
                    <IonTitle>
                        Add Preset
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>Add Preset</h2>
            </IonContent>
        </IonPage>
    )
}

export default AddPreset;