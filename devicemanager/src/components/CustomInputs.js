import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default function FormInput({ labelName, ...rest }) {
    return (
      <TextInput
      mode="outlined"
        label={labelName}
        placeholder={`device ${labelName}`}
        numberOfLines={1}
        {...rest}
      />
    );
  }