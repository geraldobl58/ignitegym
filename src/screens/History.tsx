import { VStack } from "native-base";

import { Heading } from "@components/Heading";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  return (
    <VStack>
      <Heading title="Histórico de Exercícios" />

      <HistoryCard />
    </VStack>
  )
}