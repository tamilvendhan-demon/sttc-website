import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'manage_clients_screen.dart';

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Auditor Dashboard'),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.search)),
          IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_outlined)),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Overview', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 12),
            GridView.count(
              shrinkWrap: true,
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.4,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _metricCard('Clients', '128', Colors.blue),
                _metricCard('Pending', '18', Colors.orange),
                _metricCard('Completed', '96', Colors.green),
                _metricCard('Revenue', '₹24.8L', Colors.purple),
              ],
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: SizedBox(height: 220, child: LineChart(_buildChartData())),
              ),
            ),
            const SizedBox(height: 16),
            Text('Client Queue', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            InkWell(
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(builder: (_) => const ManageClientsScreen()));
              },
              child: _clientTile('Asha Menon', 'Pending documents', 'Due today'),
            ),
            _clientTile('Karthik Rao', 'ITR Filed', 'Completed'),
            _clientTile('Nisha Dev', 'Review needed', 'Processing'),
          ],
        ),
      ),
    );
  }

  LineChartData _buildChartData() {
    return LineChartData(
      gridData: const FlGridData(show: false),
      titlesData: const FlTitlesData(show: false),
      borderData: FlBorderData(show: false),
      lineBarsData: [
        LineChartBarData(
          spots: const [
            FlSpot(0, 2),
            FlSpot(1, 3),
            FlSpot(2, 2.5),
            FlSpot(3, 4),
            FlSpot(4, 3.8),
            FlSpot(5, 5),
          ],
          isCurved: true,
          color: const Color(0xFF2563EB),
          barWidth: 3,
          dotData: const FlDotData(show: false),
        ),
      ],
    );
  }

  Widget _metricCard(String title, String value, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color)),
          ],
        ),
      ),
    );
  }

  Widget _clientTile(String name, String subtitle, String badge) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(child: Text(name[0])),
        title: Text(name),
        subtitle: Text(subtitle),
        trailing: Chip(label: Text(badge)),
      ),
    );
  }
}
