import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Icon, Image, ScrollView, Text, useToast, VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Buttton";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  const route = useRoute()

  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
      
    } catch(error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não possível carregar os grupos.'
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

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
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text
              ml={1}
              color="gray.200"
              textTransform="capitalize"
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? <Loading /> : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image 
                w="full"
                h={80}
                resizeMode="cover"
                rounded="lg"
                alt="Nome do exerício"
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
              />
            </Box>

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
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text
                    ml={2}
                    color="gray.200"
                  >
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button 
                title="Marcar como realizado"
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}