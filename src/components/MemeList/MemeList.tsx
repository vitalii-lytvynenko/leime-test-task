import { Meme } from '../../types';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';

type Props = {
  memes: Meme[];
};

export const MemeList: React.FC<Props> = ({ memes }) => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {memes.map(item => (
        <Card key={item.id} isPressable shadow="sm">
          <CardBody className="p-0 relative overflow-hidden">
            <Image
              alt={item.title}
              className="h-[200px] object-contain scale-125 transition-transform duration-1000 ease-in-out hover:scale-100"
              radius="lg"
              shadow="sm"
              src={item.imageUrl}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">
            <i className="fa fa-thumbs-up mr-2" aria-hidden="true"></i>{item.likes}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
