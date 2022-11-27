import { useState } from "react";
import { VStack, Heading, SectionList, Text } from "native-base";

import { HeadingScreen } from "@components/HeadingScreen";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.11.22',
      data: ['Nado Costa', 'Nado Peito']
    },
    {
      title: '27.11.22',
      data: ['Nado Borboleta']
    }
  ])

  return (
    <VStack>
      <HeadingScreen title="Histórico de Exercícios" />

      <SectionList
        px={8} 
        sections={exercises}
        keyExtractor={item => item}
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