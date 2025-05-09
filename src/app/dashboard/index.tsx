import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { styles } from './styles';
import {
  getTotalItemsByUser,
  getTotalNegotiationsByUser,
  getItemsCountByStatus,
  getItemsCountByNegotiationType,
} from '../../config/metrics';
import { colors } from '../../styles/colors';

export default function Dashboard() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width - 40;

  // Estados das métricas específicas do usuário logado
  const [totalItems, setTotalItems] = useState(0);
  const [totalNegotiations, setTotalNegotiations] = useState(0);
  const [statusData, setStatusData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });
  const [negotiationData, setNegotiationData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    (async () => {
      // Total de itens cadastrados pelo usuário
      setTotalItems(await getTotalItemsByUser());
      // Total de negociações feitas pelo usuário
      setTotalNegotiations(await getTotalNegotiationsByUser());

      // Quantidade de itens por status (aberto vs negociado)
      const { open, negotiated } = await getItemsCountByStatus();
      setStatusData({
        labels: ['Aberto', 'Negociado'],
        data: [open, negotiated],
      });

      // Quantidade de itens por tipo de negociação
      const typeCounts = await getItemsCountByNegotiationType();
      setNegotiationData({
        labels: Object.keys(typeCounts),
        data: Object.values(typeCounts),
      });
    })();
  }, []);

  // Configurações de aparência dos gráficos
  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    decimalPlaces: 0,
    color: () => colors.primary,
    labelColor: () => colors.textSecondary,
    style: { borderRadius: 8 },
  };

  return (
    <>
      {/* Top bar com seta para voltar e título centralizado */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Card: Total de itens do usuário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meus Itens</Text>
          <Text style={styles.cardValue}>{totalItems}</Text>
        </View>

        {/* Card: Total de negociações do usuário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Minhas Negociações</Text>
          <Text style={styles.cardValue}>{totalNegotiations}</Text>
        </View>

        {/* Gráfico de barras: itens por tipo de negociação */}
        <Text style={styles.chartTitle}>Itens por Tipo de Negociação</Text>
        {negotiationData.labels.length > 0 && (
          <BarChart
            data={{
              labels: negotiationData.labels,
              datasets: [{ data: negotiationData.data }],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={styles.chart}
          />
        )}

        {/* Gráfico de pizza: itens por status */}
        <Text style={styles.chartTitle}>Itens por Status</Text>
        {statusData.labels.length > 0 && (
          <PieChart
            data={[
              { name: 'Aberto', population: statusData.data[0], color: colors.successDark, legendFontColor: colors.textSecondary, legendFontSize: 12 },
              { name: 'Negociado', population: statusData.data[1], color: colors.errorDark, legendFontColor: colors.textSecondary, legendFontSize: 12 },
            ]}
            width={screenWidth}
            height={200}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            chartConfig={chartConfig}
            style={styles.chart}
          />
        )}
      </ScrollView>

      {/* Bottom bar fixa */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>© 2025 Solutech. Todos os direitos reservados.</Text>
      </View>
    </>
  );
}
