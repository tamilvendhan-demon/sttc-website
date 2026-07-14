import 'package:flutter/material.dart';

class ClientProfileScreen extends StatelessWidget {
  const ClientProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Client Profile')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          ListTile(leading: CircleAvatar(child: Icon(Icons.person)), title: Text('Ravi Kumar'), subtitle: Text('Client / Individual Taxpayer')),
          Divider(),
          ListTile(title: Text('PAN'), trailing: Text('ABCDE1234F')),
          ListTile(title: Text('Aadhaar'), trailing: Text('1234 5678 9012')),
          ListTile(title: Text('Phone'), trailing: Text('+91 9876543210')),
          ListTile(title: Text('Email'), trailing: Text('ravi@example.com')),
          ListTile(title: Text('Address'), trailing: Text('Chennai, Tamil Nadu')),
        ],
      ),
    );
  }
}
