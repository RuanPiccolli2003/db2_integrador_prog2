import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { meuIPv4 } from './index';
import axios from 'axios';
import { dominioAzure} from './index';


//Consultas está funcionando para comandas, mas os demais está com problema por conta do fuso horario

function TelaHome() {
  const navigation = useNavigation();
  const [comandasTotais, setComandasTotais] = useState({ abertas: 0, fechadas: 0 });
  const [totalPedidoVendido, setTotalPedidoVendido] = useState({ pedidosHoje: 0, vendidoHoje: 0 });
  const [comandas, setComandas] = useState([]);
  const [comandasBarraDePesquisa, setComandasBarraDePesquisa] = useState([]);
  const [pedidosAtrasados, setPedidosAtrasados] = useState([]);
  const [outrosDados, setOutrosDados] = useState({ totalVendas: 0, mesasDisponiveis: 0, clientesAtivos: 0 });

  const buscarTotalComandas = async () => {
    try {
      const response = await axios.get(`${dominioAzure}/comandaBuscarAbertaFechadaHoje`);
      const data = response.data[0];
      setComandasTotais({
        abertas: parseInt(data.comandas_abertura, 10),
        fechadas: parseInt(data.comandas_fechadas, 10),
      });
    } catch (error) {
      console.error('Erro ao buscar total de comandas:', error);
    }
  };


  const buscarPedidosAtrasados = async () => {
    try {
      const response = await axios.get(`${dominioAzure}/pedidoBuscarAtrasado`);
      const data = response.data;

      const pedidosComAtrasoFormatados = data.map(pedido => {
        const { id_pedido, nome_item, tempo_aberto_br } = pedido;
        const { days, hours, minutes } = tempo_aberto_br;  

        return {
          id_pedido,
          nome_item,
          tempo_aberto_br: `${days}d ${hours}h ${minutes}m`,  
        };
      });

      setPedidosAtrasados(pedidosComAtrasoFormatados);
    } catch (error) {
      console.error('Erro ao buscar pedidos atrasados:', error);
    }
  };

  const buscalTotalPedidoVendido = async () => {
    try {
      const response = await axios.get(`${dominioAzure}/pedidoBuscarTotalVendidoQuantidade`);
      const data = response.data[0];
      setTotalPedidoVendido({
        pedidosHoje: parseInt(data.pedidos_abertos_hoje, 10),
        vendidoHoje: parseFloat(data.total_abertos_hoje).toFixed(2),

        pedidosSeteDias: parseInt(data.pedidos_abertos_7_dias, 10),
        vendidoSeteDias: parseFloat(data.total_abertos_7_dias).toFixed(2),

        pedidosQuinzeDias: parseInt(data.pedidos_abertos_15_dias, 10),
        vendidoQuinzeDias: parseFloat(data.total_abertos_15_dias).toFixed(2),

        pedidosTrintaDias: parseInt(data.pedidos_abertos_30_dias, 10),
        vendidoTrintaDias: parseFloat(data.total_abertos_30_dias).toFixed(2),
      });
    } catch (error) {
      console.error('Erro ao buscar total de valores e quantidades por periodo:', error);
    }
  };


    //DAQUI PRA BAIXO É APENAS TESTES PARA APARECER NA PAGINA INICIAL, SÓ PARA VER COMO FICAVA KKKKKKKKKKKKKKK 


  async function buscarOutrosDados() {
    const data = {
      totalVendas: 1500.5,
      mesasDisponiveis: 4,
      clientesAtivos: 15,
    };
    setOutrosDados(data);
  }

  useFocusEffect(
    React.useCallback(() => {
    buscarTotalComandas();
    buscarPedidosAtrasados();
    buscalTotalPedidoVendido();
    const interval = setInterval(() => {
      buscarTotalComandas();
      buscarPedidosAtrasados();
      buscalTotalPedidoVendido();
    }, 30000);
    return () => clearInterval(interval);
  }, []));

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}
          onPress={() => {
            navigation.navigate('Gerenciar Comandas Abertas');
          }} >
          <Text style={styles.footerButtonText}>Comandas </Text>
          <MaterialIcons name="receipt-long" size={24} color="black" />
        </TouchableOpacity>
       
       <TouchableOpacity style={styles.footerButton} onPress={() => {
          navigation.navigate('Relatorios');
        }}>
          <Text style={styles.footerButtonText}>Relatórios { }</Text>
          <MaterialIcons name="bar-chart" size={24} color="black" />        
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => {
          navigation.navigate('Cadastrar Itens');
        }}>
          <Text style={styles.footerButtonText}>Novos Itens { }</Text>
          <MaterialIcons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <MaterialIcons name="receipt-long" size={30} color="black" />
            <Text style={styles.cardTitle}>Comandas:</Text>
            <Text style={styles.cardText}>Abertas: {comandasTotais.abertas}</Text>
            <Text style={styles.cardText}>Fechadas Hoje: {comandasTotais.fechadas}</Text>
          </View>

          <View style={styles.card}>
            <MaterialIcons name="alarm" size={30} color="black" />
            <Text style={styles.cardTitle}>Pedidos Atrasados</Text>
            {pedidosAtrasados.length > 0 ? (
              pedidosAtrasados.map((pedido) => (
                <Text key={pedido.id_pedido} style={styles.cardText}>
                  Pedido #{pedido.id_pedido} - {pedido.nome_item} - Atraso: {pedido.tempo_aberto_br}
                </Text>
              ))
            ) : (
              <Text style={styles.cardText}>Sem pedidos atrasados</Text>
            )}
          </View>

          <View style={styles.card}>
            <MaterialIcons name="attach-money" size={30} color="black" />
            <Text style={styles.cardTitle}>Total de Vendas</Text>
            <Text style={styles.cardText}>Hoje: R$ {totalPedidoVendido.vendidoHoje} - N.º de Pedidos: {totalPedidoVendido.pedidosHoje}</Text>
            <Text style={styles.cardText}>Últimos 7 dias: R$ {totalPedidoVendido.vendidoSeteDias} - N.º de Pedidos: {totalPedidoVendido.pedidosSeteDias}</Text>
            <Text style={styles.cardText}>Últimos 15 dias: R$ {totalPedidoVendido.vendidoQuinzeDias} - N.º de Pedidos: {totalPedidoVendido.pedidosQuinzeDias}</Text>
            <Text style={styles.cardText}>Últimos 30 dias: R$ {totalPedidoVendido.vendidoTrintaDias} - N.º de Pedidos: {totalPedidoVendido.pedidosTrintaDias}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}
          onPress={() => {
            navigation.navigate('Ordens Cozinha');
          }} >
          <Text style={styles.footerButtonText}>Cozinha </Text>
          <MaterialIcons name="restaurant" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => {
          navigation.navigate('Ordens Copa');
        }}>
          <Text style={styles.footerButtonText}>Copa { }</Text>
          <MaterialIcons name="local-bar" size={24} color="black" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  settingsIcon: {
    marginLeft: 10,
  },
  comandaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A8E6A3',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    elevation: 3,
  },
  body: {
    flex: 1,
    padding: 10,
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    elevation: 2,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#ddd',
  },
  footerButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default TelaHome;
