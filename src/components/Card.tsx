import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";

import { Entypo } from '@expo/vector-icons'

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { api } from "@services/api";

type CardProps = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function Card({ data, ...rest }: CardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} mb={3} rounded="md">
        <Image
          w={16}
          h={16}
          mr={4}
          rounded="md"
          alt="Nado borboleta"
          resizeMode="cover"
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
        />

        <VStack flex={1}>
          <Heading
            color="white"
            fontSize="lg"
          >
            {data.name}
          </Heading>

          <Text
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            {data.series} séries x {data.series} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />

      </HStack>
    </TouchableOpacity>
  )
}