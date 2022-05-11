import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const PageTemplate: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            PageTemplate
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>PageTemplate</h2>
      </IonContent>
    </IonPage>
  )
}

export default PageTemplate;