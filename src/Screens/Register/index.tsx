import React, {useState} from 'react'
import {Container, Header, Title, Form, Fields, TransactionsType} from './style'

import {Input} from '../../Components/Forms/Input'
import {Button} from '../../Components/Forms/Button'
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton'
import {CategorySelect} from '../../Components/Forms/CategorySelect'

export function Register(){
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

  return(
    <Container>
      <Header>
        <Title>
          Cadastro
        </Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome'/>
          <Input placeholder='Preço'/>


          <TransactionsType>
            <TransactionTypeButton 
              type='up' 
              title='Income' 
              onPress={() => handleTransactionTypeSelect('up')} 
              isActive={transactionType === 'up'} 
            />

            <TransactionTypeButton 
              type='down' 
              title='Income' 
              onPress={() => handleTransactionTypeSelect('down')} 
              isActive={transactionType === 'down'} 
            />
            
          </TransactionsType>

          <CategorySelect title="Categoria" />
        </Fields>

      
        <Button title='Enviar'/>
      </Form>


    </Container>
  )
}