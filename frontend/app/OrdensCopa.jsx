import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TouchableOpacity, Animated} from 'react-native';
import axios from 'axios';
import { meuIPv4 } from './index';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const Ordens_Copa = () => {
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
    const [id_comanda, setId_comanda] = useState();

    const borderAnimation = useRef(new Animated.Value(0)).current;


    const buscarComandasCompletas = async () => {
            try {
                const response = await axios.get(`http://${meuIPv4}:3000/pedidoOrdenCopa`);
                id_comanda
                setPedidos(response.data);
            } catch (error) {
                console.error('Erro ao buscar comandas', error);
            }
    };

    useEffect(() => {
        buscarComandasCompletas();
    }, [])

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

    const CorBordaPiscandoAmarelo = borderAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['yellow', 'transparent'],
    });

    const CorBordaPiscandoAzul = borderAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['blue', 'transparent'],
    });


    useFocusEffect(
        React.useCallback(() => {
            buscarComandasCompletas();
            setPaginaAtual(1);
            setModalVisivel(false);

            return () => {
                setPedidos([]);
                setPedidosBarraDePesquisa([]);
            };
        }, [])
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
            'Registrado': 1,
            'Produzindo': 2,
            'Pronto': 3
        };

        const pedidosOrdenados = [...pedidos].sort((a, b) => {
            return ordemPrioridade[a.status] - ordemPrioridade[b.status];
        });

        setPedidosBarraDePesquisa(pedidosOrdenados);
    }, [pedidos]);

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
        setId_comanda(pedido.id_comanda);
        setModalVisivel(true);
    };

    const formatarDataHora = (data) => {
        const dataObj = new Date(data);
        const dataBrasileira = new Date(dataObj.getTime() - (21 * 60 * 60 * 1000));

        const dataFormatada = dataBrasileira.toLocaleDateString('pt-BR');
        const horaFormatada = dataBrasileira.toLocaleTimeString('pt-BR', { hour12: false });

        return `${dataFormatada} ${horaFormatada}`;
    };

    const alterarPedidoParaProduzindo = async (id_pedido) => {
        if (id_pedido) {
            try {
                const response = await axios.put(`http://${meuIPv4}:3000/pedido/${id_pedido}`, {
                    status: 'Produzindo',
                    id_comanda: id_comanda
                });
                if (response.status === 200) {
                    console.log('Pedido alterado para Produzindo com sucesso');
                    buscarComandasCompletas();
                    setModalVisivel(false);
                }
            } catch (error) {
                console.error('Erro ao alterar o pedido para Produzindo', error);
            }
        }
    };

    const alterarPedidoParaPronto = async (id_pedido) => {
        if (id_pedido) {
            try {
                const response = await axios.put(`http://${meuIPv4}:3000/pedido/${id_pedido}`, {
                    status: 'Pronto',
                    id_comanda: id_comanda
                });
                if (response.status === 200) {
                    console.log('Pedido alterado para Pronto com sucesso');
                    buscarComandasCompletas();
                    setModalVisivel(false);
                }
            } catch (error) {
                console.error('Erro ao alterar o pedido para Pronto', error);
            }
        }
    };

    const alterarPedidoParaRejeitado = async (id_pedido) => {
        if (id_pedido) {
            try {
                const response = await axios.put(`http://${meuIPv4}:3000/pedido/${id_pedido}`, {
                    status: 'Rejeitado',
                    id_comanda: id_comanda
                });
                if (response.status === 200) {
                    console.log('Pedido alterado para Rejeitado com sucesso');
                    buscarComandasCompletas();
                    setModalVisivel(false);
                }
            } catch (error) {
                console.error('Erro ao alterar o pedido para Rejeitado', error);
            }
        }
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
                            item.status === 'Registrado' && {
                                backgroundColor: 'transparent',
                                borderColor: CorBordaPiscandoAmarelo,
                                borderWidth: 2,
                            },,
                            item.status === 'Pronto' && { backgroundColor: '#C8E6C9' },
                            item.status === 'Produzindo' && {
                                backgroundColor: 'transparent',
                                borderColor: CorBordaPiscandoAzul,
                                borderWidth: 2,
                            },
                        ]}
                        >
                        
                        <Text>Pedido: {item.id_pedido}</Text>
                        <Text>Status: {item.status}</Text>
                        <Text>Destino: {item.destino}</Text>
                        <Text>Item: {item.nome_item}</Text>
                        <Text>Quantidade: {`${item.quantidade} Unidade(s)`}</Text>
                        <Text>Total do Pedido: {`R$ ${item.somaprecototal}`}</Text>
                        <Text>Data Abertura: {formatarDataHora(item.data_abertura_pedido)}</Text>
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
                        <Text>Status para o Pedido: {pedidoSelecionado?.id_pedido}</Text>
                        <View style={styles.modalButtonsContainer}>
                            <Button
                                title="Produzindo"
                                onPress={() => alterarPedidoParaProduzindo(pedidoSelecionado?.id_pedido)}
                                />
                            <Button 
                                title="Pronto"
                                onPress={() => alterarPedidoParaPronto(pedidoSelecionado?.id_pedido)}
                            />
                            <Button 
                                title="Rejeitado"
                                onPress={() => alterarPedidoParaRejeitado(pedidoSelecionado?.id_pedido)}
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
    titleVisualizacao: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Ordens_Copa;
