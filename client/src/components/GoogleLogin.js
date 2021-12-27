import { Button, Image } from '@chakra-ui/react';
import { useGoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import GoogleIcon from '../assets/icons/google-icon.png';
import { loginViaGoogle } from '../actions/userActions';

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const clientId =
    '518727150893-4c80ip0io9lbbnmbrujki5l8cn4vrvvv.apps.googleusercontent.com';

  const onSuccess = (res) => {
    dispatch(loginViaGoogle(res.tokenId));
  };

  const onFailure = (res) => {
    console.log('login failure', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });

  return (
    <Button
      bg='gray.300'
      color='gray.700'
      w='100%'
      borderRadius='5px'
      my={{ base: '0.7em', sm: '1.3em' }}
      onClick={signIn}
    >
      <Image src={GoogleIcon} w='20px' mx='0.5em' mt='-2px' /> Sign In with
      Google
    </Button>
  );
};

export default GoogleLogin;
