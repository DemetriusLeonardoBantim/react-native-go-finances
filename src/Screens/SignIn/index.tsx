import React from 'react'

import { Container,Header,TitleWrapper,Title,SignInTitle,Footer, FooterWrapper } from './style'

import AppSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import {SignInSocialButton} from '../../Components/SignInSocialButton'
import { useAuth } from '../../hooks/auth'


export function SignIn(){
  const data = useAuth()

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(200)}/>
          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title='Entrar com Google' svg={GoogleSvg}/>

          <SignInSocialButton title='Entrar com Apple' svg={AppSvg}/>
        </FooterWrapper>
      </Footer>
    </Container>
  )
}