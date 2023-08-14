import React, { FunctionComponent } from 'react';
import { SongOverviewContainer, SongOverviewImage } from './SingleBook.styles';
import { trimText } from '../../utils/helper';
import { Icon } from '@iconify/react';
import IBook from '../../interfaces/book.interface';
import { useNavigate } from 'react-router-dom';

interface Props {
  book: IBook;
}

const BookOverview: FunctionComponent<Props> = ({ book }) => {
  const navigate = useNavigate();

  return (
    <SongOverviewContainer
      onClick={() => {
        console.log('here clicked on ', book.id);
        navigate(`/singleBook/${book.id}`);
      }}
    >
      <SongOverviewImage url={book.thumbnailUrl}>
        <Icon
          color="white"
          className="playicon"
          icon={
            !true
              ? 'material-symbols:pause-circle-rounded'
              : 'material-symbols:play-circle-rounded'
          }
          width="80px"
          height="80px"
        />
      </SongOverviewImage>
      <p>{trimText(book.title, 20)}</p>
    </SongOverviewContainer>
  );
};

export default BookOverview;
