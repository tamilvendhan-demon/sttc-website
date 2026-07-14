import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../models/client_profile.dart';
import 'client_profile_screen.dart';
import 'upload_documents_screen.dart';

class ClientDashboardScreen extends StatefulWidget {
  const ClientDashboardScreen({super.key});

  @override
  State<ClientDashboardScreen> createState() => _ClientDashboardScreenState();
}

class _ClientDashboardScreenState extends State<ClientDashboardScreen> {
  final profile = ClientProfile.sample();
  final now = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AuditPro Client Portal'),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_outlined)),
          IconButton(onPressed: () {}, icon: const Icon(Icons.chat_bubble_outline)),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeroCard(),
            const SizedBox(height: 16),
            Text('Your ITR Status', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            _buildStatusCard(),
            const SizedBox(height: 16),
            Text('Documents', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: profile.documents.map((doc) => Chip(label: Text(doc))).toList(),
            ),
            const SizedBox(height: 16),
            Text('Quick Actions', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            GridView.count(
              shrinkWrap: true,
              crossAxisCount: 2,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.2,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _buildActionCard(Icons.upload_file, 'Upload Docs', Colors.blue, () {
                  Navigator.of(context).push(MaterialPageRoute(builder: (_) => const UploadDocumentsScreen()));
                }),
                _buildActionCard(Icons.receipt_long, 'Invoices', Colors.green, () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Invoice history ready for integration.')));
                }),
                _buildActionCard(Icons.picture_as_pdf, 'Download Report', Colors.orange, () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Report download initiated.')));
                }),
                _buildActionCard(Icons.support_agent, 'Chat with Auditor', Colors.purple, () {
                  Navigator.of(context).push(MaterialPageRoute(builder: (_) => const ClientProfileScreen()));
                }),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeroCard() {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      color: const Color(0xFF2563EB),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Welcome back, ${profile.name}', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 8),
            const Text('Your tax filing is secured and progressing smoothly.', style: TextStyle(color: Colors.white70)),
            const SizedBox(height: 16),
            Row(
              children: [
                _miniStat('Due Date', DateFormat('dd MMM').format(now.add(const Duration(days: 7)))),
                const SizedBox(width: 12),
                _miniStat('Status', profile.filingStatus),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusCard() {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.assignment_turned_in, color: Colors.green),
                const SizedBox(width: 8),
                Text('Processing', style: Theme.of(context).textTheme.titleMedium),
              ],
            ),
            const SizedBox(height: 8),
            const Text('Documents verified by your auditor. Pending final filing submission.'),
            const SizedBox(height: 16),
            LinearProgressIndicator(value: 0.72, color: Colors.green[700]),
          ],
        ),
      ),
    );
  }

  Widget _miniStat(String label, String value) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(12)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(color: Colors.white70, fontSize: 12)),
            Text(value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildActionCard(IconData icon, String title, Color color, VoidCallback onTap) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 26, color: color),
              const SizedBox(height: 8),
              Text(title, textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleSmall),
            ],
          ),
        ),
      ),
    );
  }
}
