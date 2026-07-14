import 'package:flutter/material.dart';

class UploadDocumentsScreen extends StatelessWidget {
  const UploadDocumentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final docs = ['PAN Card', 'Aadhaar', 'Form 16', 'Bank Statement', 'GST Documents'];
    return Scaffold(
      appBar: AppBar(title: const Text('Upload Documents')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: docs.length,
        itemBuilder: (context, index) {
          return Card(
            child: ListTile(
              leading: const Icon(Icons.upload_file, color: Color(0xFF2563EB)),
              title: Text(docs[index]),
              subtitle: const Text('Tap to upload or review document'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            ),
          );
        },
      ),
    );
  }
}
