import { FunctionComponent, useState } from 'react';
import { Box } from '@mui/system';
import { Typography, Slide } from '@mui/material';

//components
import Transition from '../../components/Transition';

//styles
import { PageContainer } from '../page.styles';
import {
  AboutContainer,
  ImageContainer,
  ReadMoreButton,
  ReadMoreContainer,
  ScrollContent,
} from './about.styles';
import { AnimatePresence } from 'framer-motion';

//assets
import dadaji from '../../assets/images/dadaji.png';
import maimg from '../../assets/images/MA-image1.png';
import data from './about.data';
import { Icon } from '@iconify/react';

interface Prop {}
const AboutGuru: FunctionComponent<Prop> = () => {
  const [toggleOnDadaji, setToggleOnDadaji] = useState<boolean>(false);
  const [dadajiReadMore, setDadajiReadMore] = useState<boolean>(false);
  const [toggleOnMA, setToggleOnMA] = useState<boolean>(false);
  const [MAReadMore, setMAReadMore] = useState<boolean>(false);
  return (
    <Transition>
      <PageContainer>
        <AboutContainer>
          {MAReadMore ? (
            <ReadMoreContainer
              initial={{ y: '20vh', opacity: 0 }}
              animate={{ y: '0', opacity: 1 }}
              exit={{ y: '20vh', opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              key="modal"
            >
              <Box onClick={() => setMAReadMore(false)}>
                <Icon
                  style={{ cursor: 'pointer' }}
                  width="30"
                  icon="material-symbols:arrow-back-rounded"
                />
              </Box>
              <ScrollContent>{data[0].details}</ScrollContent>
            </ReadMoreContainer>
          ) : (
            <ImageContainer
              imgWidth="580px"
              hover={toggleOnDadaji || dadajiReadMore}
            >
              <img
                onMouseOver={() => {
                  setToggleOnDadaji(true);
                }}
                onMouseLeave={() => {
                  setToggleOnDadaji(false);
                }}
                src={dadaji}
                alt=""
              />

              <ReadMoreButton
                onMouseOver={() => {
                  setToggleOnDadaji(true);
                }}
                onClick={() => setDadajiReadMore(true)}
                readmore={toggleOnDadaji}
              >
                {toggleOnDadaji && !dadajiReadMore ? 'Read more' : data[0].name}
              </ReadMoreButton>
            </ImageContainer>
          )}
          {dadajiReadMore ? (
            <ReadMoreContainer
              initial={{ y: '20vh', opacity: 0 }}
              animate={{ y: '0', opacity: 1 }}
              exit={{ y: '20vh', opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              key="modal"
            >
              <Box onClick={() => setDadajiReadMore(false)}>
                <Icon
                  style={{ cursor: 'pointer' }}
                  width="30"
                  icon="material-symbols:arrow-back-rounded"
                />
              </Box>
              <ScrollContent>{data[1].details}</ScrollContent>
            </ReadMoreContainer>
          ) : (
            <ImageContainer imgWidth="400px" hover={toggleOnMA || MAReadMore}>
              <img
                onMouseOver={() => {
                  setToggleOnMA(true);
                }}
                onMouseLeave={() => {
                  setToggleOnMA(false);
                }}
                src={maimg}
                alt=""
              />

              <ReadMoreButton
                onMouseOver={() => {
                  setToggleOnMA(true);
                }}
                onClick={() => setMAReadMore(true)}
                readmore={toggleOnMA}
              >
                {toggleOnMA && !MAReadMore ? 'Read more' : data[1].name}
              </ReadMoreButton>
            </ImageContainer>
          )}
        </AboutContainer>
      </PageContainer>
    </Transition>
  );
};
export default AboutGuru;
