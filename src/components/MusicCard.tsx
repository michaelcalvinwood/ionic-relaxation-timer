import './MusicCard.scss';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";

type Props = {
    pic: string,
    name: string,
    artist: string,
    selected: boolean,
    sample: () => void
}

const MusicCard: React.FC<Props> = ({pic, name, artist, selected, sample}: Props) => {
    return (
        <IonCard 
            className={selected ? 
                "music-card music-card--selected":
                "music-card"}>
            <img className="music-card__image" src={pic} />
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
                <IonCardSubtitle>{artist}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-right">
                <IonButton
                    onClick={sample}>
                    Sample
                </IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default MusicCard;