'use client'
import { Box, Flex, Text, Button, VStack, IconButton, Image, Table } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { FaReceipt, FaTicketAlt } from "react-icons/fa";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import TabelaProdutos from "@/components/tableProducts";
import InputPesquisa from "@/components/inputPesquisa";

export default function Admin() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/product");
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minH="100vh" bgImage="url(/teladeinicio.png)" bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
      <Flex
        as="header"
        justify="space-between"
        w="100%"
        h="90px"
        bg="#181824"
        color="#fff"
        align="center"
        px={8}
        position="fixed"
        top={0}
        left={0}
        zIndex={100}
      >
        <Flex>
          <Image 
            mr="15px"
            ml="25px" 
            src="/tocomfomenome.png" 
            alt="logo"  
            boxSize="90px"
            objectFit="contain"></Image>
        </Flex>
        <Flex>
          <Text
            fontFamily="Montserrat"
            color="#f6f6f6"
            ml={-590}
          >
            Painel administrativo
          </Text>
        </Flex>

        <Flex justifyContent="flex-end" align="center" gap={2}>
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
          ><CiLogout />Logout 
          </IconButton>
        </Flex>  
      </Flex>

      <Flex pt="70px" h="100vh">
        
        <Box
          as="nav"
          w={["70px", "220px"]}
          bg="#181824"
          color="#fff"
          py={8}
          px={4}
          minH="calc(100vh - 70px)"
          position="fixed"
          top="70px"
          left={0}
          zIndex={90}
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <VStack align="stretch" spacing={4}>
            <Button
              leftIcon={<FaReceipt />}
              variant="ghost"
              color="#fff"
              fontFamily="Montserrat"
              justifyContent="flex-start"
              _hover={{ bg: "#23233a", color: "#e05a6d" }}
            >
              Pedidos
            </Button>
            <Button
              leftIcon={<FaTicketAlt />}
              variant="ghost"
              color="#fff"
              fontFamily="Montserrat"
              justifyContent="flex-start"
              _hover={{ bg: "#23233a", color: "#e05a6d" }}
            >
              Cupons
            </Button>
          </VStack>
        </Box>

        <Box
          flex="1"
          ml={["70px", "200px"]}
          p={10}
          display="flex"
          flexDirection="column"
          w="100%"
        >
           <Box w="100%" maxW="900px" mx="auto" mb={1}>
            <InputPesquisa
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <TabelaProdutos items={filteredProducts} />
        </Box>
      </Flex>
    </Box>
  );
}