import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { VStack, Heading, SectionList, Text, useToast } from "native-base";

import { HeadingScreen } from "@components/HeadingScreen";
import { HistoryCard } from "@components/HistoryCard";

import { AppError } from "@utils/AppError";

import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { api } from "@services/api";

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

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
  }, []))

  return (
    <VStack>
      <HeadingScreen title="Histórico de Exercícios" />

      <SectionList
        px={8} 
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard />
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
        ListEmptyComponent={() => (
          <Text
            color="gray.100"
            textAlign="center"
          >
            Não há exercícios registrados ainda.{'\n'}
            Bora começar hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}