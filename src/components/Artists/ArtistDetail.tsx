
import React from 'react';
import { X } from 'lucide-react';
import type { Artist } from '@/data/artists';

interface ArtistDetailProps {
  artist: Artist;
  onClose: () => void;
}

const ArtistDetail = ({ artist, onClose }: ArtistDetailProps) => {
  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="space-y-6">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full rounded-lg object-contain bg-magic-dark/60 max-h-[500px]"
        />
        
        <div>
          <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{artist.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
