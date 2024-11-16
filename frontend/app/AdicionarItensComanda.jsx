import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider, Heading, Input, Button, Select, CheckIcon  } from "native-base";
import styles from "./Design/Estilos";
import CurrencyInput from 'react-native-currency-input';
import axios from 'axios';
import { meuIPv4 } from "./index";
import { useNavigation } from '@react-navigation/native';

function AdicionarItensComanda() {
  const navigation = useNavigation();

  const [id_comanda, setId_comanda] = useState("");
  const [id_item, setId_item] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [precoItem, setPrecoItem] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [destino, setDestino] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id_item) {
        axios.get(`http://${meuIPv4}:3000/itemcardapio/${id_item}`)
        .then(response => {
            if (response.data && response.data.preco) {
                setPrecoItem(response.data.preco);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o preço do item', error);
        });
    }
  }, [id_item]);

  useEffect(() => {
    const totalPreco = quantidade ? precoItem * parseInt(quantidade, 10) : 0;
    setTotal(totalPreco.toFixed(2));    
  }, [quantidade, precoItem]);

  const adicionaritem = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://${meuIPv4}:3000/pedido`, {
        id_comanda: id_comanda,
        id_item: id_item,
        quantidade: quantidade,
        status: status,
        destino: destino,
      });

      alert("Item vinculado a comanda!");
      console.log(response.data);
      navigation.navigate('');
    } catch (error) {
      alert("Erro ao vincular item a comanda");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.NavigationContainer}>
      <NativeBaseProvider style={styles.base}>
        <Heading margin={10}>Adicionar itens a comanda</Heading>

        <Input
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}  
          marginBottom={5}
          placeholder="Comanda"
          value={id_comanda}
          onChangeText={(text) => {
            const apenasInteiro = text.replace(/[^0-9]/g, '');
            setId_comanda(apenasInteiro);
          }}        
          overflow='hidden'
        />

        <Input
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}  
          marginBottom={5}
          placeholder="Item"
          value={id_item}
          onChangeText={(text) => {
            const apenasInteiro = text.replace(/[^0-9]/g, '');
            setId_item(apenasInteiro);
          }}        
          overflow='hidden'
        />

        <Input
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}  
          marginBottom={5}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={(text) => {
            const apenasInteiro = text.replace(/[^0-9]/g, '');
            setQuantidade(apenasInteiro);
          }}        
          overflow='hidden'
        />

        <Input
          style={styles.inp}
          backgroundColor={'gray.200'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}
          marginBottom={5}
          placeholder="Total"
          value={`R$ ${total}`}
          isReadOnly={true}
          overflow='hidden'
        />

        <Select
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}  
          marginBottom={5} 
          placeholder="Status: Selecionar"
          selectedValue={status}
          onValueChange={setStatus}
          overflow='hidden'
          _selectedItem={{
            bg: "blue.200",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          <Select.Item label="Produzindo" value="Produzindo" />
          <Select.Item label="Entregue" value="Entregue" /> 
        </Select>

        <Select
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}  
          marginBottom={5} 
          placeholder="Status: Selecionar"
          selectedValue={destino}
          onValueChange={setDestino}
          overflow='hidden'
          _selectedItem={{
            bg: "blue.200",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          <Select.Item label="Copa" value="Copa" />
          <Select.Item label="Cozinha" value="Cozinha" /> 
        </Select>

        <Button
          style={{
            width: '50%',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
          }}
          isLoading={loading}
          onPress={adicionaritem}
        >
          Adicionar itens na comanda
        </Button>
      </NativeBaseProvider>
    </View>
  );    
}

export default AdicionarItensComanda;
