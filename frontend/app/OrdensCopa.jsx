import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { meuIPv4 } from './index';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Ordens_Copa = () => {
    const navigation = useNavigation();
    const [ordens, setOrdens] = useState([]);
    const [ordensBarraDePesquisa, setOrdensBarraDePesquisa] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordensPorPagina] = useState(10);
    const [pesquisa, setPesquisa] = useState('');
    const [modalVisible, setModalVisivel] = useState(false);
    const [ordemSelecionada, setOrdemSelecionada] = useState(null);

    useEffect(() => {
        const buscarOrdens = async () => {
            try {
                const response = await axios.get(`http://${meuIPv4}:3000/ordemCopaAgrupadaPorComanda`);
                setOrdens(response.data);
                setOrdensBarraDePesquisa(response.data);
            } catch (error) {
                console.error('Erro ao buscar ordens', error);
            }
        };

        const focusListener = navigation.addListener('focus', () => {
            buscarOrdens();
            setPaginaAtual(1);
            setModalVisivel(false);
        });

        return focusListener;
    }, [navigation]);

    useEffect(() => {
        if (pesquisa === '') {
            setOrdensBarraDePesquisa(ordens);
        } else {
            const resultadoPesquisa = ordens.filter(ordem =>
                ordem.id_comanda.toString() === pesquisa
            );
            setOrdensBarraDePesquisa(resultadoPesquisa);
        }
    }, [pesquisa, ordens]);

    const ordensAgrupadasPorComanda = ordensBarraDePesquisa.reduce((acc, ordem) => {
        if (!acc[ordem.id_comanda]) {
            acc[ordem.id_comanda] = {
                id_comanda: ordem.id_comanda,
            };
        }

        return acc;
    }, {});

    console.log(ordensAgrupadasPorComanda);

    const ordensAgrupadasArray = Object.values(ordensAgrupadasPorComanda);

    const ultimaOrdem = paginaAtual * ordensPorPagina;
    const primeiraOrdem = ultimaOrdem - ordensPorPagina;
    const ordensPaginaAtual = ordensAgrupadasArray.slice(primeiraOrdem, ultimaOrdem);
    const totalPaginas = Math.ceil(ordensAgrupadasArray.length / ordensPorPagina);

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

    const abrirModal = (ordem) => {
        setOrdemSelecionada(ordem);
        setModalVisivel(true);
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
            </View>

            <FlatList
                data={ordensPaginaAtual}
                keyExtractor={(item) => item.id_comanda.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => abrirModal(item)}
                    >
                        <Text>Comanda: {item.id_comanda}</Text>
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
                        <Text>Opções para Comanda: {ordemSelecionada?.id_comanda}</Text>
                        <View style={styles.modalButtonsContainer}>
                            <Button
                                title="Ver Ordem Copa Completa"
                                onPress={() => {
                                    setModalVisivel(false);
                                    navigation.navigate('TodasOrdensComanda', {
                                        id_comanda: ordemSelecionada?.id_comanda
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
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
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

export default Ordens_Copa;
