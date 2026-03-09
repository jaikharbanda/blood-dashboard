/* ================================================================
   wizard.js  –  Batch Import Wizard for Blood Test Dashboard
   Loaded after import.js; reuses extractPDF(), extractPhoto(),
   parseLabText(), matchBiomarker() from import.js
   ================================================================ */

var wizardFiles = [];      // {file, type:'pdf'|'image', results:[], date:'', prov:''}
var wizardStep = 1;
var wizardProcessing = false;

// ────────────────────────────────────────────────────────────────
// 1. Show / Hide
// ────────────────────────────────────────────────────────────────

function showWizard() {
  var el = document.getElementById('wizard-overlay');
  if (el) { el.classList.add('open'); }
  wizardFiles = [];
  wizardStep = 1;
  wizardRenderStep();
}

function closeWizard() {
  var el = document.getElementById('wizard-overlay');
  if (el) el.classList.remove('open');
  wizardFiles = [];
}

// ────────────────────────────────────────────────────────────────
// 2. Step rendering
// ────────────────────────────────────────────────────────────────

function wizardRenderStep() {
  var body = document.getElementById('wizard-body');
  if (!body) return;

  // Update step dots
  for (var s = 1; s <= 3; s++) {
    var dot = document.getElementById('wz-dot-' + s);
    if (dot) {
      dot.className = 'wz-dot' + (s === wizardStep ? ' active' : '') + (s < wizardStep ? ' done' : '');
    }
  }

  if (wizardStep === 1) wizardRenderUpload(body);
  else if (wizardStep === 2) wizardRenderReview(body);
  else if (wizardStep === 3) wizardRenderDone(body);
}

// ────────────────────────────────────────────────────────────────
// 3. Step 1: File Upload
// ────────────────────────────────────────────────────────────────

function wizardRenderUpload(body) {
  var html = '';
  html += '<h2 style="text-align:center;margin-bottom:4px">Import Your Blood Tests</h2>';
  html += '<p style="text-align:center;color:var(--muted);font-size:.85rem;margin-bottom:24px">Drop your blood test PDFs and photos here, or browse to select them.</p>';

  // Drop zone
  html += '<div id="wz-dropzone" class="wz-dropzone" onclick="document.getElementById(\'wz-file-input\').click()">';
  html += '<div style="font-size:2.5rem;margin-bottom:8px">&#x1F4C1;</div>';
  html += '<div style="font-weight:600;margin-bottom:4px">Drop files here</div>';
  html += '<div style="font-size:.8rem;color:var(--muted)">or click to browse</div>';
  html += '<div style="font-size:.75rem;color:var(--muted);margin-top:6px">Supports PDF, PNG, JPG</div>';
  html += '</div>';
  html += '<input type="file" id="wz-file-input" multiple accept=".pdf,image/*" style="display:none" onchange="wizardFilesSelected(event)">';

  // File list
  if (wizardFiles.length > 0) {
    html += '<div class="wz-file-list">';
    for (var i = 0; i < wizardFiles.length; i++) {
      var f = wizardFiles[i];
      var icon = f.type === 'pdf' ? '&#x1F4C4;' : '&#x1F5BC;';
      var size = f.file.size < 1024 * 1024
        ? (f.file.size / 1024).toFixed(0) + ' KB'
        : (f.file.size / (1024 * 1024)).toFixed(1) + ' MB';
      html += '<div class="wz-file-item">';
      html += '<span style="font-size:1.1rem">' + icon + '</span>';
      html += '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + escHtml(f.file.name) + '">' + escHtml(f.file.name) + '</span>';
      html += '<span style="color:var(--muted);font-size:.75rem;flex-shrink:0">' + size + '</span>';
      html += '<button onclick="wizardRemoveFile(' + i + ')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;padding:0 4px">&times;</button>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Action buttons
  html += '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">';
  html += '<button class="btn btn-s" onclick="closeWizard()" style="margin:0">Cancel</button>';
  if (wizardFiles.length > 0) {
    html += '<button class="btn btn-p" onclick="wizardStartProcessing()" style="margin:0">Process ' + wizardFiles.length + ' File' + (wizardFiles.length > 1 ? 's' : '') + '</button>';
  }
  html += '</div>';

  body.innerHTML = html;
  wizardSetupDrop();
}

// ────────────────────────────────────────────────────────────────
// 4. File handling
// ────────────────────────────────────────────────────────────────

function wizardFilesSelected(event) {
  var files = event.target.files;
  if (!files || !files.length) return;
  for (var i = 0; i < files.length; i++) {
    wizardAddFile(files[i]);
  }
  event.target.value = '';
  wizardRenderStep();
}

function wizardAddFile(file) {
  var isPDF = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
  var isImage = /^image\//i.test(file.type);
  if (!isPDF && !isImage) return; // skip unsupported

  // Skip duplicates
  for (var i = 0; i < wizardFiles.length; i++) {
    if (wizardFiles[i].file.name === file.name && wizardFiles[i].file.size === file.size) return;
  }

  wizardFiles.push({
    file: file,
    type: isPDF ? 'pdf' : 'image',
    results: [],
    date: wizardGuessDate(file.name),
    prov: '',
    status: 'pending' // pending, processing, done, error
  });
}

function wizardRemoveFile(idx) {
  wizardFiles.splice(idx, 1);
  wizardRenderStep();
}

function wizardGuessDate(filename) {
  // Try YYYY-MM-DD or YYYY_MM_DD
  var m = filename.match(/(\d{4})[-_](\d{2})[-_](\d{2})/);
  if (m) return m[1] + '-' + m[2] + '-' + m[3];

  // Try DD-MM-YYYY or DD.MM.YYYY
  m = filename.match(/(\d{2})[-\.](\d{2})[-\.](\d{4})/);
  if (m) return m[3] + '-' + m[2] + '-' + m[1];

  // Try YYYYMMDD
  m = filename.match(/(\d{4})(\d{2})(\d{2})/);
  if (m && parseInt(m[2]) <= 12 && parseInt(m[3]) <= 31) return m[1] + '-' + m[2] + '-' + m[3];

  return '';
}

// Extract date from the raw parsed text of a blood test report
function wizardExtractDateFromText(text) {
  if (!text) return '';

  var monthNames = {
    'jan':1,'january':1,'feb':2,'february':2,'mar':3,'march':3,
    'apr':4,'april':4,'may':5,'jun':6,'june':6,
    'jul':7,'july':7,'aug':8,'august':8,'sep':9,'september':9,
    'oct':10,'october':10,'nov':11,'november':11,'dec':12,'december':12
  };

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function validDate(y, m, d) { return y >= 2015 && y <= 2030 && m >= 1 && m <= 12 && d >= 1 && d <= 31; }

  // Look for date near keywords first (most reliable)
  var keywords = /(?:date(?:\s+of)?(?:\s+(?:collection|visit|report|sample|test|birth|received|taken))?|collected|received|sample\s+date|report\s+date|test\s+date|specimen\s+collected|date\s+collected|visit\s+date)\s*[:\-]?\s*/gi;
  var m, best = '';

  // Search line by line for keyword + date
  var lines = text.split(/\n/);
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Skip DOB lines
    if (/\b(?:d\.?o\.?b|date\s+of\s+birth|born)\b/i.test(line)) continue;

    // Keyword + DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
    m = line.match(/(?:date|collect|receiv|sample|report|visit|specimen|test|taken)[^0-9]{0,20}(\d{1,2})\s*[\/\-\.]\s*(\d{1,2})\s*[\/\-\.]\s*(\d{2,4})/i);
    if (m) {
      var d = parseInt(m[1]), mo = parseInt(m[2]), y = parseInt(m[3]);
      if (y < 100) y += 2000;
      if (validDate(y, mo, d)) return y + '-' + pad(mo) + '-' + pad(d);
      // Maybe it's MM/DD/YYYY — but UK reports are usually DD/MM
    }

    // Keyword + YYYY-MM-DD
    m = line.match(/(?:date|collect|receiv|sample|report|visit|specimen|test|taken)[^0-9]{0,20}(\d{4})\s*[\/\-\.]\s*(\d{1,2})\s*[\/\-\.]\s*(\d{1,2})/i);
    if (m) {
      var y2 = parseInt(m[1]), mo2 = parseInt(m[2]), d2 = parseInt(m[3]);
      if (validDate(y2, mo2, d2)) return y2 + '-' + pad(mo2) + '-' + pad(d2);
    }

    // Keyword + DD Mon YYYY (e.g., "01 March 2024", "01-Mar-2024")
    m = line.match(/(?:date|collect|receiv|sample|report|visit|specimen|test|taken)[^a-z]{0,20}(\d{1,2})\s*[\-\/\s]\s*([a-z]+)\s*[\-\/\s]\s*(\d{2,4})/i);
    if (m) {
      var mn = monthNames[m[2].toLowerCase()];
      if (mn) {
        var yr = parseInt(m[3]);
        if (yr < 100) yr += 2000;
        if (validDate(yr, mn, parseInt(m[1]))) return yr + '-' + pad(mn) + '-' + pad(parseInt(m[1]));
      }
    }

    // Keyword + Mon DD, YYYY (e.g., "March 01, 2024")
    m = line.match(/(?:date|collect|receiv|sample|report|visit|specimen|test|taken)[^a-z]{0,20}([a-z]+)\s+(\d{1,2})\s*,?\s*(\d{4})/i);
    if (m) {
      var mn2 = monthNames[m[1].toLowerCase()];
      if (mn2) {
        if (validDate(parseInt(m[3]), mn2, parseInt(m[2]))) return m[3] + '-' + pad(mn2) + '-' + pad(parseInt(m[2]));
      }
    }
  }

  // Fallback: look for standalone DD/MM/YYYY anywhere (not near DOB)
  for (var j = 0; j < lines.length; j++) {
    if (/\b(?:d\.?o\.?b|date\s+of\s+birth|born)\b/i.test(lines[j])) continue;
    m = lines[j].match(/\b(\d{1,2})\s*[\/\-\.]\s*(\d{1,2})\s*[\/\-\.]\s*(\d{4})\b/);
    if (m) {
      var fd = parseInt(m[1]), fmo = parseInt(m[2]), fy = parseInt(m[3]);
      if (validDate(fy, fmo, fd) && fy >= 2020) return fy + '-' + pad(fmo) + '-' + pad(fd);
    }
    // DD Mon YYYY standalone
    m = lines[j].match(/\b(\d{1,2})\s*[\-\s]\s*([a-z]{3,9})\s*[\-\s]\s*(\d{4})\b/i);
    if (m) {
      var fmn = monthNames[m[2].toLowerCase()];
      if (fmn) {
        var fyr = parseInt(m[3]);
        if (validDate(fyr, fmn, parseInt(m[1])) && fyr >= 2020) return fyr + '-' + pad(fmn) + '-' + pad(parseInt(m[1]));
      }
    }
  }

  return '';
}

function wizardSetupDrop() {
  var dz = document.getElementById('wz-dropzone');
  if (!dz) return;

  dz.addEventListener('dragover', function(e) {
    e.preventDefault();
    dz.classList.add('dragover');
  });
  dz.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dz.classList.remove('dragover');
  });
  dz.addEventListener('drop', function(e) {
    e.preventDefault();
    dz.classList.remove('dragover');
    var files = e.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      wizardAddFile(files[i]);
    }
    wizardRenderStep();
  });
}

// ────────────────────────────────────────────────────────────────
// 5. Step 2: Processing + Review
// ────────────────────────────────────────────────────────────────

function wizardStartProcessing() {
  wizardStep = 2;
  wizardProcessing = true;
  wizardRenderStep();
  wizardProcessNext(0);
}

function wizardProcessNext(idx) {
  if (idx >= wizardFiles.length) {
    wizardProcessing = false;
    wizardRenderStep();
    return;
  }

  var entry = wizardFiles[idx];
  entry.status = 'processing';
  wizardRenderStep();

  var extractor = entry.type === 'pdf' ? extractPDF : extractPhoto;

  extractor(entry.file, function(pct, msg) {
    var statusEl = document.getElementById('wz-file-status-' + idx);
    if (statusEl) statusEl.textContent = msg || (pct + '%');
  }).then(function(text) {
    // Try Randox Biomarker Tracking format first (multi-date)
    var randoxData = (typeof parseRandoxTracking === 'function') ? parseRandoxTracking(text) : null;
    console.log('[Wizard Randox] parseRandoxTracking returned:', randoxData ? Object.keys(randoxData).length + ' dates' : 'null');

    if (randoxData) {
      // Multi-date PDF: expand into one entry per date
      var dates = Object.keys(randoxData).sort();
      for (var dd = 0; dd < dates.length; dd++) {
        console.log('[Wizard Randox] Date ' + dates[dd] + ': ' + randoxData[dates[dd]].length + ' results');
      }
      // Update current entry with the first date
      entry.results = randoxData[dates[0]];
      entry.date = dates[0];
      entry.prov = 'Randox';
      entry.status = 'done';
      entry.rawText = text;

      // Insert additional entries for remaining dates
      for (var d = 1; d < dates.length; d++) {
        wizardFiles.splice(idx + d, 0, {
          file: { name: entry.file.name + ' (' + dates[d] + ')', size: entry.file.size },
          type: entry.type,
          results: randoxData[dates[d]],
          date: dates[d],
          prov: 'Randox',
          status: 'done',
          rawText: text
        });
      }
      wizardProcessNext(idx + dates.length);
    } else {
      // Normal single-date format
      entry.results = parseLabText(text);
      entry.rawText = text;
      // Auto-detect date from text if filename didn't provide one
      if (!entry.date) {
        entry.date = wizardExtractDateFromText(text);
      }
      entry.status = 'done';
      wizardProcessNext(idx + 1);
    }
  }).catch(function(err) {
    entry.status = 'error';
    entry.errorMsg = err.message;
    wizardProcessNext(idx + 1);
  });
}

function wizardRenderReview(body) {
  var html = '';
  html += '<h2 style="text-align:center;margin-bottom:4px">Review Extracted Results</h2>';

  if (wizardProcessing) {
    html += '<p style="text-align:center;color:var(--muted);font-size:.85rem;margin-bottom:20px">Processing your files...</p>';
  } else {
    var totalResults = 0;
    for (var k = 0; k < wizardFiles.length; k++) totalResults += wizardFiles[k].results.length;
    html += '<p style="text-align:center;color:var(--muted);font-size:.85rem;margin-bottom:20px">Found ' + totalResults + ' results across ' + wizardFiles.length + ' file' + (wizardFiles.length > 1 ? 's' : '') + '. Set the date and provider for each file, then import.</p>';
  }

  // Per-file sections
  for (var i = 0; i < wizardFiles.length; i++) {
    var f = wizardFiles[i];
    var icon = f.type === 'pdf' ? '&#x1F4C4;' : '&#x1F5BC;';
    var statusIcon = '';
    var statusColor = 'var(--muted)';
    if (f.status === 'processing') { statusIcon = '&#x23F3;'; statusColor = 'var(--yellow)'; }
    else if (f.status === 'done') { statusIcon = '&#x2713;'; statusColor = 'var(--green)'; }
    else if (f.status === 'error') { statusIcon = '&#x2717;'; statusColor = 'var(--red)'; }
    else { statusIcon = '&#x2022;'; }

    html += '<div class="wz-file-section">';
    html += '<div class="wz-file-header" onclick="wizardToggleFile(' + i + ')">';
    html += '<span style="font-size:1rem">' + icon + '</span>';
    html += '<span style="flex:1;font-weight:600;font-size:.85rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escHtml(f.file.name) + '</span>';

    if (f.status === 'processing') {
      html += '<span id="wz-file-status-' + i + '" style="font-size:.75rem;color:' + statusColor + '">Processing...</span>';
    } else if (f.status === 'done') {
      html += '<span style="font-size:.75rem;color:' + statusColor + '">' + f.results.length + ' results</span>';
    } else if (f.status === 'error') {
      html += '<span style="font-size:.75rem;color:' + statusColor + '">Error: ' + escHtml(f.errorMsg || 'failed') + '</span>';
    }

    html += '<span style="color:' + statusColor + ';font-size:.9rem">' + statusIcon + '</span>';
    html += '<span class="wz-chevron" id="wz-chevron-' + i + '" style="font-size:.75rem;color:var(--muted)">&#x25BC;</span>';
    html += '</div>';

    // Collapsible detail (only show if done and has results)
    var detailDisplay = (!wizardProcessing && f.status === 'done' && f.results.length > 0) ? 'block' : 'none';
    html += '<div class="wz-file-detail" id="wz-detail-' + i + '" style="display:' + detailDisplay + '">';

    if (f.status === 'done' && f.results.length > 0) {
      // Date + Provider row
      html += '<div style="display:flex;gap:10px;align-items:center;margin:10px 0;flex-wrap:wrap">';
      html += '<label style="font-size:.8rem;color:var(--muted)">Date:</label>';
      html += '<input type="date" class="wz-date" data-idx="' + i + '" value="' + f.date + '" onchange="wizardFiles[' + i + '].date=this.value" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:.8rem">';
      html += '<label style="font-size:.8rem;color:var(--muted)">Provider:</label>';
      html += '<input type="text" class="wz-prov" data-idx="' + i + '" value="' + escHtml(f.prov) + '" placeholder="e.g. Randox" onchange="wizardFiles[' + i + '].prov=this.value.trim()" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:.8rem;width:110px">';
      html += '</div>';

      // Results table
      html += '<table style="width:100%;border-collapse:collapse;font-size:.78rem">';
      html += '<thead><tr>';
      html += '<th style="padding:5px 4px;text-align:center;border-bottom:1px solid var(--border);width:30px"><input type="checkbox" checked onchange="wizardToggleAll(' + i + ',this.checked)"></th>';
      html += '<th style="padding:5px 4px;text-align:left;border-bottom:1px solid var(--border)">Name</th>';
      html += '<th style="padding:5px 4px;text-align:right;border-bottom:1px solid var(--border);width:70px">Value</th>';
      html += '<th style="padding:5px 4px;text-align:left;border-bottom:1px solid var(--border);width:60px">Unit</th>';
      html += '<th style="padding:5px 4px;text-align:left;border-bottom:1px solid var(--border)">Match</th>';
      html += '<th style="padding:5px 4px;text-align:center;border-bottom:1px solid var(--border);width:24px"></th>';
      html += '</tr></thead><tbody>';

      for (var r = 0; r < f.results.length; r++) {
        var res = f.results[r];
        var conf = res.confidence;
        var dotColor = conf === 'high' ? 'var(--green)' : conf === 'medium' ? 'var(--yellow)' : 'var(--muted)';
        var checked = conf === 'high' || conf === 'medium';

        html += '<tr class="wz-result-row" data-file="' + i + '" data-row="' + r + '" style="opacity:' + (checked ? '1' : '0.4') + '">';
        html += '<td style="padding:4px;text-align:center;border-bottom:1px solid var(--border)">';
        html += '<input type="checkbox" class="wz-check" data-file="' + i + '" data-row="' + r + '" ' + (checked ? 'checked' : '') + ' onchange="this.closest(\'tr\').style.opacity=this.checked?\'1\':\'0.4\'"></td>';
        html += '<td style="padding:4px;border-bottom:1px solid var(--border)">' + escHtml(res.name) + '</td>';
        html += '<td style="padding:4px;text-align:right;border-bottom:1px solid var(--border)">' + res.value + '</td>';
        html += '<td style="padding:4px;border-bottom:1px solid var(--border);color:var(--muted)">' + escHtml(res.unit) + '</td>';
        html += '<td style="padding:4px;border-bottom:1px solid var(--border);color:' + (res.matchedTo ? 'var(--text)' : 'var(--muted)') + ';font-size:.75rem">';
        html += res.matchedTo ? escHtml(res.matchedTo) : '<em>-</em>';
        html += '</td>';
        html += '<td style="padding:4px;text-align:center;border-bottom:1px solid var(--border)">';
        html += '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:' + dotColor + '" title="' + conf + '"></span></td>';
        html += '</tr>';
      }
      html += '</tbody></table>';
    }
    html += '</div>';
    html += '</div>';
  }

  // Action buttons
  html += '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">';
  html += '<button class="btn btn-s" onclick="wizardStep=1;wizardRenderStep()" style="margin:0">Back</button>';
  if (!wizardProcessing) {
    html += '<button class="btn btn-p" onclick="wizardImportAll()" style="margin:0">Import All Results</button>';
  }
  html += '</div>';

  body.innerHTML = html;
}

function wizardToggleFile(idx) {
  var detail = document.getElementById('wz-detail-' + idx);
  if (!detail) return;
  detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
}

function wizardToggleAll(fileIdx, checked) {
  var boxes = document.querySelectorAll('.wz-check[data-file="' + fileIdx + '"]');
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = checked;
    boxes[i].closest('tr').style.opacity = checked ? '1' : '0.4';
  }
}

// ────────────────────────────────────────────────────────────────
// 6. Import All
// ────────────────────────────────────────────────────────────────

function wizardImportAll() {
  var totalAdded = 0;
  var datesUsed = {};

  for (var i = 0; i < wizardFiles.length; i++) {
    var f = wizardFiles[i];
    if (f.status !== 'done' || f.results.length === 0) continue;

    var d = f.date;
    if (!d) {
      // Default to today if no date set
      var today = new Date();
      d = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }
    var prov = f.prov || 'Import';

    // Register provider + date
    if (!D.dateSources) D.dateSources = {};
    if (!D.providerColors) D.providerColors = {};
    if (!D.categories) D.categories = {};
    if (!D.dateSources[d]) D.dateSources[d] = prov;
    if (!D.providerColors[prov]) D.providerColors[prov] = wizardProvColor(prov);

    // Check which results are checked
    var checks = document.querySelectorAll('.wz-check[data-file="' + i + '"]');

    for (var r = 0; r < f.results.length; r++) {
      // If checkbox exists and unchecked, skip
      if (checks[r] && !checks[r].checked) continue;

      var res = f.results[r];
      var canonical = res.matchedTo || matchBiomarker(res.name) || res.name;

      // Place marker in correct category (using registry for empty dashboards)
      var placement = ensureMarkerInD(canonical, res.unit || '');
      D.categories[placement.category][placement.name].v[d] = res.value;

      totalAdded++;
    }
    datesUsed[d] = 1;
  }

  if (totalAdded === 0) {
    alert('No results to import. Make sure files have dates set and results are checked.');
    return;
  }

  // Render dashboard
  if (typeof render === 'function') render();
  if (typeof scheduleSave === 'function') scheduleSave();

  // Move to done step
  wizardStep = 3;
  wizardTotalImported = totalAdded;
  wizardDatesImported = Object.keys(datesUsed).length;
  wizardRenderStep();
}

var wizardTotalImported = 0;
var wizardDatesImported = 0;

function wizardProvColor(prov) {
  var colors = ['#3b82f6', '#22c55e', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#f97316', '#14b8a6'];
  var existingCount = Object.keys(D.providerColors || {}).length;
  return colors[existingCount % colors.length];
}

// ────────────────────────────────────────────────────────────────
// 7. Step 3: Done
// ────────────────────────────────────────────────────────────────

function wizardRenderDone(body) {
  var html = '';
  html += '<div style="text-align:center;padding:40px 0">';
  html += '<div style="font-size:3rem;margin-bottom:12px">&#x2705;</div>';
  html += '<h2 style="margin-bottom:8px">Import Complete</h2>';
  html += '<p style="color:var(--muted);font-size:.9rem;margin-bottom:24px">Imported ' + wizardTotalImported + ' result' + (wizardTotalImported !== 1 ? 's' : '') + ' across ' + wizardDatesImported + ' test date' + (wizardDatesImported !== 1 ? 's' : '') + '.</p>';
  html += '<button class="btn btn-p" onclick="closeWizard()" style="padding:10px 32px;font-size:.9rem">View Dashboard</button>';
  html += '</div>';
  body.innerHTML = html;
}

// ────────────────────────────────────────────────────────────────
// 8. Check if dashboard is empty → auto-show wizard
// ────────────────────────────────────────────────────────────────

function wizardCheckEmpty() {
  if (!D || !D.categories) return true;
  for (var cat in D.categories) {
    for (var mk in D.categories[cat]) {
      if (D.categories[cat][mk].v && Object.keys(D.categories[cat][mk].v).length > 0) {
        return false;
      }
    }
  }
  return true;
}
