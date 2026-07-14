import 'package:flutter/material.dart';

class ManageClientsScreen extends StatelessWidget {
  const ManageClientsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final clients = ['Ravi Kumar', 'Asha Menon', 'Karthik Rao', 'Nisha Dev'];
    return Scaffold(
      appBar: AppBar(title: const Text('Manage Clients')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: clients.length,
        itemBuilder: (context, index) {
          return Card(
            child: ListTile(
              leading: CircleAvatar(child: Text(clients[index][0])),
              title: Text(clients[index]),
              subtitle: const Text('Pending verification'),
              trailing: const Icon(Icons.edit_note_outlined),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.person_add_alt_1),
        label: const Text('Add Client'),
      ),
    );
  }
}
