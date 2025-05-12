
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { artists } from '@/data/artists';
import ArtistCard from './ArtistCard';
import ArtistDetail from './ArtistDetail';

export const ArtistGrid = () => {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onClick={() => setSelectedArtist(artist.id)}
          />
        ))}
      </div>

      <Dialog open={!!selectedArtist} onOpenChange={() => setSelectedArtist(null)}>
        <DialogContent className="max-w-2xl">
          {selectedArtist && (
            <ArtistDetail
              artist={artists.find(a => a.id === selectedArtist)!}
              onClose={() => setSelectedArtist(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistGrid;
