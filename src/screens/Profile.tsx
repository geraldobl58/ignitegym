import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";

import { HeadingScreen } from "@components/HeadingScreen";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Buttton";

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  
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
              source={{ uri: 'https://github.com/geraldobl58.png' }}
            />
          )}

          <TouchableOpacity>
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

          <Input 
            bg="gray.600"
            placeholder="Nome"
          />
           <Input 
            bg="gray.600"
            value="E-mail"
            isDisabled
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