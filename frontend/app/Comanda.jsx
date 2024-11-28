import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { meuIPv4 } from './index';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AbrirComanda from './AbrirComanda';
import Drawer from './Export/drawer';
import { dominioAzure} from './index';




const ComandaPrincipal = () => {
    const navigation = useNavigation();
    const [comandas, setComandas] = useState([]);
    const [comandasBarraDePesquisa, setComandasBarraDePesquisa] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [comandasPorPagina] = useState(10);
    const [pesquisa, setPesquisa] = useState('');
    const [modalVisible, setModalVisivel] = useState(false);
    const [comandaSelecionada, setComandaSelecionada] = useState(null);

    useEffect(() => {
        const buscarComandas = async () => {
            try {
                const response = await axios.get(`${dominioAzure}/comanda?status=Aberta`);
                setComandas(response.data);
                setComandasBarraDePesquisa(response.data);
            } catch (error) {
                console.error('Erro ao buscar comandas:', error);
            }
        };

        const focusListener = navigation.addListener('focus', () => {
            buscarComandas();
            setPaginaAtual(1);
            setModalVisivel(false);
        });

        return () => focusListener();
    }, [navigation]); //Tem que escrever código até para o programa lembrar que tem que usar os botao pqp



    useEffect(() => {
        if (pesquisa === '') {
            setComandasBarraDePesquisa(comandas);
        } else {
            const resultadoPesquisa = comandas.filter(comanda =>
                comanda.id_comanda.toString() === pesquisa
            );
            setComandasBarraDePesquisa(resultadoPesquisa);
        }
    }, [pesquisa, comandas]);

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            setModalVisivel(false);
        });

        return focusListener;
    }, [navigation]); // Para quando clicar e sair da pagina ele funcione novamente os botoes e não fique travado o modal no expo, porco dio nene que tem que ajustar até o reset dos botao



    const ultimaComanda = paginaAtual * comandasPorPagina;
    const primeiraComanda = ultimaComanda - comandasPorPagina;
    const comandasPaginaAtual = comandasBarraDePesquisa.slice(primeiraComanda, ultimaComanda);

    const totalPaginas = Math.ceil(comandasBarraDePesquisa.length / comandasPorPagina);

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

    const formatarDataHora = (data) => {
        const dataObj = new Date(data);
        const dataBrasileira = new Date(dataObj.getTime() - (21 * 60 * 60 * 1000));

        const dataFormatada = dataBrasileira.toLocaleDateString('pt-BR');
        const horaFormatada = dataBrasileira.toLocaleTimeString('pt-BR', { hour12: false });

        return `${dataFormatada} ${horaFormatada}`;
    };

    const abrirModal = (comanda) => {
        setComandaSelecionada(comanda);
        setModalVisivel(true);
    };

    const fecharComanda = () => {
        console.log('Fechar comanda', comandaSelecionada);
        setModalVisivel(false);
        navigation.navigate('Fechar comandas', { id_comanda: comandaSelecionada.id_comanda });
    };

    const adicionarItens = () => {
        console.log('Adicionar itens à comanda', comandaSelecionada);
        setModalVisivel(false);
    };

    const alterarComanda = () => {
        console.log('Alterar comanda', comandaSelecionada);
        setModalVisivel(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por ID da Comanda"
                    value={pesquisa}
                    onChangeText={setPesquisa}
                    keyboardType="numeric"
                />
                <Button title="Abrir Comanda" onPress={() => {
                    navigation.navigate('Abrir comandas');
                }} />
            </View>

            <FlatList
                data={comandasPaginaAtual}
                keyExtractor={(item) => item.id_comanda.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => abrirModal(item)}
                        onLongPress={() => abrirModal(item)}
                    >
                        <Text>Comanda: {item.id_comanda}</Text>
                        <Text>Status: {item.status}</Text>
                        <Text>Data de Abertura: {formatarDataHora(item.data_abertura)}</Text>
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
                        <Text>Opções para Comanda: {comandaSelecionada?.id_comanda}</Text>
                        <View style={styles.modalButtonsContainer}>
                            <Button
                                title="Visualizar Comanda"
                                onPress={() => {
                                    setModalVisivel(false);
                                    navigation.navigate('Visualizar Comanda Completa', {
                                        id_comanda: comandaSelecionada?.id_comanda
                                    });
                                }}
                            />
                            <Button
                                title="Fechar Comanda"
                                onPress={() => {
                                    setModalVisivel(false);
                                    navigation.navigate('Fechar comandas', {
                                        id_comanda: comandaSelecionada?.id_comanda
                                    });
                                }}
                            />
                            <Button
                                title="Adicionar na Itens Comanda"
                                onPress={() => {
                                    setModalVisivel(false);
                                    navigation.navigate('Adicionar itens em comandas', {
                                        id_comanda: comandaSelecionada?.id_comanda
                                    });
                                }}
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
        width: '67%',
    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#f3f3f3' 
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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
});


export default ComandaPrincipal;
