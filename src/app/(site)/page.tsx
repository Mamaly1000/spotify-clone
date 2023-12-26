"use client";
import CustomHeader from "./Header";
import SelectedSongPreview from "@/components/preview/SelectedSongPreview";
import SongsList from "@/components/list/SongsList";
import useSongs from "@/hooks/useSongs";
 
 
export const revalidate = 0;
export default function Home() {
  const { songs } = useSongs();

  return (
    <main 
      className="relative bg-transparent min-w-full max-w-full flex flex-col items-start justify-start min-h-full max-h-fit"
    >
      <CustomHeader />
      <SelectedSongPreview songs={songs} />
      <SongsList songs={songs} />
    </main>
  );
}
