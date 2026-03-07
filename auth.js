/* ================================================================
   auth.js  —  Supabase Auth & Persistence for Blood Test Dashboard
   Loaded after data.js and supabase-js CDN; before import.js
   ================================================================ */

// ── Configuration ────────────────────────────────────────────────
var SUPABASE_URL = 'https://dclfnozzliwqqtslmnzf.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbGZub3p6bGl3cXF0c2xtbnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzYzNjgsImV4cCI6MjA4ODQxMjM2OH0.Iy4WtCC5kzkZe7cNvvEjtinqdx2QA_khzvKaH_iJ0sM';

// ── State ────────────────────────────────────────────────────────
var sb = null;             // Supabase client instance
var currentUser = null;    // Currently logged-in user object
var saveTimer = null;      // Debounce timer for auto-save
var isSaving = false;      // Prevents concurrent saves
var DEMO_DATA = null;      // Snapshot of original data.js for reset

// ── 1. Initialize ────────────────────────────────────────────────
function initSupabase() {
  // Capture demo data before anything modifies it
  DEMO_DATA = JSON.parse(JSON.stringify(D));

  // Create Supabase client
  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.warn('Supabase JS not loaded — auth disabled');
    return;
  }
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Listen for auth state changes
  sb.auth.onAuthStateChange(function(event, session) {
    if (event === 'SIGNED_IN' && session) {
      currentUser = session.user;
      updateAuthUI();
      loadUserData();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      updateAuthUI();
      // Reset to demo data
      D = JSON.parse(JSON.stringify(DEMO_DATA));
      if (typeof render === 'function') render();
    }
  });

  // Check existing session on page load
  sb.auth.getSession().then(function(result) {
    var session = result.data.session;
    if (session) {
      currentUser = session.user;
      updateAuthUI();
      loadUserData();
    } else {
      updateAuthUI();
    }
  });
}

// ── 2. Sign Up ───────────────────────────────────────────────────
function authSignUp() {
  var email = document.getElementById('auth-email').value.trim();
  var password = document.getElementById('auth-password').value;
  var errorEl = document.getElementById('auth-error');
  errorEl.textContent = '';
  errorEl.style.color = 'var(--red)';

  if (!email || !password) {
    errorEl.textContent = 'Email and password are required.';
    return;
  }
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters.';
    return;
  }

  setAuthLoading(true);
  sb.auth.signUp({ email: email, password: password })
    .then(function(result) {
      setAuthLoading(false);
      if (result.error) {
        errorEl.textContent = result.error.message;
        return;
      }
      if (result.data.user && !result.data.session) {
        // Email confirmation required
        errorEl.style.color = 'var(--green)';
        errorEl.textContent = 'Check your email to confirm your account.';
      } else {
        // Auto-logged in (confirmation disabled)
        closeAuthModal();
        offerDataMigration();
      }
    });
}

// ── 3. Sign In ───────────────────────────────────────────────────
function authSignIn() {
  var email = document.getElementById('auth-email').value.trim();
  var password = document.getElementById('auth-password').value;
  var errorEl = document.getElementById('auth-error');
  errorEl.textContent = '';
  errorEl.style.color = 'var(--red)';

  if (!email || !password) {
    errorEl.textContent = 'Email and password are required.';
    return;
  }

  setAuthLoading(true);
  sb.auth.signInWithPassword({ email: email, password: password })
    .then(function(result) {
      setAuthLoading(false);
      if (result.error) {
        errorEl.textContent = result.error.message;
        return;
      }
      closeAuthModal();
    });
}

// ── 4. Sign Out ──────────────────────────────────────────────────
function authSignOut() {
  if (!sb) return;
  sb.auth.signOut().then(function() {
    if (typeof showToast === 'function') showToast('Signed out');
  });
}

// ── 5. Save User Data ────────────────────────────────────────────
function saveUserData() {
  if (!currentUser || !sb || isSaving) return;
  isSaving = true;
  updateSaveIndicator('saving');

  sb.from('user_data')
    .upsert({
      user_id: currentUser.id,
      data: D
    }, { onConflict: 'user_id' })
    .then(function(result) {
      isSaving = false;
      if (result.error) {
        console.error('Save failed:', result.error);
        updateSaveIndicator('error');
      } else {
        updateSaveIndicator('saved');
      }
      // Always cache locally as fallback
      saveToLocalStorage();
    });
}

// Debounced save — call after every data mutation
function scheduleSave() {
  if (!currentUser || !sb) return;
  if (saveTimer) clearTimeout(saveTimer);
  updateSaveIndicator('pending');
  saveTimer = setTimeout(saveUserData, 2000);
}

// ── 6. Load User Data ────────────────────────────────────────────
function loadUserData() {
  if (!currentUser || !sb) return;

  sb.from('user_data')
    .select('data')
    .eq('user_id', currentUser.id)
    .single()
    .then(function(result) {
      if (result.error) {
        if (result.error.code === 'PGRST116') {
          // No row — new user
          offerDataMigration();
          return;
        }
        console.error('Load failed:', result.error);
        loadFromLocalStorage();
        return;
      }

      if (result.data && result.data.data) {
        var loaded = result.data.data;
        if (loaded.categories && loaded.patient) {
          D = loaded;
          if (typeof render === 'function') render();
          if (typeof showToast === 'function') showToast('Data loaded');
        }
      }
    });
}

// ── 7. Data Migration (first signup) ─────────────────────────────
function offerDataMigration() {
  var currentJSON = JSON.stringify(D.categories);
  var demoJSON = JSON.stringify(DEMO_DATA.categories);

  if (currentJSON !== demoJSON) {
    // User modified data before signing up — offer to keep it
    var save = confirm(
      'You have data in the dashboard. Save it to your account?\n\n' +
      'OK = save current data\nCancel = start fresh'
    );
    if (save) {
      saveUserData();
    } else {
      D = createEmptyData();
      if (typeof render === 'function') render();
      saveUserData();
    }
  } else {
    // Demo data unchanged — start fresh
    D = createEmptyData();
    if (typeof render === 'function') render();
    saveUserData();
  }
}

function createEmptyData() {
  return {
    patient: { name: '', dob: '' },
    dateSources: {},
    providerColors: {},
    categories: {}
  };
}

// ── 8. localStorage Fallback ─────────────────────────────────────
function saveToLocalStorage() {
  try {
    localStorage.setItem('blood_dashboard_data', JSON.stringify(D));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }
}

function loadFromLocalStorage() {
  try {
    var cached = localStorage.getItem('blood_dashboard_data');
    if (cached) {
      var parsed = JSON.parse(cached);
      if (parsed.categories && parsed.patient) {
        D = parsed;
        if (typeof render === 'function') render();
      }
    }
  } catch (e) {
    console.warn('localStorage load failed:', e);
  }
}

// ── 9. Flush on page unload ──────────────────────────────────────
window.addEventListener('beforeunload', function() {
  if (currentUser && saveTimer) {
    clearTimeout(saveTimer);
    saveToLocalStorage();
  }
});

// ── 10. UI Helpers ───────────────────────────────────────────────
function updateAuthUI() {
  var loginBtn = document.getElementById('auth-login-btn');
  var userInfo = document.getElementById('auth-user-info');
  var userEmail = document.getElementById('auth-user-email');
  if (!loginBtn || !userInfo) return;

  if (currentUser) {
    loginBtn.style.display = 'none';
    userInfo.style.display = 'flex';
    userEmail.textContent = currentUser.email;
  } else {
    loginBtn.style.display = 'inline-flex';
    userInfo.style.display = 'none';
  }
}

function openAuthModal() {
  document.getElementById('auth-overlay').classList.add('open');
  document.getElementById('auth-email').focus();
  document.getElementById('auth-error').textContent = '';
}

function closeAuthModal() {
  var ov = document.getElementById('auth-overlay');
  if (ov) ov.classList.remove('open');
  var em = document.getElementById('auth-email');
  var pw = document.getElementById('auth-password');
  if (em) em.value = '';
  if (pw) pw.value = '';
}

function setAuthLoading(loading) {
  var btns = document.querySelectorAll('.auth-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].disabled = loading;
    btns[i].style.opacity = loading ? '0.6' : '1';
  }
}

function updateSaveIndicator(state) {
  var el = document.getElementById('save-indicator');
  if (!el) return;
  switch (state) {
    case 'saving':
      el.textContent = 'Saving\u2026';
      el.style.color = 'var(--yellow)';
      el.style.display = 'inline';
      break;
    case 'saved':
      el.textContent = '\u2713 Saved';
      el.style.color = 'var(--green)';
      el.style.display = 'inline';
      setTimeout(function() { el.style.display = 'none'; }, 2500);
      break;
    case 'error':
      el.textContent = 'Save failed';
      el.style.color = 'var(--red)';
      el.style.display = 'inline';
      break;
    case 'pending':
      el.textContent = 'Unsaved';
      el.style.color = 'var(--muted)';
      el.style.display = 'inline';
      break;
    default:
      el.style.display = 'none';
  }
}

// ── 11. Password Reset ──────────────────────────────────────────
function authResetPassword() {
  var email = document.getElementById('auth-email').value.trim();
  var errorEl = document.getElementById('auth-error');
  if (!email) {
    errorEl.textContent = 'Enter your email address first.';
    return;
  }
  sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  }).then(function(result) {
    if (result.error) {
      errorEl.style.color = 'var(--red)';
      errorEl.textContent = result.error.message;
    } else {
      errorEl.style.color = 'var(--green)';
      errorEl.textContent = 'Password reset email sent.';
    }
  });
}
