import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Buttton";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>

      <VStack px={8} pt={12} bg="gray.600">
        <TouchableOpacity onPressIn={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          mt={4}
          mb={8}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
          >
            5 chegada de 50 metros
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text
              ml={1}
              color="gray.200"
              textTransform="capitalize"
            >
              Nado borboleta
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image 
          w="full"
          h={80}
          mb={3}
          resizeMode="cover"
          rounded="lg"
          alt="Nome do exerício"
          source={{ uri: 'https://www.webrun.com.br/wp-content/uploads/2019/05/AdobeStock_103255983.jpeg' }}
        />

        <Box
          pb={4}
          px={4}
          bg="gray.600"
          rounded="md"
        >
          <HStack
            mb={6}
            mt={5}
            alignItems="center"
            justifyContent="space-around"
          >
            <HStack>
              <SeriesSvg />
              <Text
                ml={2}
                color="gray.200"
              >
                50 metros
              </Text>
            </HStack>
            <HStack>
              <RepetitionsSvg />
              <Text
                ml={2}
                color="gray.200"
              >
                5 chegadas
              </Text>
            </HStack>
          </HStack>

          <Button 
            title="Marcar como realizado"
          />
        </Box>
      </VStack>

    </VStack>
  )
}