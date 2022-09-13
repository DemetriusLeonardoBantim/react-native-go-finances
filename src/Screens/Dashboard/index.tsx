import React, {useEffect, useState} from 'react'
import { 
    Container, 
    Header,
    UserWrapper, 
    UserInfo, 
    Photo, 
    User, 
    UserGreeting, 
    UserName,
    Icon, 
    HighlightCards, 
    Transactions, 
    Title,
    TransactionList,
    LogoutButton
  } from './style'
import {HighlightCard} from '../../Components/HighlightCard'
import {TransactionCard, TransactionCardProps} from '../../Components/TransactionCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard(){
  const [data, setData] = useState<DataListProps[]>()
  const dataKey = "@gofinances:transactions"
  async function loadTransaction(){
    try{
      const response = await AsyncStorage.getItem(dataKey)
      const transactions = response ? JSON.parse(response) : []
    
      const transactionsFormated: DataListProps[] = transactions.map((item : DataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      })
      console.log('transaction aqui', transactionsFormated)
      setData(transactionsFormated)

    }catch(_){}
  }


  useEffect(() => {
    loadTransaction()
  }, [])

  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo source={{uri: 'https://avatars.githubusercontent.com/u/67908082?v=4'}} />   
        
          <User>
            <UserGreeting>Olá, </UserGreeting>
            <UserName>Demetrius</UserName>
          </User>
        </UserInfo>

        <LogoutButton onPress={() => {}}>
          <Icon name="power"/>
        </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          title='Entradas' 
          amount='R$ 17.400,00' 
          lastTransaction='Última entrada dia 13 de abril' 
          type='up'
        />
        <HighlightCard 
          title='Saidas'
          amount='R$ 1.259,00' 
          lastTransaction='Última saida dia 03 de abril'
          type='down'
        />
        <HighlightCard 
          title='Total' 
          amount='R$ 16.141,00' 
          lastTransaction='01 à 16 de abril' 
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <Title>
          Listagem
        </Title>

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />

      </Transactions>

    </Container>
  )
}
