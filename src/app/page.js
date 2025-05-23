'use client'
import { Box, Flex, Heading, Button, IconButton, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CiLocationOn, CiUser  } from "react-icons/ci";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box minH="100vh" bgImage="url(/teladeinicio.png)" bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
      <Flex
        as="header"
        w="100%"
        h="100px"
        bg="#181824"
        color="white"
        align="center"
        justify="space-between"
        px={8}
        boxSizing="border-box"
        position="relative"
        zIndex={10}
      >
        <Flex align="center" gap={2}>
          <Image 
            mr="15px"
            ml="50px" 
            src="/tocomfomenome.png" 
            alt="logo"  
            boxSize="90px"
            objectFit="contain"></Image>
        </Flex>

        <Flex ml={-660} gap={8} fontWeight="medium" fontSize="md">
           <IconButton
            fontFamily="Montserrat"
            variant="ghost"
            color="#f6f6f6"
            fontSize="md"
            _hover={{ color: "#e05a6d", bg: "transparent" }}
          >Como Funciona</IconButton>
          <IconButton
            fontFamily="Montserrat"
            variant="ghost"
            color="#f6f6f6"
            fontSize="md"
            _hover={{ color: "#e05a6d", bg: "transparent" }}
            onClick={() => router.push("/about")}
          >Sobre o restaurante</IconButton>
          <IconButton
            fontFamily="Montserrat"
            variant="ghost"
            color="#f6f6f6"
            fontSize="md"
            _hover={{ color: "#e05a6d", bg: "transparent" }}
            onClick={() => router.push("/location")}
          >Localização</IconButton>
        </Flex>

        <Flex align="center" gap={3}>
          <IconButton
            fontFamily="Montserrat"
            fontWeight="bold"
            bg="transparent"
            variant="ghost"
            color="#fff"
            size="md"
            borderRadius="md"
            px={5}
            _hover={{ 
              bg: "white", 
              color: "#e05a6d",
              opacity: 0.9,
              transform: "scale(1.01)",
              transition: "0.3s", 
            }}
            onClick={() => router.push("/register")}
          ><CiLocationOn />Criar Conta
          </IconButton>

          <IconButton
            fontFamily="Montserrat"
            fontWeight="bold"
            bg="transparent"
            variant="ghost"
            color="#fff"
            size="md"
            borderRadius="md"
            px={5}
            mr="20px"
            _hover={{ 
              bg: "white", 
              color: "#e05a6d",
              opacity: 0.9,
              transform: "scale(1.01)",
              transition: "0.3s", 
            }}
            onClick={() => router.push("/login")}
          ><CiUser />Entrar 
          </IconButton>
        </Flex>
      </Flex>

      <Flex
        w="100%"
        h={`calc(100vh - 70px)`}
        align="center"
        justify="space-between"
        px={16}
        py={8}>
        <Box display="flex">
          <Box>
            <Heading
              fontFamily="Montserrat"
              as="h1"
              fontSize="3xl"
              color="#fff"
              fontWeight="bold"
              ml={55}
              mt={-130}
            >
              A comida que você ama, na sua casa!
            </Heading>
           <Button
              fontFamily="Montserrat"
              w="180px"
              bg= "#e05a6d" 
              color= "white"
              size="lg"
              fontSize="lg"
              fontWeight="700"
              borderRadius="md"
              mt={4} 
              ml={55}
              _hover={{
                opacity: 0.9,
                transform: "scale(1.01)",
                transition: "0.3s",
              }}
              onClick={() => router.push("/login")}
            >
              Quero comer!
            </Button>  
          </Box>

        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Image
            src="/tocomfomelogo-removebg.png"
            alt="Logo grande"
            boxSize="490px"
            mr={95}
          />
        </Box>
      </Flex>

    </Box>
  );
}