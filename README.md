SMART OR - REAL INTERACTIVE PROTOTYPE

This version implements the supplied design with editable fields and the requested blank areas:
- Patient Identification fields
- Safety Check checkboxes + notes
- Time Out confirmations + notes
- Surgical Count with Expected/Counted values
- Add unlimited additional count items
- Specimen Safety + notes
- Final confirmation
- Dashboard and case activity
- Automatic local browser saving
- QR button that encodes the live published URL

GitHub Pages:
Upload index.html, styles.css and 
app.js to the root of the main branch, then enable Pages from main / root.

Clinical note:
This is a functional prototype, not a hospital-approved production clinical system. Production deployment requires approved authentication, secure server-side storage, audit logs, privacy controls and clinical validation.
<header class="smart-or-header">
  <!-- القسم الأيسر: الشعارات -->
  <div class="logo-container">
    <!-- شعار المستشفى الإسلامي -->
    <img src="https://islamichospital.com/wp-content/uploads/2021/06/logo.png" alt="Islamic Hospital Logo" class="hospital-logo">
    
    <!-- فاصل جانبي -->
    <div class="logo-divider"></div>
    
    <!-- شعار وسلسلة مشروع SMART OR -->
    <div class="brand-title">
      <span class="icon-plus">+</span>
      <h1>SMART OR</h1>
    </div>
  </div>

  <!-- القسم الأيمن: رمز QR ومربع الإرشادات -->
  <div class="qr-header-card">
    <div class="qr-info">
      <span class="qr-label">SCAN ME</span>
      <span class="qr-subtext">OR SAFETY CHECK</span>
    </div>
    <!-- رمز QR المرتبط برابطك -->
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://saralamasaeed90-art.github.io/Smart-_OR-/" alt="QR Code" class="header-qr-code">
  </div>
</header>
/* Header Main Container */
.smart-or-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 12px 24px;
  border-bottom: 2px solid #E2E8F0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}

/* Logos Section */
.logo-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hospital-logo {
  height: 48px;
  width: auto;
  object-fit: contain;
}

.logo-divider {
  width: 1px;
  height: 36px;
  background-color: #CBD5E1;
}

.brand-title {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand-title .icon-plus {
  background-color: #00A878;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 14px;
}

.brand-title h1 {
  margin: 0;
  font-size: 22px;
  color: #0D2030;
  font-weight: 800;
  letter-spacing: 0.5px;
}

/* QR Code Header Card */
.qr-header-card {
  display: flex;
  align-items: center;
  background-color: #0D2030;
  color: #FFFFFF;
  padding: 6px 12px;
  border-radius: 8px;
  gap: 12px;
}

.qr-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.qr-label {
  background-color: #00A878;
  color: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 3px;
  letter-spacing: 0.5px;
}

.qr-subtext {
  font-size: 11px;
  color: #94A3B8;
  margin-top: 3px;
  font-weight: 600;
}

.header-qr-code {
  width: 45px;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #FFFFFF;
}
