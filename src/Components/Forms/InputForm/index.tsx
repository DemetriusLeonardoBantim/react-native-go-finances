import React from 'react'
import {Input} from '../Input'
import {Control, Controller} from 'react-hook-form'
import { TextInputProps } from 'react-native'

import {Container, Error} from './styles'

interface Props extends TextInputProps {
  control: Control
  name: string
  error: any
} 

export function InputForm({
  control, name, error, ...rest
}:Props) {
  return(
    <Container>
      <Controller control={control} render={({field: {onChange, value}}) => (
        <Input {...rest} onChangeText={onChange} value={value}  />
      )} 
        name={name}
      />    
      {error && <Error>{error}</Error>}  
    </Container>
  )
}