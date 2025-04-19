import { ErrorMessages, Meme } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { updateMeme } from '../../api';
import { updateMeme as updateMemeAction } from '../../features/memes';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

type Props = {
  meme: Meme | null;
  onClose: () => void;
};

export const MemeModal: React.FC<Props> = ({ meme, onClose }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [likes, setLikes] = useState('');
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({
    title: ErrorMessages.DEFAULT,
    imageUrl: ErrorMessages.DEFAULT,
    likes: ErrorMessages.DEFAULT,
  });

  useEffect(() => {
    if (meme) {
      setTitle(meme.title);
      setImageUrl(meme.imageUrl);
      setLikes(String(meme.likes));
      setErrors({
        title: ErrorMessages.DEFAULT,
        imageUrl: ErrorMessages.DEFAULT,
        likes: ErrorMessages.DEFAULT,
      });
    }
  }, [meme]);

  const validate = () => {
    const newErrors = {
      title: ErrorMessages.DEFAULT,
      imageUrl: ErrorMessages.DEFAULT,
      likes: ErrorMessages.DEFAULT,
    };

    if (!title || title.length < 3 || title.length > 100) {
      newErrors.title = ErrorMessages.TITLE;
    }
    if (!/^https?:\/\/.+\.jpg$/.test(imageUrl)) {
      newErrors.imageUrl = ErrorMessages.URL;
    }
    const numLikes = Number(likes);
    if (isNaN(numLikes) || numLikes < 0 || numLikes > 99) {
      newErrors.likes = ErrorMessages.LIKES;
    }
    setErrors(newErrors);
    return Object.values(newErrors).every(msg => msg === ErrorMessages.DEFAULT);
  };

  const handleSave = async () => {
    if (!meme || !validate()) return;

    const updated = {
      ...meme,
      title,
      imageUrl,
      likes: Number(likes),
    };

    try {
      const updatedFromServer = await updateMeme(String(updated.id), updated);
      dispatch(updateMemeAction(updatedFromServer));

      const stored = localStorage.getItem('memes');
      if (stored) {
        const memes = JSON.parse(stored);
        const updatedMemes = memes.map((m: Meme) =>
          m.id === updatedFromServer.id ? updatedFromServer : m
        );
        localStorage.setItem('memes', JSON.stringify(updatedMemes));

        onClose();
      }
    } catch (error) {
      console.error('Failed to update meme:', error);
    }
  };

  return (
    <Modal isOpen={!!meme} onClose={() => onClose()}>
      <ModalContent>
        <ModalHeader>Edit Meme</ModalHeader>
        <ModalBody>
          <Input
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            isInvalid={!!errors.title}
            errorMessage={errors.title}
            isRequired
          />
          <Input
            label="Image URL"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            isInvalid={!!errors.imageUrl}
            errorMessage={errors.imageUrl}
            isRequired
          />
          <Input
            label="Likes"
            type="number"
            value={likes}
            onChange={e => setLikes(e.target.value)}
            isInvalid={!!errors.likes}
            errorMessage={errors.likes}
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onClose()} variant="light">
            Cancel
          </Button>
          <Button onPress={handleSave} color="primary">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
