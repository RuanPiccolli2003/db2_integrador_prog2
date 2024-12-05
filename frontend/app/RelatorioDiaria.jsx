import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { dominioAzure } from './index';
import { Calendar } from 'react-native-calendars';
import { ptBR } from 'react-native-calendars';

function Relatorio_Diaria() {
    const [totalPedidoVendido, setTotalPedidoVendido] = useState([]);
    const [totalPedidoVendidoDiario, setTotalPedidoVendidoDiario] = useState([]);
    const [modalMaisVendidosAberto, setModalMaisVendidosAberto] = useState(false);
    const [modalMaisVendidosDiarioAberto, setModalMaisVendidosDiarioAberto] = useState(false);
    const [modalMaisVendidosIntervalo, setModalMaisVendidosIntervalo] = useState(false);
    const [modalBuscarMaisVendidosIntervalo, setModalBuscarMaisVendidosIntervalo] = useState(false);

    const [totalPedidoVendidoPorIntervalo, setTotalPedidoVendidoPorIntervalo] = useState([]);

    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const buscalTotalPedidoVendido = async () => {
        try {
            const response = await axios.get(`${dominioAzure}/itemcardapioItensMaisVendido`);
            setTotalPedidoVendido(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens mais vendidos:', error);
        }
    };

    const buscalTotalPedidoVendidoDiario = async () => {
        try {
            const response = await axios.get(`${dominioAzure}/itemcardapioItensMaisVendidosDiario`);
            setTotalPedidoVendidoDiario(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens mais vendidos:', error);
        }
    };

    const buscarRelatorioPorIntervalo = async () => {
        if (!dataInicio || !dataFim) {
            alert("Por favor, selecione ambas as datas.");
            return;
        }
        try {
            const response = await axios.get(`${dominioAzure}/itemcardapioItensMaisVendidosPorIntervalo`, {
                params: { dataInicio, dataFim }
            });
            setTotalPedidoVendidoPorIntervalo(response.data);
            setModalBuscarMaisVendidosIntervalo(true);
        } catch (error) {
            console.error('Erro ao buscar relatório:', error);
        }
    };

    const CalendarioBrasileiro = ({ tipo }) => {
        const [selectedDate, setSelectedDate] = useState(tipo === 'inicio' ? dataInicio : dataFim);

        const onDayPress = (day) => {
            setSelectedDate(day.dateString);
            if (tipo === 'inicio') {
                setDataInicio(day.dateString);
            } else {
                setDataFim(day.dateString);
            }
        };

        return (
            <Calendar
                current={selectedDate || new Date().toISOString().split('T')[0]}
                onDayPress={onDayPress}
                monthFormat={'MM yyyy'}
                markingType={'simple'}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        selectedColor: 'blue',
                        selectedTextColor: 'white',
                    },
                }}
                theme={{
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    arrowColor: 'orange',
                }}
                locale="pt-br"
                maxDate={new Date().toISOString().split('T')[0]}
            />
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            buscalTotalPedidoVendido();
            buscalTotalPedidoVendidoDiario();
            const interval = setInterval(() => {
                buscalTotalPedidoVendido();
                buscalTotalPedidoVendidoDiario();
            }, 30000);
            return () => clearInterval(interval);
        }, [])
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.cardsContainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => setModalMaisVendidosDiarioAberto(true)}
                    >
                        <MaterialIcons name="attach-money" size={30} color="black" />
                        <Text style={styles.cardTitle}>Itens mais vendidos Diário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => setModalMaisVendidosAberto(true)}
                    >
                        <MaterialIcons name="attach-money" size={30} color="black" />
                        <Text style={styles.cardTitle}>Itens mais vendidos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => setModalMaisVendidosIntervalo(true)}
                    >
                        <MaterialIcons name="calendar-today" size={30} color="black" />
                        <Text style={styles.cardTitle}>Itens mais vendido por Intervalo</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMaisVendidosAberto}
                onRequestClose={() => setModalMaisVendidosAberto(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Itens Mais Vendidos</Text>
                        <ScrollView>
                            {totalPedidoVendido.map((item, index) => (
                                <View key={index} style={styles.itemContainer}>
                                    <Text style={styles.itemText}>Nome: {item.nome_do_item}</Text>
                                    <Text style={styles.itemText}>Tipo: {item.tipo_do_item}</Text>
                                    <Text style={styles.itemText}>Total Vendido: {item.total_vendido}</Text>
                                    <Text style={styles.itemText}>Valor Total: {item.valor_total_vendido}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalMaisVendidosAberto(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMaisVendidosDiarioAberto}
                onRequestClose={() => setModalMaisVendidosDiarioAberto(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Itens Mais Vendidos Diário</Text>
                        <ScrollView>
                            {totalPedidoVendidoDiario.map((item, index) => (
                                <View key={index} style={styles.itemContainer}>
                                    <Text style={styles.itemText}>Nome: {item.nome_do_item}</Text>
                                    <Text style={styles.itemText}>Tipo: {item.tipo_do_item}</Text>
                                    <Text style={styles.itemText}>Total Vendido: {item.total_vendido}</Text>
                                    <Text style={styles.itemText}>Valor Total: {item.valor_total_vendido}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalMaisVendidosDiarioAberto(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMaisVendidosIntervalo}
                onRequestClose={() => setModalMaisVendidosIntervalo(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecionar Intervalo de Datas</Text>

                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.itemText}>Data Início</Text>
                            <CalendarioBrasileiro tipo="inicio" />
                            <Text style={styles.selectedDate}>Data Selecionada: {dataInicio || 'Não Selecionada'}</Text>

                            <Text style={styles.itemText}>Data Fim</Text>
                            <CalendarioBrasileiro tipo="fim" />
                            <Text style={styles.selectedDate}>Data Selecionada: {dataFim || 'Não Selecionada'}</Text>
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={buscarRelatorioPorIntervalo}
                        >
                            <Text style={styles.closeButtonText}>Buscar Relatório</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalMaisVendidosIntervalo(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>

                        {/* Modal interno */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalBuscarMaisVendidosIntervalo}
                            onRequestClose={() => setModalBuscarMaisVendidosIntervalo(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Relatório do Intervalo</Text>
                                    <ScrollView>
                                        {totalPedidoVendidoPorIntervalo.map((item, index) => (
                                            <View key={index} style={styles.itemContainer}>
                                                <Text style={styles.itemText}>Nome: {item.nome_do_item}</Text>
                                                <Text style={styles.itemText}>Tipo: {item.tipo_do_item}</Text>
                                                <Text style={styles.itemText}>Total Vendido: {item.total_vendido}</Text>
                                                <Text style={styles.itemText}>Valor Total: {item.valor_total_vendido}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setModalBuscarMaisVendidosIntervalo(false)}
                                    >
                                        <Text style={styles.closeButtonText}>Fechar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    cardsContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.9,
        maxHeight: height * 0.8,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    itemContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollView: {
        maxHeight: height * 0.6,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 10,
    },
    selectedDate: {
        fontSize: 16,
        marginBottom: 20,
        color: 'gray',
    },
    closeButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Relatorio_Diaria;
