import React from 'react'
import { FlatList } from 'react-native';

import {Button} from '../../Components/Forms/Button'
import { categories } from '../../Utils/categories';

import {Container, Header, Title, Category, Icon, Name, Separator, Footer } from './style'

interface Category {
  key: string
  name: string
}

interface Props {
  category: Category;
  setCategory: (name: Category) => void;
  closeSelectCategory: () => void;
}



export function CategorySelect({category, setCategory, closeSelectCategory }: Props){
  
  function handleCategorySelect(item: Category) {
    setCategory(item)
  }

  return(
    <Container>
      <Header>
        <Title>
          Categoriaa
        </Title>
      </Header>

      <FlatList data={categories}  style={{ flex: 1, width: '100%' }} ItemSeparatorComponent={ () => <Separator/> }    keyExtractor={(item) => item.key} renderItem={({item}) => (
        <Category onPress={() => handleCategorySelect(item)} isActive={category.key === item.key}>
          <Icon name={item.icon} />
          <Name>{item.name} </Name>
        </Category>
      )}/>

      <Footer>
        <Button title="Enviar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  )
}