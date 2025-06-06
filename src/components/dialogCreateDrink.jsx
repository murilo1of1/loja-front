import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Box,
  VStack,
  Input,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/form-control";
import { Toaster, toaster } from "@/components/ui/toaster"
import { FileUpload } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import api from "@/utils/axios";
import { useState, useEffect } from "react";

export default function DialogCreateProduct({ isOpen, onClose, onCreated, editingProduct }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    if (isOpen && editingProduct) {
      setNome(editingProduct.name || '');
      setPreco(editingProduct.price || '');
      setImagem(editingProduct.image || '');
    } else if (isOpen && !editingProduct) {
      setNome('');
      setPreco('');
      setImagem('');
    }
    setIsLoading(false);
  }, [isOpen, editingProduct]);

  const handleFileChange = (event) => {
  console.log("Files recebidos:", event);
  const files = event.target?.files || event.dataTransfer?.files;
  if (files && files.length > 0) {
    setImagem(files[0]);
    console.log("Imagem setada:", files[0]);
  }
};

  const handleCreateOrEdit = async () => {
  setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append("name", nome);
    formData.append("price", preco);
    if (imagem instanceof File) {
      formData.append("image", imagem);
    }

    let response;
    if (editingProduct) {
      response = await api.patch(`/drink/${editingProduct.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } else {
      response = await api.post('/drink', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }

    if (response.status === 200 || response.status === 201) {
      toaster.create({
        title: editingProduct ? "Bebida atualizada com sucesso!" : "Bebida criada com sucesso!",
        type: "success",
      });
      if (onCreated) onCreated();
      onClose();
    } else {
      toaster.create({
        title: editingProduct ? "Erro ao atualizar bebida." : "Erro ao criar bebida.",
        type: "error",
      });
     } 
   } catch (error) {
    toaster.create({
      title: editingProduct ? "Erro ao atualizar produto." : "Erro ao criar produto.",
      status: "error",
     });
   } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      motionPreset="slide-in-bottom"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop/>
        <Dialog.Positioner>
          <Dialog.Content bg="#181824" color="#fff" borderRadius="lg">
            <Dialog.Header>
              <Dialog.Title fontFamily="Montserrat" color="#e05a6d">
                {editingProduct ? "Editar Bebida" : "Criar Bebida"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box>
                <VStack spacing={4} align="stretch">
                  <FormLabel fontFamily="Montserrat" color="#e05a6d">Nome</FormLabel>
                  <Input
                    fontFamily="Montserrat"
                    placeholder="Nome do produto"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                  />
                  <FormLabel fontFamily="Montserrat" color="#e05a6d">Preço</FormLabel>
                  <InputGroup startElement= "$">
                    <Input  
                      fontFamily="Montserrat"
                      placeholder="0.0"
                      value={preco}
                      onChange={e => setPreco(e.target.value)}
                    ></Input> 
                  </InputGroup>
                  <FormLabel fontFamily="Montserrat" color="#e05a6d">Imagem (endereço ou arraste)</FormLabel>
                  <FileUpload.Root
                    maxW="xl"
                    alignItems="stretch"
                    maxFiles={1}
                    onChange={handleFileChange}
                  >
                    <FileUpload.HiddenInput />
                    <FileUpload.Dropzone bg="#181824">
                      <Icon as={LuUpload} boxSize={6} color="#e05a6d" mb={2} />
                      <FileUpload.DropzoneContent>
                        <Box color="#fff" fontFamily="Montserrat">
                          Arraste e solte a imagem aqui
                        </Box>
                        <Box color="#fff" fontFamily="Montserrat" fontSize="sm">
                          .png, .jpg até 5MB
                        </Box>
                        {imagem && (
                          <Box mt={2} color="#e05a6d" fontFamily="Montserrat">
                            <Box as="img" src={imagem instanceof File ? URL.createObjectURL(imagem) : imagem} alt="Preview" maxH="120px" borderRadius="md" mb={2} />
                            <Box wordBreak="break-all">{imagem.name || imagem}</Box>
                          </Box>
                        )}
                      </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>
                    <FileUpload.List />
                  </FileUpload.Root>
                  <Button
                    mt={4}
                    bg="#e05a6d"
                    color="#fff"
                    fontFamily="Montserrat"
                    fontWeight="bold"
                    borderRadius="md"
                    isLoading={isLoading}
                    onClick={handleCreateOrEdit}
                    _hover={{
                      opacity: 0.9,
                      transform: "scale(1.01)",
                      transition: "0.3s",
                      bg: "#db5c6e"
                    }}
                  >
                    {editingProduct ? "Salvar alterações" : "Criar bebida"}
                  </Button>
                </VStack>
              </Box>
            </Dialog.Body>
            <Dialog.Footer />
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}