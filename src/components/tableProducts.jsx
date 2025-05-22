import { Table, Box } from "@chakra-ui/react";

export default function TabelaProdutos({ items }) {
  return (
    <Box
      w="100%"
      maxW="900px"
      bg="#181824"
      borderRadius="sm"
      p={6}
      mt={4}
      mx="auto"
    >
      <Table.Root size="md" variant="striped" colorScheme="pink">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader fontFamily="Montserrat" textAlign="center" fontWeight="bold" fontSize="lg" color="#e05a6d">
              Nome
            </Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="Montserrat" textAlign="center" fontWeight="bold" fontSize="lg" color="#e05a6d">
              Descrição
            </Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="Montserrat" textAlign="center" fontWeight="bold" fontSize="lg" color="#e05a6d">
              Preço
            </Table.ColumnHeader>
            <Table.ColumnHeader fontFamily="Montserrat" textAlign="center" fontWeight="bold" fontSize="lg" color="#e05a6d">
              Imagem
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id} _hover={{ bg: "#2d2d44"}}>
              <Table.Cell fontFamily="Montserrat" textAlign="center" fontSize="md" color="#fff">
                {item.name}
              </Table.Cell>
              <Table.Cell fontFamily="Montserrat" textAlign="center" fontSize="md" color="#fff">
                {item.description}
              </Table.Cell>
              <Table.Cell textAlign="center" fontFamily="Montserrat" fontSize="md" color="#fff">
                R$ {Number(item.price).toFixed(2)}
              </Table.Cell>
              <Table.Cell display="flex" justifyContent="center">
                {item.image && (
                  <img src={item.image} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }} />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}