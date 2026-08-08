import test from 'node:test';
import assert from 'node:assert/strict';
import { saveLead, clearLeads } from './leadStore.ts';

test('saveLead creates a customer code and preserves ownership metadata', async () => {
  await clearLeads();

  const lead = await saveLead({
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    phone: '9876543210',
    service: 'GST',
    notes: 'Need support for quarterly filing and business setup',
    preferredSlot: '11:30 AM',
    source: 'appointment',
    companyName: 'Thirumurugan Foods',
    customerType: 'business',
    status: 'new',
    ownershipTransferReady: false,
    followUpDate: '2026-08-12',
  });

  assert.match(lead.customerCode, /^STTC-\d{8}-\d{4}$/);
  assert.equal(lead.companyName, 'Thirumurugan Foods');
  assert.equal(lead.customerType, 'business');
  assert.equal(lead.status, 'new');
  assert.equal(lead.ownershipTransferReady, false);
});
