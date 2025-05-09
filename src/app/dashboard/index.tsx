// src/app/dashboard/index.tsx
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
  getTotalUsers,
  getTotalItems,
  getItemsCountByStatus,
  getItemsCountByNegotiationType,
} from '../../config/metrics';
import { colors } from '../../styles/colors';

export default function Dashboard() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width - 40;

  // Estados das métricas
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [statusData, setStatusData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });
  const [negotiationData, setNegotiationData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });

  // Carrega métricas ao montar
  useEffect(() => {
    (async () => {
      setTotalUsers(await getTotalUsers());
      setTotalItems(await getTotalItems());

      const { open, negotiated } = await getItemsCountByStatus();
      setStatusData({
        labels: ['Aberto', 'Negociado'],
        data: [open, negotiated],
      });

      const typeCounts = await getItemsCountByNegotiationType();
      setNegotiationData({
        labels: Object.keys(typeCounts),
        data: Object.values(typeCounts),
      });
    })();
  }, []);

  // Configurações compartilhadas de estilo para os gráficos
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
      {/* Top bar com seta de voltar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Conteúdo com rolagem */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cards de resumo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Usuários</Text>
          <Text style={styles.cardValue}>{totalUsers}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Itens</Text>
          <Text style={styles.cardValue}>{totalItems}</Text>
        </View>

        {/* Gráfico de barras: Itens por Tipo de Negociação */}
        <Text style={styles.chartTitle}>Itens por Tipo de Negociação</Text>
        {negotiationData.labels.length > 0 && (
          <BarChart
            data={{
              labels: negotiationData.labels,
              datasets: [
                {
                  data: negotiationData.data,
                  color: () => colors.primary,
                },
              ],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel=""           // Obrigatório para tipagem
            yAxisSuffix=""          // Obrigatório para tipagem
            chartConfig={chartConfig}
            style={styles.chart}
          />
        )}

        {/* Gráfico de pizza: Itens por Status */}
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
                name: 'Negociado',
                population: statusData.data[1],
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

      {/* Bottom bar fixa */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>© 2025 Solutech. Todos os direitos reservados.</Text>
      </View>
    </>
  );
}
