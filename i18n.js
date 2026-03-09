/* ================================================================
   i18n.js  –  Internationalization for Blood Test Dashboard
   Loaded after data.js, before all other scripts.
   Provides t(key, vars) for translated strings.
   ================================================================ */

var LANG = localStorage.getItem('bd_lang') || 'en';

var I18N = {
  en: {
    // Header
    app_title: 'Blood Test',
    app_title_accent: 'Dashboard',
    search_placeholder: 'Search markers...',
    sign_in: 'Sign In',
    sign_out: 'Sign Out',
    reset: 'Reset',
    reset_title: 'Erase all data and re-import',

    // Stat boxes
    biomarkers: 'Biomarkers',
    optimal: 'Optimal',
    normal: 'Normal',
    attention: 'Attention',
    test_dates: 'Test Dates',

    // Header meta
    dob_label: 'DOB',
    last_test: 'Last test',

    // Status labels
    status_optimal: 'Optimal',
    status_normal: 'Normal',
    status_attention: 'Attention',
    status_high: 'High',
    status_low: 'Low',
    status_unknown: 'Unknown',

    // Category tab
    all: 'All',

    // Marker card
    stable: 'stable',
    no_markers: 'No markers found.',

    // Detail modal
    date: 'Date',
    value: 'Value',
    provider: 'Provider',
    change: 'Change',
    status: 'Status',
    lab_range: 'Lab Range',
    attia_ideal: 'Peter Attia Ideal',
    within_attia: 'within Attia range',
    within_lab_outside_attia: 'within lab range but outside Attia ideal',
    outside_lab: 'outside lab range',
    lab_reference: 'Lab Reference',
    attia_reference: 'Peter Attia Optimal',
    values_legend: 'Values',
    lab_range_legend: 'Lab Range',
    attia_optimal_legend: 'Attia Optimal',

    // Editor
    add_results_title: 'Add New Blood Test Results',
    manual_entry: 'Manual Entry',
    pdf_import: 'PDF Import',
    photo_import: 'Photo / Screenshot',
    test_date: 'Test Date',
    provider_label: 'Provider',
    paste_info: 'Paste new results:',
    per_line: '(one per line)',
    add_results_btn: 'Add Results',
    batch_import: 'Batch Import Files',
    export_json: 'Export JSON',
    import_json: 'Import JSON',
    set_date_alert: 'Set date first.',
    enter_results_alert: 'Enter results.',
    exported: 'Exported',
    imported_ok: 'Imported successfully',
    invalid_format: 'Invalid format',
    added_n_results: 'Added {n} results for {date}',

    // PDF/Photo import
    pdf_info: 'Upload a blood test PDF report. Text will be extracted and parsed automatically.',
    photo_info: 'Upload a photo or screenshot of blood test results. OCR will extract the text.',
    extracted_text: 'Extracted Text',
    toggle: 'Toggle',

    // Auth modal
    welcome: 'Welcome',
    auth_subtitle: 'Sign in to save and sync your blood test data',
    email_placeholder: 'Email address',
    password_placeholder: 'Password',
    create_account: 'Create Account',
    forgot_password: 'Forgot password?',
    email_pwd_required: 'Email and password are required.',
    pwd_min_length: 'Password must be at least 6 characters.',
    check_email: 'Check your email to confirm your account.',
    signed_out: 'Signed out',
    reset_confirm: 'This will erase ALL your saved blood test data and let you re-import.\n\nAre you sure?',
    must_sign_in_reset: 'You must be signed in to reset data.',
    data_reset: 'Data reset \u2014 ready to re-import',
    data_loaded: 'Data loaded',
    pwd_reset_sent: 'Password reset email sent.',
    enter_email_first: 'Enter your email address first.',
    data_migration: 'You have data in the dashboard. Save it to your account?\n\nOK = save current data\nCancel = start fresh',

    // Save indicator
    saving: 'Saving\u2026',
    saved: '\u2713 Saved',
    save_failed: 'Save failed',
    unsaved: 'Unsaved',

    // Landing page
    landing_subtitle: 'Track your blood test results over time. See trends, compare to optimal ranges, and import results from PDFs or photos.',
    landing_feat1: 'Track 100+ biomarkers across multiple providers',
    landing_feat2: 'Charts, trends, and Peter Attia optimal ranges',
    landing_feat3: 'Import results from PDF, photo, or manual entry',

    // Wizard
    wz_title: 'Import Your Blood Tests',
    wz_subtitle: 'Drop your blood test PDFs and photos here, or browse to select them.',
    wz_drop: 'Drop files here',
    wz_browse: 'or click to browse',
    wz_formats: 'Supports PDF, PNG, JPG',
    wz_cancel: 'Cancel',
    wz_process: 'Process {n} File{s}',
    wz_review_title: 'Review Extracted Results',
    wz_processing: 'Processing your files...',
    wz_found: 'Found {n} results across {f} file{s}. Set the date and provider for each file, then import.',
    wz_results: '{n} results',
    wz_back: 'Back',
    wz_import_all: 'Import All Results',
    wz_no_results: 'No results to import. Make sure files have dates set and results are checked.',
    wz_done_title: 'Import Complete',
    wz_done_msg: 'Imported {n} result{s} across {d} test date{ds}.',
    wz_view: 'View Dashboard',
    wz_name: 'Name',
    wz_match: 'Match',

    // Export
    export_pdf: 'Export PDF',
    share_link: 'Share Link',
    export_title: 'Export PDF Report',
    export_latest: 'Latest results only',
    export_all: 'All results',
    export_specific: 'Specific dates',
    generate_pdf: 'Generate PDF',
    pdf_report_title: 'Blood Test Report',
    pdf_generated: 'Generated',
    pdf_summary: 'Summary',
    pdf_markers: 'markers',
    pdf_page: 'Page',
    pdf_footer: 'Generated from Blood Test Dashboard',

    // Share
    share_copied: 'Share link copied!',
    share_failed: 'Failed to create share link',
    share_sign_in_required: 'Sign in to share your results',
    viewing_shared: 'Viewing shared results',
    share_sign_in_cta: 'Sign in to create your own dashboard',
    share_not_found: 'Shared link not found or expired',
    share_link_btn: 'Share Link'
  },

  it: {
    // Header
    app_title: 'Esami del Sangue',
    app_title_accent: 'Dashboard',
    search_placeholder: 'Cerca marcatori...',
    sign_in: 'Accedi',
    sign_out: 'Esci',
    reset: 'Reimposta',
    reset_title: 'Cancella tutti i dati e re-importa',

    // Stat boxes
    biomarkers: 'Biomarcatori',
    optimal: 'Ottimale',
    normal: 'Normale',
    attention: 'Attenzione',
    test_dates: 'Date Esami',

    // Header meta
    dob_label: 'Data di nascita',
    last_test: 'Ultimo esame',

    // Status labels
    status_optimal: 'Ottimale',
    status_normal: 'Normale',
    status_attention: 'Attenzione',
    status_high: 'Alto',
    status_low: 'Basso',
    status_unknown: 'Sconosciuto',

    // Category tab
    all: 'Tutti',

    // Marker card
    stable: 'stabile',
    no_markers: 'Nessun marcatore trovato.',

    // Detail modal
    date: 'Data',
    value: 'Valore',
    provider: 'Fornitore',
    change: 'Variazione',
    status: 'Stato',
    lab_range: 'Intervallo Lab',
    attia_ideal: 'Ideale Peter Attia',
    within_attia: 'nel range Attia',
    within_lab_outside_attia: 'nel range lab ma fuori dall\'ideale Attia',
    outside_lab: 'fuori dal range lab',
    lab_reference: 'Riferimento Lab',
    attia_reference: 'Ottimale Peter Attia',
    values_legend: 'Valori',
    lab_range_legend: 'Intervallo Lab',
    attia_optimal_legend: 'Attia Ottimale',

    // Editor
    add_results_title: 'Aggiungi Nuovi Risultati',
    manual_entry: 'Inserimento Manuale',
    pdf_import: 'Importa PDF',
    photo_import: 'Foto / Screenshot',
    test_date: 'Data Esame',
    provider_label: 'Fornitore',
    paste_info: 'Incolla nuovi risultati:',
    per_line: '(uno per riga)',
    add_results_btn: 'Aggiungi Risultati',
    batch_import: 'Importa File in Blocco',
    export_json: 'Esporta JSON',
    import_json: 'Importa JSON',
    set_date_alert: 'Imposta prima la data.',
    enter_results_alert: 'Inserisci i risultati.',
    exported: 'Esportato',
    imported_ok: 'Importato con successo',
    invalid_format: 'Formato non valido',
    added_n_results: 'Aggiunti {n} risultati per {date}',

    // PDF/Photo import
    pdf_info: 'Carica un PDF di analisi del sangue. Il testo sar\u00e0 estratto e analizzato automaticamente.',
    photo_info: 'Carica una foto o screenshot dei risultati. L\'OCR estrarra\u0300 il testo.',
    extracted_text: 'Testo Estratto',
    toggle: 'Mostra/Nascondi',

    // Auth modal
    welcome: 'Benvenuto',
    auth_subtitle: 'Accedi per salvare e sincronizzare i tuoi dati',
    email_placeholder: 'Indirizzo email',
    password_placeholder: 'Password',
    create_account: 'Crea Account',
    forgot_password: 'Password dimenticata?',
    email_pwd_required: 'Email e password sono obbligatori.',
    pwd_min_length: 'La password deve avere almeno 6 caratteri.',
    check_email: 'Controlla la tua email per confermare l\'account.',
    signed_out: 'Disconnesso',
    reset_confirm: 'Questo canceller\u00e0 TUTTI i tuoi dati delle analisi del sangue e ti permetter\u00e0 di re-importare.\n\nSei sicuro?',
    must_sign_in_reset: 'Devi essere connesso per reimpostare i dati.',
    data_reset: 'Dati reimpostati \u2014 pronto per re-importare',
    data_loaded: 'Dati caricati',
    pwd_reset_sent: 'Email per reimpostare la password inviata.',
    enter_email_first: 'Inserisci prima il tuo indirizzo email.',
    data_migration: 'Hai dei dati nella dashboard. Salvarli nel tuo account?\n\nOK = salva dati attuali\nAnnulla = ricomincia da zero',

    // Save indicator
    saving: 'Salvataggio\u2026',
    saved: '\u2713 Salvato',
    save_failed: 'Salvataggio fallito',
    unsaved: 'Non salvato',

    // Landing page
    landing_subtitle: 'Monitora i risultati delle tue analisi del sangue nel tempo. Visualizza tendenze, confronta con range ottimali e importa risultati da PDF o foto.',
    landing_feat1: 'Monitora 100+ biomarcatori da diversi laboratori',
    landing_feat2: 'Grafici, tendenze e range ottimali Peter Attia',
    landing_feat3: 'Importa risultati da PDF, foto o inserimento manuale',

    // Wizard
    wz_title: 'Importa le Tue Analisi',
    wz_subtitle: 'Trascina qui i PDF e le foto delle analisi, oppure clicca per selezionarli.',
    wz_drop: 'Trascina i file qui',
    wz_browse: 'o clicca per sfogliare',
    wz_formats: 'Supporta PDF, PNG, JPG',
    wz_cancel: 'Annulla',
    wz_process: 'Elabora {n} File',
    wz_review_title: 'Revisione Risultati Estratti',
    wz_processing: 'Elaborazione dei file in corso...',
    wz_found: 'Trovati {n} risultati in {f} file. Imposta la data e il fornitore per ogni file, poi importa.',
    wz_results: '{n} risultati',
    wz_back: 'Indietro',
    wz_import_all: 'Importa Tutti i Risultati',
    wz_no_results: 'Nessun risultato da importare. Assicurati che i file abbiano le date impostate e i risultati selezionati.',
    wz_done_title: 'Importazione Completata',
    wz_done_msg: 'Importati {n} risultat{s} in {d} dat{ds} di esame.',
    wz_view: 'Vedi Dashboard',
    wz_name: 'Nome',
    wz_match: 'Corrispondenza',

    // Export
    export_pdf: 'Esporta PDF',
    share_link: 'Condividi Link',
    export_title: 'Esporta Report PDF',
    export_latest: 'Solo ultimi risultati',
    export_all: 'Tutti i risultati',
    export_specific: 'Date specifiche',
    generate_pdf: 'Genera PDF',
    pdf_report_title: 'Report Analisi del Sangue',
    pdf_generated: 'Generato',
    pdf_summary: 'Riepilogo',
    pdf_markers: 'marcatori',
    pdf_page: 'Pagina',
    pdf_footer: 'Generato da Blood Test Dashboard',

    // Share
    share_copied: 'Link di condivisione copiato!',
    share_failed: 'Impossibile creare il link di condivisione',
    share_sign_in_required: 'Accedi per condividere i tuoi risultati',
    viewing_shared: 'Stai visualizzando risultati condivisi',
    share_sign_in_cta: 'Accedi per creare la tua dashboard',
    share_not_found: 'Link condiviso non trovato o scaduto',
    share_link_btn: 'Condividi Link'
  }
};

/**
 * Translate a key, with optional variable interpolation.
 * t('added_n_results', {n: 5, date: '1 Mar 2025'})
 * Replaces {n}, {date} etc. in the translated string.
 */
function t(key, vars) {
  var str = (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key;
  if (vars) {
    for (var k in vars) {
      str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    }
  }
  return str;
}

/**
 * Switch language, persist, and re-render.
 */
function setLang(lang) {
  LANG = lang;
  localStorage.setItem('bd_lang', lang);
  document.documentElement.lang = lang;
  var sel = document.getElementById('lang-sel');
  if (sel) sel.value = lang;
  // Re-render UI
  if (typeof render === 'function') render();
  // Update static HTML elements that aren't rebuilt by render()
  updateStaticI18n();
}

/**
 * Update elements outside of render() that have hardcoded text.
 */
function updateStaticI18n() {
  // Header title
  var h1s = document.querySelectorAll('.hdr h1, .landing-card h1');
  h1s.forEach(function(el) {
    el.innerHTML = t('app_title') + ' <b>' + t('app_title_accent') + '</b>';
  });
  // Search placeholder
  var si = document.getElementById('si');
  if (si) si.placeholder = t('search_placeholder');
  // Auth buttons
  var loginBtn = document.getElementById('auth-login-btn');
  if (loginBtn) loginBtn.textContent = t('sign_in');
  // Auth user info buttons
  var authInfo = document.getElementById('auth-user-info');
  if (authInfo) {
    var btns = authInfo.querySelectorAll('button');
    if (btns[0]) { btns[0].textContent = t('reset'); btns[0].title = t('reset_title'); }
    if (btns[1]) btns[1].textContent = t('sign_out');
  }
  // Auth modal
  var authModal = document.getElementById('auth-overlay');
  if (authModal) {
    var h2 = authModal.querySelector('h2');
    if (h2) h2.textContent = t('welcome');
    var sub = authModal.querySelector('div[style*="text-align:center"][style*="margin-bottom:20px"]');
    if (sub) sub.textContent = t('auth_subtitle');
    var emailIn = document.getElementById('auth-email');
    if (emailIn) emailIn.placeholder = t('email_placeholder');
    var pwIn = document.getElementById('auth-password');
    if (pwIn) pwIn.placeholder = t('password_placeholder');
    var authBtns = authModal.querySelectorAll('.auth-btn');
    if (authBtns[0]) authBtns[0].textContent = t('sign_in');
    if (authBtns[1]) authBtns[1].textContent = t('create_account');
    var fpLink = authModal.querySelector('a[onclick*="authResetPassword"]');
    if (fpLink) fpLink.textContent = t('forgot_password');
  }
  // Editor
  var editorSum = document.querySelector('.editor summary');
  if (editorSum) editorSum.textContent = t('add_results_title');
  // Import tabs
  var impTabs = document.querySelectorAll('.imp-tb');
  if (impTabs[0]) impTabs[0].textContent = t('manual_entry');
  if (impTabs[1]) impTabs[1].textContent = t('pdf_import');
  if (impTabs[2]) impTabs[2].textContent = t('photo_import');
  // Manual entry info
  var manualInfo = document.querySelector('#tab-manual .info');
  if (manualInfo) manualInfo.innerHTML = t('paste_info') + ' <strong>Biomarker, Value, Unit</strong> ' + t('per_line');
  // Manual entry labels
  var manualLabels = document.querySelectorAll('#tab-manual label');
  if (manualLabels[0]) manualLabels[0].textContent = t('test_date') + ':';
  if (manualLabels[1]) manualLabels[1].textContent = t('provider_label') + ':';
  // Add Results button
  var addBtn = document.querySelector('#tab-manual .btn-p');
  if (addBtn) addBtn.textContent = t('add_results_btn');
  // PDF import info
  var pdfInfo = document.querySelector('#tab-pdf .info');
  if (pdfInfo) pdfInfo.textContent = t('pdf_info');
  var pdfLabels = document.querySelectorAll('#tab-pdf label');
  if (pdfLabels[0]) pdfLabels[0].textContent = t('test_date') + ':';
  if (pdfLabels[1]) pdfLabels[1].textContent = t('provider_label') + ':';
  // Photo import info
  var photoInfo = document.querySelector('#tab-photo .info');
  if (photoInfo) photoInfo.textContent = t('photo_info');
  var photoLabels = document.querySelectorAll('#tab-photo label');
  if (photoLabels[0]) photoLabels[0].textContent = t('test_date') + ':';
  if (photoLabels[1]) photoLabels[1].textContent = t('provider_label') + ':';
  // Bottom action buttons
  var bottomBtns = document.querySelectorAll('.editor-body > div:last-child .btn');
  if (bottomBtns[0]) bottomBtns[0].textContent = t('batch_import');
  if (bottomBtns[1]) bottomBtns[1].textContent = t('export_json');
  if (bottomBtns[2]) bottomBtns[2].textContent = t('import_json');
  if (bottomBtns[3]) bottomBtns[3].textContent = t('export_pdf');
  if (bottomBtns[4]) bottomBtns[4].textContent = t('share_link_btn');
  // Landing page
  var landingSub = document.querySelector('.landing-card .sub');
  if (landingSub) landingSub.textContent = t('landing_subtitle');
  var feats = document.querySelectorAll('.landing-card .feat');
  var featKeys = ['landing_feat1', 'landing_feat2', 'landing_feat3'];
  feats.forEach(function(el, i) {
    if (featKeys[i]) {
      var iconDiv = el.querySelector('.feat-icon');
      var iconHTML = iconDiv ? iconDiv.outerHTML : '';
      el.innerHTML = iconHTML + t(featKeys[i]);
    }
  });
  // Landing buttons
  var landingBtns = document.querySelectorAll('.landing-card .l-btn');
  if (landingBtns[0]) landingBtns[0].textContent = t('sign_in');
  if (landingBtns[1]) landingBtns[1].textContent = t('create_account');
}

// ── Italian Display Unit Conversion ──────────────────────────────
// Internal storage is SI (UK). When LANG==='it', convert for display.

var IT_DISPLAY = {
  "Total Cholesterol":      {u:"mg/dl", f:38.67},
  "LDL Cholesterol":        {u:"mg/dl", f:38.67},
  "HDL Cholesterol":        {u:"mg/dl", f:38.67},
  "Non-HDL Cholesterol":    {u:"mg/dl", f:38.67},
  "Small LDL Cholesterol":  {u:"mg/dl", f:38.67},
  "Triglycerides":          {u:"mg/dl", f:88.57},
  "Apolipoprotein A-I":     {u:"mg/dl", f:100},
  "Apolipoprotein B":       {u:"mg/dl", f:100},
  "Lp(a)":                  {u:"mg/dl", f:0.4651},
  "Glucose":                {u:"mg/dl", f:18.02},
  "Insulin":                {u:"\u00b5U/ml", f:0.1440},
  "C-peptide":              {u:"ng/ml", f:0.003021},
  "Uric Acid":              {u:"mg/dl", f:0.01681},
  "Testosterone":           {u:"ng/dl", f:28.84},
  "Free Testosterone":      {u:"pg/ml", f:288.4},
  "Oestradiol (E2)":        {u:"pg/ml", f:0.2724},
  "DHT":                    {u:"pg/ml", f:290.4},
  "DHEA-S":                 {u:"\u00b5g/dl", f:36.85},
  "Cortisol":               {u:"\u00b5g/dl", f:0.03625},
  "Free T4":                {u:"pg/ml", f:0.7770},
  "Free T3":                {u:"pg/ml", f:0.6510},
  "IGF-1":                  {u:"ng/ml", f:7.649},
  "Vitamin D":              {u:"ng/ml", f:0.4006},
  "Vitamin B12":            {u:"pg/ml", f:1.3554},
  "Folate":                 {u:"ng/ml", f:0.4413},
  "Iron":                   {u:"\u00b5g/dl", f:5.585},
  "Magnesium":              {u:"mEq/l", f:2},
  "hsCRP":                  {u:"mg/dl", f:0.1},
  "Fibrinogen":             {u:"mg/dl", f:100},
  "Haemoglobin":            {u:"g/dl", f:0.1},
  "Creatinine":             {u:"mg/dl", f:0.01131}
};

var IT_ATTIA = {
  "LDL Cholesterol":     "<70 mg/dL",
  "Triglycerides":       "<100 mg/dL",
  "Apolipoprotein B":    "<60 mg/dL",
  "Glucose":             "<90 mg/dL",
  "HbA1c":               "<38.8 mmol/mol",
  "Insulin":             "<6 \u00b5U/mL",
  "Uric Acid":           "<5.0 mg/dL",
  "Testosterone":        "400\u20131200 ng/dL",
  "Free Testosterone":   "40\u2013240 pg/mL",
  "Oestradiol (E2)":     "30\u201350 pg/mL",
  "Vitamin D":           "40\u201360 ng/mL",
  "Magnesium":           ">1.64 mEq/L",
  "Fibrinogen":          "<355 mg/dL"
};

function dVal(name, val) {
  if (LANG !== 'it' || typeof val !== 'number') return val;
  var c = IT_DISPLAY[name];
  if (!c) return val;
  var r = val * c.f;
  if (Math.abs(r) >= 100) return parseFloat(r.toFixed(0));
  if (Math.abs(r) >= 10) return parseFloat(r.toFixed(1));
  return parseFloat(r.toPrecision(3));
}

function dUnit(name, siUnit) {
  if (LANG !== 'it') return siUnit;
  var c = IT_DISPLAY[name];
  return c ? c.u : siUnit;
}

function dRange(name, rangeStr) {
  if (LANG !== 'it' || !rangeStr) return rangeStr;
  var c = IT_DISPLAY[name];
  if (!c) return rangeStr;
  return rangeStr.replace(/(\d+\.?\d*)/g, function(match) {
    var n = parseFloat(match) * c.f;
    if (Math.abs(n) >= 100) return parseFloat(n.toFixed(0));
    if (Math.abs(n) >= 10) return parseFloat(n.toFixed(1));
    return parseFloat(n.toPrecision(3));
  });
}

function dAttia(name, attiaObj) {
  if (!attiaObj) return null;
  if (LANG === 'it' && IT_ATTIA[name]) return IT_ATTIA[name];
  return attiaObj.label;
}

function dAttiaBound(name, val) {
  if (LANG !== 'it' || val == null) return val;
  var c = IT_DISPLAY[name];
  return c ? val * c.f : val;
}

function toSI(name, val) {
  if (LANG !== 'it' || typeof val !== 'number') return val;
  var c = IT_DISPLAY[name];
  if (!c) return val;
  return parseFloat((val / c.f).toPrecision(4));
}
