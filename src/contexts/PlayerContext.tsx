import { createContext, useState, ReactNode } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}


type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    toogleLooping: () => void;
    isShuffling: boolean;
    toogleShuffling: () => void;
    clearPlayerState: () => void;

}

type PlayerContextProviderProps ={
    children: ReactNode;
}

export const PlayerContext = createContext( {} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps ){
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsplaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsplaying(true);
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsplaying(true);
  }

  function togglePlay(){
    setIsplaying(!isPlaying);
  }

  function toogleLooping(){
    setIsLooping(!isLooping);
  }

  function setPlayingState(state: boolean){
    setIsplaying(state);
  }

  function toogleShuffling(){
    setIsShuffling(!isShuffling);
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex +1) < episodeList.length;

  function playNext(){

    if (isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if(hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex +1);
      }  
  }

  function playPrevious(){
    if (hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex-1);
    }
  }

  return( 
    <PlayerContext.Provider value={{ episodeList,
     currentEpisodeIndex, isPlaying, setPlayingState,  play, 
     togglePlay, playList, playNext, playPrevious, clearPlayerState,
     hasNext, hasPrevious, isLooping, toogleLooping, isShuffling, toogleShuffling}}>
        { children }
    </PlayerContext.Provider>)
}
