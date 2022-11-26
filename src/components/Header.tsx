import { TouchableOpacity } from 'react-native'
import { Heading, Icon, HStack, VStack, Text } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from './UserPhoto'

export function Header() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        size={16}
        source={{ uri: 'https://github.com/geraldobl58.png' }}
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
          John Doe
        </Heading>
      </VStack>

      <TouchableOpacity>
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