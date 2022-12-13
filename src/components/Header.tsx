import { TouchableOpacity } from 'react-native'
import { Heading, Icon, HStack, VStack, Text } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from './UserPhoto'

import { userAuth } from '@hooks/useAuth'

import { api } from '@services/api'

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

export function Header() {
  const { user, signOut } = userAuth()

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        size={16}
        source={user.avatar 
          ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
          : defaultUserPhotoImg
        }
        alt="Imagem do usuário"
        mr={4}
      />
      <VStack flex={1}>
        <Text 
          color="gray.100"
          fontSize="md"
        >
          Olá
        </Text>
        
        <Heading 
          color="gray.100"
          fontSize="md"
        >
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}