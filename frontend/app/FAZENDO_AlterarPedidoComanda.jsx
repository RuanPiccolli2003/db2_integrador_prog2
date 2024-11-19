import React, { useEffect, useState } from "react";
import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import { NativeBaseProvider, Heading, Input, Button, Select, CheckIcon } from "native-base";
import styles from "./Design/Estilos";
import axios from 'axios';
import { meuIPv4 } from "./index";
import { useNavigation, useRoute } from '@react-navigation/native';

function AlterarItensComanda() {
    const navigation = useNavigation();
    const [id_pedido, setId_pedido] = useState("");
    const [id_comanda, setId_comanda] = useState("");
    const [id_item, setId_item] = useState("");
    const [itemNome, setItemNome] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [precoItem, setPrecoItem] = useState(0);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState('');
    const [destino, setDestino] = useState('');
    const [loading, setLoading] = useState(false);
    const [comandaStatus, setComandaStatus] = useState('');
    const [itens, setItens] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const route = useRoute();
    const { id_pedido: pedidoId } = route.params || {};

    useEffect(() => {
        if (pedidoId) {
            setId_pedido(pedidoId);
        }
    }, [pedidoId]);

}

useEffect(() => {
    if (id_item) {
        axios.get(`http://${meuIPv4}:3000/itemcardapio/${id_item}`)
            .then(response => {
                if (response.data && response.data.preco) {
                    setPrecoItem(response.data.preco);
                    setItemNome(response.data.nome);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o preço do item', error);
            });
    }
}, [id_item]);


useEffect(() => {
    if (id_comanda) {
        axios.get(`http://${meuIPv4}:3000/comanda/${id_comanda}`)
            .then(response => {
                if (response.data && response.data.status) {
                    setComandaStatus(response.data.status);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar status da comanda', error);
            });
    }
}, [id_comanda]);

useEffect(() => {
    const totalPreco = quantidade ? precoItem * parseInt(quantidade, 10) : 0;
    setTotal(totalPreco.toFixed(2));
}, [quantidade, precoItem]);

useEffect(() => {
    const limparCampos = navigation.addListener('blur', () => {
        setId_pedido(id_pedido);
        setId_comanda(id_comanda);
        setItemNome("");
        setQuantidade(1);
        setPrecoItem(0);
        setStatus("");
    });

    return limparCampos;
}, [navigation]);


const buscarItens = async () => {
    try {
        const response = await axios.get(`http://${meuIPv4}:3000/itemcardapio`);
        setItens(response.data);
        setMostrarModal(true);
    } catch (error) {
        console.error('Erro ao buscar itens', error);
    }
};

const adicionaritem = async () => {
    if (comandaStatus === 'Fechada') {
        alert("Não é possível adicionar itens a uma comanda fechada");
        return;
    }

    if (!id_comanda) {
        alert("Deve informar o Id da comanda.");
        return;
    }

    setLoading(true);
    try {
        const response = await axios.put(`http://${meuIPv4}:3000/pedido/${pedidoId}`, {
            id_comanda,
            id_item,
            quantidade,
            status,
            destino,
        });

        alert("Item Alterado a comanda!");
        console.log(response.data);
        setId_comanda(id_comanda);
        setId_item("");
        setItemNome("");
        setQuantidade(1);
        setPrecoItem(0);
        setTotal(0);
        setStatus('');
        setDestino('');
        setMostrarModal(false);
        navigation.navigate('Alterar itens da comanda');
    } catch (error) {
        alert("Erro ao vincular item a comanda");
        console.error(error);
    } finally {
        setLoading(false);
    }
};

return ();

export default AlterarItensComanda;