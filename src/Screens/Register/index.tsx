import React, {useState ,useEffect} from 'react'
import {Keyboard, Modal, TouchableWithoutFeedback, Alert} from 'react-native'
import {Container, Header, Title, Form, Fields, TransactionsType} from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button} from '../../Components/Forms/Button'
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton'
import {CategorySelectButton} from '../../Components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'
import {InputForm} from '../../Components/Forms/InputForm'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import uuid from 'react-native-uuid'
import {useNavigation} from '@react-navigation/native'

interface FormData {
  name: string
  amount: string
}

type NavigationProps = {
  navigate:(screen:string) => void;
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
  const dataKey = '@gofinances:transactions'
  const navigation = useNavigation<NavigationProps>()

  const {
    control, handleSubmit,formState: {errors},reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'positive' | 'negative'){
    setTransactionType(type)
  }

  async function handleRegister(form: FormData){
    if(!transactionType) return Alert.alert('Selecione o tipo de transação')

    if(category.key === 'category') return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []
      const dataFormated = [ ...currentData, newTransaction ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))

      reset()
      setTransactionType('')
      setCategory({
        key: 'catehgory',
        name: 'Categoria',
      })
      
      navigation.navigate('Listagem')

    }catch(error){
      console.log(error)
      Alert.alert('Não foi possível salvar')
    }
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  useEffect(() => {
    async function loadData(){
      const response = await AsyncStorage.getItem(dataKey)
      console.log(JSON.parse(response))
    }  
  }, [])

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
                onPress={() => handleTransactionTypeSelect('positive')} 
                isActive={transactionType === 'positive'} 
              />

              <TransactionTypeButton 
                type='down' 
                title='Income' 
                onPress={() => handleTransactionTypeSelect('negative')} 
                isActive={transactionType === 'negative'} 
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