import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext } from "react";
import MusicCard from "../components/MusicCard";
import AppContext from "../data/app-context";



const sampleSong = (audio: HTMLMediaElement) => {
  audio.volume = 1;
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 15000)
}


const MusicSettings: React.FC = () => {
  const appCtx = useContext(AppContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Music
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {appCtx.songs.map(song => {
          return (
            <div 
              onClick={() => appCtx.setCurMusic(song.id)}
              key={song.id}>
              <MusicCard
                pic={song.pic}
                name={song.name}
                artist={song.artist}
                selected={song.id === appCtx.curMusic ? true : false}
                sample={() => sampleSong(song.audio)}
              />
            </div>
          )
        })}
      </IonContent>
    </IonPage>
  )
}

export default MusicSettings;