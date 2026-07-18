const test = require('node:test');
const assert = require('node:assert/strict');
const { saveLead, loadLeads, clearLeads } = require('./leadStore.js');

test('saveLead stores bookings in newest-first order', () => {
  clearLeads();

  const first = saveLead({
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    phone: '9876543210',
    service: 'GST',
    notes: 'Need help with quarterly filing',
    preferredSlot: '11:30 AM',
    source: 'appointment',
  });

  const second = saveLead({
    name: 'Meena Nair',
    email: 'meena@example.com',
    phone: '9123456780',
    service: 'Income Tax Filing',
    notes: 'Need ITR filing support',
    preferredSlot: '02:00 PM',
    source: 'contact',
  });

  const leads = loadLeads();
  assert.equal(leads.length, 2);
  assert.equal(leads[0].id, second.id);
  assert.equal(leads[0].name, 'Meena Nair');
  assert.equal(leads[1].id, first.id);
});
