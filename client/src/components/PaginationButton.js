import { Button } from '@chakra-ui/react';

const PaginationButton = ({ icon, size, onClickHandler }) => {
  return (
    <Button
      rightIcon={icon}
      pl={{ base: '0', md: '0.3em' }}
      h='2em'
      variant='outline'
      size={size}
      borderRadius={{ base: '4', md: '5' }}
      onClick={onClickHandler}
    />
  );
};

export default PaginationButton;
