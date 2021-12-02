import {
  RangeSlider,
  RangeSliderTrack,
  Heading,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';

const Report = () => {
  return (
    <>
    <Heading fontSize='20px' color='gray.200'>Time Remain</Heading>
    <RangeSlider defaultValue={[100, 200]} min={0} max={300} step={30}  mx='auto'>
      <RangeSliderTrack bg='gray.500'>
        <RangeSliderFilledTrack bg='gray.700' />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} index={0} />
    </RangeSlider>
    </>
  );
};

export default Report;
