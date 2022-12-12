import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { 
  Center, 
  Heading, 
  ScrollView, 
  Skeleton, 
  Text, 
  VStack,
  useToast
} from "native-base";

import { Controller, useForm } from 'react-hook-form'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { HeadingScreen } from "@components/HeadingScreen";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Buttton";

import { userAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/geraldobl58.png')

  const toast = useToast()

  const { user } = userAuth()

  const { control } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    }
  })

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
  
      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Whoops: A imagem deve conter até 5MB',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
  
    } catch(error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack>
      <HeadingScreen title="Perfil" />

      <ScrollView>
        <Center pt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton 
              w={PHOTO_SIZE} 
              h={PHOTO_SIZE} 
              rounded="full"
              startColor="gray.500"
              endColor="gray.400" 
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              alt="Foto de perfil do usuário" 
              source={{ uri: userPhoto }}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600"
                value="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Center>

        <VStack px={10} mt={12} mb={32}>
          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
          >
            Alterar senha
          </Heading>

          <Input 
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input 
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input 
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />
          <Button 
            title="Atualizar"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}