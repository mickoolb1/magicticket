
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Artist } from '@/data/artists';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard = ({ artist, onClick }: ArtistCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer bg-magic-dark/60 backdrop-blur-md border border-magic/20"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full aspect-[4/3] object-contain bg-magic-dark/60 rounded-lg"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white">{artist.name}</h3>
          </div>
        </div>
        <p className="text-white/80 text-sm line-clamp-4">{artist.bio}</p>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
