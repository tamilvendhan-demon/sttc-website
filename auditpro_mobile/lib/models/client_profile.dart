class ClientProfile {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String pan;
  final String aadhaar;
  final String address;
  final String role;
  final String filingStatus;
  final double revenue;
  final List<String> documents;

  ClientProfile({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.pan,
    required this.aadhaar,
    required this.address,
    required this.role,
    required this.filingStatus,
    required this.revenue,
    required this.documents,
  });

  factory ClientProfile.sample() {
    return ClientProfile(
      id: 'CL-1001',
      name: 'Ravi Kumar',
      email: 'ravi@example.com',
      phone: '+91 9876543210',
      pan: 'ABCDE1234F',
      aadhaar: '1234 5678 9012',
      address: 'Chennai, Tamil Nadu',
      role: 'Client',
      filingStatus: 'Processing',
      revenue: 125000,
      documents: ['PAN', 'Form 16', 'Bank Statement', 'Investment Proof'],
    );
  }
}
