import { Center, Heading as NativeBaseHeading } from "native-base";

type HeadingProps = {
  title: string
}

export function HeadingScreen({ title }: HeadingProps) {
  return (
    <Center
      bg="gray.600"
      pb={6}
      pt={16}
    >
      <NativeBaseHeading
        color="gray.100"
        fontSize="xl"
      >
        {title}
      </NativeBaseHeading>
    </Center>
  )
}