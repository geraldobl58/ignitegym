import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";

import { Entypo } from '@expo/vector-icons'

type CardProps = TouchableOpacityProps & {

}

export function Card({ ...rest }: CardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} mb={3} rounded="md">
        <Image
          w={16}
          h={16}
          mr={4}
          rounded="md"
          alt="Nado borboleta"
          source={{ uri: 'https://www.webrun.com.br/wp-content/uploads/2019/05/AdobeStock_103255983.jpeg' }}
        />

        <VStack flex={1}>
          <Heading
            color="white"
            fontSize="lg"
          >
            Nado borboleta
          </Heading>

          <Text
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            5 chegada de 50 metros
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />

      </HStack>
    </TouchableOpacity>
  )
}