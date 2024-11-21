import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
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

    const borderAnimation = useRef(new Animated.Value(0)).current;

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

    const animarBorda = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(borderAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(borderAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                })
            ])
        ).start();
    };

    useEffect(() => {
        animarBorda();
    }, []);

    const CorBordaPiscandoVerde = borderAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['green', 'transparent'],
    });

    const CorBordaPiscandoAzul = borderAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['blue', 'transparent'],
    });

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

    useEffect(() => {
        const ordemPrioridade = {
            'Pronto': 1,
            'Rejeitado': 2,
            'Registrado': 3,
            'Produzindo': 4,
            'Entregue': 5,
            'Cancelado': 6
        };

        const pedidosOrdenados = [...pedidos].sort((a, b) => {
            return ordemPrioridade[a.status_pedido] - ordemPrioridade[b.status_pedido];
        });

        setPedidosBarraDePesquisa(pedidosOrdenados);
    }, [pedidos]);


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

    const alterarPedidoParaCancelado = async (id_pedido) => {
        if (id_pedido) {
            try {
                const response = await axios.put(`http://${meuIPv4}:3000/pedido/${id_pedido}`, {
                    status: 'Cancelado',
                    id_comanda: comandaId
                });
                if (response.status === 200) {
                    console.log('Pedido alterado para Cancelado com sucesso');
                    buscarComandasCompletas();
                    setModalVisivel(false);
                }
            } catch (error) {
                console.error('Erro ao alterar o pedido para Cancelado', error);
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
                        onPress={() => abrirModal(item)}
                        onLongPress={() => abrirModal(item)}
                    >
                        <Animated.View
                            style={[
                                styles.card,
                                item.status_pedido === 'Entregue' && { backgroundColor: '#90EE90' },
                                item.status_pedido === 'Rejeitado' && { backgroundColor: '#FFFFE0' },
                                item.status_pedido === 'Produzindo' && {
                                    backgroundColor: 'transparent',
                                    borderColor: CorBordaPiscandoAzul,
                                    borderWidth: 2,
                                },
                                item.status_pedido === 'Pronto' && {
                                    backgroundColor: 'transparent',
                                    borderColor: CorBordaPiscandoVerde,
                                    borderWidth: 4,
                                },
                                item.status_pedido === 'Cancelado' && { backgroundColor: '#FFABAB' },
                                item.status_pedido === 'Registrado' && { backgroundColor: 'white' },
                            ]}
                        >
                            <Text>Pedido: {item.id_pedido}</Text>
                            <Text>Status: {item.status_pedido}</Text>
                            <Text>Destino: {item.destino}</Text>
                            <Text>Item: {item.nome_item}</Text>
                            <Text>Quantidade: {`${item.quantidade} Unidade(s)`}</Text>
                            <Text>Total do Pedido: {`R$ ${item.somaprecototal}`}</Text>
                        </Animated.View>
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
                            <Button title="Alterar Pedido"
                                onPress={() => {
                                    setModalVisivel(false);
                                    navigation.navigate('Alterar itens da comanda', {
                                        id_pedido: pedidoSelecionado?.id_pedido,
                                    });
                                }}
                            />
                             <Button
                                title="Cancelar Pedido"
                                onPress={() => alterarPedidoParaCancelado(pedidoSelecionado?.id_pedido)}
                            />
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
        backgroundColor: 'white'
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchInput: {
        borderWidth: 1,
        padding: 10,
        width: '100%',
        marginBottom: 10,
    },
    card: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    pageIndicator: {
        fontSize: 16,
        marginHorizontal: 10,
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
        width: '80%',
        alignItems: 'center',
    },
    modalButtonsContainer: {
        marginTop: 10,
        width: '100%',
    }
});

export default VisualizarComandaCompleta;
