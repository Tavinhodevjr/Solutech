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
      setTotalItems(await getTotalItemsByUser());
      setTotalNegotiations(await getTotalNegotiationsByUser());

      const { open, pending, finalized } = await getItemsCountByStatus();
      setStatusData({
        labels: ['Aberto', 'Aguardando', 'Finalizado'],
        data: [open, pending, finalized],
      });

      const typeCounts = await getItemsCountByNegotiationType();
      setNegotiationData({
        labels: Object.keys(typeCounts),
        data: Object.values(typeCounts),
      });
    })();
  }, []);

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
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Cards de resumo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meus Itens</Text>
          <Text style={styles.cardValue}>{totalItems}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Minhas Negociações</Text>
          <Text style={styles.cardValue}>{totalNegotiations}</Text>
        </View>

        {/* Gráfico de barras */}
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

        {/* Gráfico de pizza */}
        <Text style={styles.chartTitle}>Itens por Status</Text>
        {statusData.labels.length > 0 && (
          <PieChart
            data={[
              {
                name: 'Aberto',
                population: statusData.data[0],
                color: colors.successDark,
                legendFontColor: colors.textSecondary,
                legendFontSize: 12,
              },
              {
                name: 'Aguardando',
                population: statusData.data[1],
                color: colors.secondary,
                legendFontColor: colors.textSecondary,
                legendFontSize: 12,
              },
              {
                name: 'Finalizado',
                population: statusData.data[2],
                color: colors.errorDark,
                legendFontColor: colors.textSecondary,
                legendFontSize: 12,
              },
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

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>© 2025 Solutech. Todos os direitos reservados.</Text>
      </View>
    </>
  );
}
