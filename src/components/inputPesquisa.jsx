import { Input, InputGroup } from "@chakra-ui/react";

export default function InputPesquisa({ value, onChange }) {
  return (
    <InputGroup mb={-2} mt={1}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Pesquisar produto..."
        bg="#181824"
        color="#fff"
        border="1px #white"
        fontFamily="Montserrat"
        fontSize="md"
        borderRadius="md"
        _focus={{ borderColor: "white", boxShadow: "0 0 0 sm white" }}
      />
    </InputGroup>
  );
}