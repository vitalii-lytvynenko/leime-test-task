import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useState } from 'react';
import { Meme } from '../../types';
import { MemeModal } from '../MemeModal';

type Props = {
  memes: Meme[];
};

export const MemeTable: React.FC<Props> = ({ memes }) => {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  return (
    <>
      <Table aria-label="Meme table">
        <TableHeader>
          <TableColumn className="text-center">ID</TableColumn>
          <TableColumn className="text-center">Title</TableColumn>
          <TableColumn className="text-center">Likes</TableColumn>
          <TableColumn className="text-center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map(meme => (
            <TableRow key={meme.id}>
              <TableCell className="text-center">{meme.id}</TableCell>
              <TableCell className="text-center">{meme.title}</TableCell>
              <TableCell className="text-center">{meme.likes}</TableCell>
              <TableCell className="text-center">
                <Button className="" onPress={() => setSelectedMeme(meme)} isIconOnly>
                  <i className="far fa-edit text-xl"></i>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MemeModal meme={selectedMeme} onClose={() => setSelectedMeme(null)} />
    </>
  );
};
