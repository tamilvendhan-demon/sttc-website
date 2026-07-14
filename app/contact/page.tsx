import PageShell from "../components/PageShell";
import ContactSection from "../components/ContactSection";

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" description="Get in touch for consultations, filings, audits, or registration support.">
      <ContactSection />
    </PageShell>
  );
}
