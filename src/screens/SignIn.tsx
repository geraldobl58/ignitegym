import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base'

import { Controller, useForm } from 'react-hook-form'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { userAuth } from '@hooks/useAuth'

import { Input } from '@components/Input'
import { Button } from '@components/Buttton'

import { AppError } from '@utils/AppError'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { useState } from 'react'

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = userAuth()

  const toast = useToast()
  
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch(error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível entrar.'
    
      setIsLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          defaultSource={BackgroundImg} 
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode='contain'
          position="absolute" 
        />

        <Center my={24}>
            <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name="email"
            rules={{ required: 'Informe seu e-mail' }}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            rules={{ required: 'Informe sua senha' }}
            render={({ field: { onChange } }) => (
              <Input 
                secureTextEntry
                placeholder="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button 
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />

        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button 
          title="Criar conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  )
}