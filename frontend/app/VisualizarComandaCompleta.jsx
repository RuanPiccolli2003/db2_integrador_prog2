import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TouchableOpacity, } from 'react-native';
import axios from 'axios';
import { meuIPv4 } from './index';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const VisualizarComandaCompleta = () => {
    const [id_comanda, setId_comanda] = useState('');
    const [loading, setLoading] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [pedidosBarraDePesquisa, setPedidosBarraDePesquisa] = useState([]);
    const [pedidosPorPagina] = useState(10);
    const [pesquisa, setPesquisa] = useState('');
    const [modalVisible, setModalVisivel] = useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const navigation = useNavigation();
    const route = useRoute();
    const { id_comanda: comandaId } = route.params || {};



    const buscarComandasCompletas = async () => {
        if (comandaId) {
            try {
                const response = await axios.get(`http://${meuIPv4}:3000/comandadetalhes/${comandaId}`);
                setPedidos(response.data);
            } catch (error) {
                console.error('Erro ao buscar comandas', error);
            }
        }
    };

    useEffect(() => {
        if (comandaId) {
            setId_comanda(comandaId);
            buscarComandasCompletas();
        }
    }, [comandaId]);


    useFocusEffect(
        React.useCallback(() => {
            buscarComandasCompletas();
            setPaginaAtual(1);
            setModalVisivel(false);

            return () => {
                setPedidos([]);
                setPedidosBarraDePesquisa([]);
                setId_comanda('');
            };
        }, [comandaId])
    );

    useEffect(() => {
        if (pesquisa === '') {
            setPedidosBarraDePesquisa(pedidos);
        } else {
            const resultadoPesquisa = pedidos.filter(pedido =>
                pedido.id_pedido.toString() === pesquisa
            );
            setPedidosBarraDePesquisa(resultadoPesquisa);
        }
    }, [pesquisa, pedidos]);

    const alterarPedidoParaEntregue = async (id_pedido) => {
        if (id_pedido) {
            try {
                const response = await axios.put(`http://${meuIPv4}:3000/pedido/${id_pedido}`, {
                    status: 'Entregue',
                    id_comanda: comandaId
                });
                if (response.status === 200) {
                    console.log('Pedido alterado para Entregue com sucesso');
                    buscarComandasCompletas();
                    setModalVisivel(false);
                }
            } catch (error) {
                console.error('Erro ao alterar o pedido para Entregue', error);
            }
        }
    };

    const ultimoPedido = paginaAtual * pedidosPorPagina;
    const primeiroPedido = ultimoPedido - pedidosPorPagina;
    const pedidosPaginaAtual = pedidosBarraDePesquisa.slice(primeiroPedido, ultimoPedido);

    const totalPaginas = Math.ceil(pedidosBarraDePesquisa.length / pedidosPorPagina);

    const irProximaPagina = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const irPaginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const abrirModal = (pedido) => {
        setPedidoSelecionado(pedido);
        setModalVisivel(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por ID do Pedido"
                    value={pesquisa}
                    onChangeText={setPesquisa}
                    keyboardType="numeric"
                />
            </View>

            <FlatList
                data={pedidosPaginaAtual}
                keyExtractor={(item) => item.id_comanda.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            item.status_pedido === 'Entregue' && { backgroundColor: '#d4edda' },
                            item.status_pedido === 'Produzindo' && { backgroundColor: '#fff3cd' }
                        ]}
                        onPress={() => abrirModal(item)}
                        onLongPress={() => abrirModal(item)}
                    >
                        <Text>Pedido: {item.id_pedido}</Text>
                        <Text>Status: {item.status_pedido}</Text>
                        <Text>Destino: {item.destino}</Text>
                        <Text>Item: {item.nome_item}</Text>
                        <Text>Quantidade: {`${item.quantidade} Unidade(s)`}</Text>
                        <Text>Total do Pedido: {`R$ ${item.somaprecototal}`}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.paginationContainer}>
                <Button title="Anterior" onPress={irPaginaAnterior} />
                <Text style={styles.pageIndicator}>Página {paginaAtual} de {totalPaginas}</Text>
                <Button title="Próximo" onPress={irProximaPagina} disabled={paginaAtual >= totalPaginas} />
            </View>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text>Opções para o Pedido: {pedidoSelecionado?.id_pedido}</Text>
                        <View style={styles.modalButtonsContainer}>
                            <Button
                                title="Finalizar Pedido"
                                onPress={() => alterarPedidoParaEntregue(pedidoSelecionado?.id_pedido)}
                            />
                            <Button title="Alterar Comanda" onPress={''} />
                            <Button title="Voltar" onPress={() => setModalVisivel(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        width: '100%',
    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 5,
        borderRadius: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    pageIndicator: {
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalButtonsContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        marginTop: 10,
    },
});

export default VisualizarComandaCompleta;
