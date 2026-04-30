(function () {
  const API_BASE = "http://localhost:5000/api";
  const STORAGE_KEY = "merchantProfile";
  const DEMO_MERCHANT_ID = "DEMO-ASHA-001";
  const ROUTES = {
    Dashboard: "../merchant_dashboard/code.html",
    Inventory: "../inventory_management/code.html",
    Products: "../products_list/code.html",
    Orders: "../orders_management/code.html",
    Customers: "../profile_settings/code.html",
    Transactions: "../notifications/code.html",
    Reports: "../states_errors/code.html",
    Earnings: "../earnings_payouts/code.html",
    "KYC Documents": "../approval_status/code.html",
    Settings: "../settings/code.html",
    "Help Center": "#"
  };

  const PRODUCT_IMAGES = {
    "Buffalo Milk": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80",
    "Cow Milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
    "Normal Milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
    "Mixed Milk": "https://images.unsplash.com/photo-1517448931760-9bf4414148c5?auto=format&fit=crop&w=900&q=80",
    Paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
    Curd: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=900&q=80",
    Ghee: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80",
    neutral: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=80"
  };

  function safeJsonParse(value) {
    try {
      return value ? JSON.parse(value) : null;
    } catch (_error) {
      return null;
    }
  }

  function getStoredMerchantProfile() {
    return safeJsonParse(localStorage.getItem(STORAGE_KEY));
  }

  function saveMerchantProfile(profile) {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }

  async function fetchJson(path, options) {
    const response = await fetch(`${API_BASE}${path}`, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  }

  async function getMerchantProfile(forceRefresh) {
    if (!forceRefresh) {
      const cached = getStoredMerchantProfile();
      if (cached && cached.merchantId) {
        return cached;
      }
    }

    try {
      const demoMerchant = await fetchJson(`/onboarding/${DEMO_MERCHANT_ID}`);
      if (demoMerchant) {
        saveMerchantProfile(demoMerchant);
        return demoMerchant;
      }
    } catch (_error) {
      // Fall back to the latest merchant when the seeded demo merchant is unavailable.
    }

    const latest = await fetchJson("/onboarding/latest");
    if (latest?.merchantId) {
      saveMerchantProfile(latest);
    }
    return latest;
  }

  async function getKycRecord(merchantId) {
    if (!merchantId) {
      return null;
    }

    try {
      return await fetchJson(`/kyc/${merchantId}`);
    } catch (_error) {
      return null;
    }
  }

  function getKycStatusLabel(status) {
    if (status === "verified") {
      return "KYC Verified";
    }
    if (status === "under_review") {
      return "KYC Under Review";
    }
    return "KYC Pending";
  }

  function getProductImage(productType) {
    return PRODUCT_IMAGES[productType] || PRODUCT_IMAGES.neutral;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(amount) || 0);
  }

  function formatDate(dateValue, options) {
    if (!dateValue) {
      return "--";
    }

    return new Date(dateValue).toLocaleDateString("en-IN", options || {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function buildEmptyState(title, copy, icon) {
    return `
      <div class="app-empty-state">
        <span class="material-symbols-outlined app-empty-state__icon">${icon || "inbox"}</span>
        <p class="app-empty-state__title">${title}</p>
        <p class="app-empty-state__copy">${copy}</p>
      </div>
    `;
  }

  function disableInactiveHeaderButtons() {
    document.querySelectorAll("button, a").forEach((element) => {
      const icon = element.querySelector(".material-symbols-outlined");
      const iconText = icon ? icon.textContent.trim() : "";
      if (iconText === "notifications" || iconText === "history") {
        element.classList.add("hidden");
      }
    });
  }

  function hideDeadLinks() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
      link.classList.add("hidden");
    });
  }

  function wireRoutes() {
    document.querySelectorAll("aside a, nav a").forEach((link) => {
      const label = link.textContent.replace(/\s+/g, " ").trim();
      const target = ROUTES[label];
      if (target) {
        link.setAttribute("href", target);
      }
      if (label === "Logout") {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          clearSession();
          window.location.href = "../merchant_onboarding/code.html";
        });
      }
    });
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  }

  async function hydrateIdentity() {
    const merchant = await getMerchantProfile();
    const kyc = merchant ? await getKycRecord(merchant.merchantId) : null;
    const merchantName = merchant?.businessName || "Merchant Name";
    const userName = merchant?.ownerName || "Merchant Name";
    const kycStatus = kyc?.status || "not_started";
    const statusLabel = getKycStatusLabel(kycStatus);

    setText("[data-merchant-name]", merchantName);
    setText("[data-user-name]", userName);
    setText("[data-user-role]", "Merchant");
    document.querySelectorAll("[data-kyc-status]").forEach((node) => {
      node.textContent = statusLabel;
      node.setAttribute("data-status", kycStatus);
    });

    return { merchant, kyc };
  }

  async function bootstrap() {
    wireRoutes();
    disableInactiveHeaderButtons();
    hideDeadLinks();
    return hydrateIdentity();
  }

  window.AppShell = {
    API_BASE,
    DEMO_MERCHANT_ID,
    bootstrap,
    buildEmptyState,
    clearSession,
    fetchJson,
    formatCurrency,
    formatDate,
    getKycRecord,
    getKycStatusLabel,
    getMerchantProfile,
    getProductImage,
    getStoredMerchantProfile,
    saveMerchantProfile
  };
})();
