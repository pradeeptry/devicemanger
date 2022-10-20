

import * as React from 'react';
import { Button } from 'react-native-paper';

const CustomButton = ({title,...rest}) => (
  <Button  mode="contained" style={{marginVertical:10}} {...rest}>
    {title}
  </Button>
);

export default CustomButton;


