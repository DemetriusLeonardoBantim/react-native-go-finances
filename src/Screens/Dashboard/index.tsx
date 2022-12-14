import React, {useCallback, useEffect, useState} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import {ActivityIndicator} from 'react-native'
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
    LogoutButton,
    LoadContainer
  } from './style'
  import {useTheme} from 'styled-components'
import {HighlightCard} from '../../Components/HighlightCard'
import {TransactionCard, TransactionCardProps} from '../../Components/TransactionCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard(){
  const [transactions, setTransactions] = useState<DataListProps[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData) 

  const theme = useTheme()

  const dataKey = "@gofinances:transactions"

  function getLastTransactionDate(
    collection : DataListProps[],
    type: 'positive' | 'negative'  
  ){

    const lastTransaction = new Date(
    Math.max.apply(Math, collection
    .filter(transaction => transaction.type === type)
    .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransaction(){
    try{
      const response = await AsyncStorage.getItem(dataKey)
      const transactions = response ? JSON.parse(response) : []
    
      let entriesTotal = 0;
      let expensiveTotal = 0; 

      const transactionsFormated: DataListProps[] = transactions.map((item : DataListProps) => {

        if(item.type === 'positive'){
          entriesTotal += Number(item.amount)
        }
        else{
          expensiveTotal += Number(item.amount)
        }

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

      setTransactions(transactionsFormated)

      const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
      const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')

      const total = entriesTotal - expensiveTotal
      setHighlightData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `??ltima entrada dia ${lastTransactionEntries}`
        },
        expensives: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `??ltima sa??da dia  ${lastTransactionExpensives}`
        },
        total: {
          amount: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: ''
        }
      })
      setIsLoading(false)
    }catch(_){}
  }

  useEffect(() => {
    loadTransaction()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransaction();
  }, []));

  return (
    <Container >
      {
        isLoading ? 
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large"  />
          </LoadContainer> 
          :
        <>
            <Header>
              <UserWrapper>
              <UserInfo>
                <Photo source={{uri: 'https://avatars.githubusercontent.com/u/67908082?v=4'}} />   
                <User>
                  <UserGreeting>Ol??, </UserGreeting>
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
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
                type='up'
              /> 
              <HighlightCard 
                title='Saidas'
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.entries.lastTransaction}
                type='down'
              />
              <HighlightCard 
                title='Total' 
                amount={highlightData.total.amount}
                lastTransaction='01 ?? 16 de abril' 
                type='total'
              />
            </HighlightCards>

            <Transactions>
              <Title>
                Listagem
              </Title>

              <TransactionList 
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item}/>}
              />
          </Transactions>
        </>
      }
    </Container>
  )
}

