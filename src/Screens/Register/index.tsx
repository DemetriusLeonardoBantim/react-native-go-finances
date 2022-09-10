import React, {useState} from 'react'
import {Keyboard, Modal, TouchableWithoutFeedback, Alert} from 'react-native'
import {Container, Header, Title, Form, Fields, TransactionsType} from './style'

import {Button} from '../../Components/Forms/Button'
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton'
import {CategorySelectButton} from '../../Components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'
import {InputForm} from '../../Components/Forms/InputForm'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

interface FormData {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().
    typeError('Informe um valor númerico').
    positive('O valor não póde ser negativo').
    required('Valor é obrigatório')
})

export function Register(){
  const [category, setCategory] = useState({
    key: 'catehgory',
    name: 'Categoria',
  })
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

  function handleRegister(form: FormData){
    if(!transactionType) return Alert.alert('Selecione o tipo de transação')

    if(category.key === 'category') return Alert.alert('Selecione a categoria')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  const {
    control, handleSubmit,formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>

        <Form>
          <Fields>
            <InputForm name="name" control={control} placeholder="Nome" autoCapitalize="sentences" autoCorrect={false} error={errors.name && errors.name.message}/>
            <InputForm name="amount" control={control} placeholder="Preço" keyboardType="numeric"  error={errors.amount && errors.amount.message}/>


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

            <CategorySelectButton title={category ? category.name : 'Selecionar categoria'} onPress={handleOpenSelectCategoryModal} />
          </Fields>

        
          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

          <Modal visible={categoryModalOpen}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
          </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}