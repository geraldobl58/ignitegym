import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { VStack, Heading, SectionList, Text, useToast, Center } from "native-base";

import { HeadingScreen } from "@components/HeadingScreen";
import { HistoryCard } from "@components/HistoryCard";

import { AppError } from "@utils/AppError";

import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { userAuth } from "@hooks/useAuth";

import { api } from "@services/api";

import { Loading } from "@components/Loading";

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()
  
  const { refreshToken } = userAuth()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const response = await api.get('/history')
      setExercises(response.data)

    } catch(error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não possível carregar o histórico.'
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, [refreshToken]))

  return (
    <VStack>
      <HeadingScreen title="Histórico de Exercícios" />

      {isLoading ? <Loading /> : (exercises?.length > 0 ?
        <SectionList
          px={8} 
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
            >
              {section.title}
            </Heading>
          )}
          showsVerticalScrollIndicator={false}
        /> :
          <Text
            color="gray.100"
            textAlign="center"
          >
            Não há exercícios registrados ainda.{'\n'}
            Bora começar hoje?
          </Text>        
      )}

    </VStack>
  )
}