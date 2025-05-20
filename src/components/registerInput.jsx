'use client'
import { Input, Stack, IconButton, Portal, Select, createListCollection } from "@chakra-ui/react";
import {
  PasswordInput,
} from "@/components/ui/password-input"
import { InputGroup } from "@/components/ui/input-group"
import React from 'react';
import { useState, useEffect } from "react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { useRouter } from 'next/navigation'
import { withMask } from "use-mask-input"

export default function RegisterInput({ mandarDadosdofilho }) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name , setName] = useState('');
  const [Phone , setPhone] = useState('');   
  const [Username , setUsername] = useState('');
  const [CPF, setCPF] = useState('');
  const [Role, setRole] = useState('');

  const rolesCollection = createListCollection({
    items: [
      { label: "Administrador", value: "admin" },
      { label: "Entregador", value: "delivery" },
      { label: "Usuário", value: "user" }
    ],
  })
  
  const content = { email: Email, password: Password, name: Name, phone: Phone, username: Username, cpf: CPF, role: Role };
  const router = useRouter();
  
  
  const mandarDados = async () => {
    if (!Password || !Email || !Name || !Phone || !Username || !CPF || !Role) {
      toaster.create({
        title: "Preencha todos os valores!",
        type: "error"
      })
      return;
    }
    mandarDadosdofilho(content);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        mandarDados();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mandarDados]);


  return (
      <Stack>
        <Input 
          mt="4%"
          variant="outline"
          placeholder="Digite seu nome completo"
          onChange={(e) => setName(e.target.value)}
        />
        <Input 
          mt="1%"
          variant="outline"
          placeholder="Digite seu username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input 
          mt="1%"
          variant="outline" ref={withMask('(99) 99999-9999')}
          placeholder="Digite seu telefone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          mt="1%"
          placeholder="Digite seu CPF" ref={withMask('999.999.999-99')}
          onChange={(e) => setCPF(e.target.value)}
        />

        <Select.Root
            mt="%1"
            collection={rolesCollection}
            width="320px"
            onValueChange={(value) => setRole(value.value[0])}
            >
            <Select.HiddenSelect />
            <Select.Control>
            <Select.Trigger>
                <Select.ValueText placeholder="Selecione seu cargo" />
            </Select.Trigger>
            <Select.IndicatorGroup>
                <Select.Indicator />
            </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
            <Select.Positioner>
                <Select.Content>
                {rolesCollection.items.map((role) => (
                    <Select.Item item={role} key={role.value}>
                    {role.label}
                    <Select.ItemIndicator />
                    </Select.Item>
                ))}
                </Select.Content>
            </Select.Positioner>
            </Portal>
      </Select.Root>

        <Input 
          mt="1%"
          variant="outline"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />

      <InputGroup mt="1%" w="100%" >
        <PasswordInput
          variant="outline"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <IconButton
        background="#207830"
        variant="subtle"
        onClick={mandarDados}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                mandarDados();
            }
        }}
        mt="1%"
        borderRadius={5}
        _hover={{
            opacity: 0.9,
            transform: "scale(1.01)",
            transition: "0.3s",
          }}
        tabIndex={0}
      >Confirmar
      </IconButton>
      <Toaster />
    </Stack>
    );
} 