import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  getActiveProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProductsToDefault,
  PRESET_KAYOO_IMAGES
} from '@/services/productService';
import { MOCK_ORDERS, PROMO_CODES, REVIEWS, DEMO_USER } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  MessageSquare,
  Settings,
  TrendingUp,
  Plus,
  Search,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  Trash2,
  Edit3,
  Copy,
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function Admin() {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('products');

  // Live products inventory
  const [productList, setProductList] = useState(getActiveProducts);
  const [ordersList, setOrdersList] = useState(MOCK_ORDERS);
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [discountList, setDiscountList] = useState(PROMO_CODES);

  // Sync products when modified across tabs or storage
  useEffect(() => {
    const syncProducts = () => {
      setProductList(getActiveProducts());
    };
    window.addEventListener('kayoo:products_updated', syncProducts);
    window.addEventListener('storage', syncProducts);
    return () => {
      window.removeEventListener('kayoo:products_updated', syncProducts);
      window.removeEventListener('storage', syncProducts);
    };
  }, []);

  // Search & Filter in Table
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  // Image tab in modal ('upload', 'gallery', 'url')
  const [imageSourceTab, setImageSourceTab] = useState('upload');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Default empty creation form
  const getInitialNewProduct = () => ({
    name: '',
    sku: `KY-TEE-${Math.floor(100 + Math.random() * 900)}`,
    category: 'tops',
    gender: 'unisex',
    price: '',
    compareAtPrice: '',
    stock: 24,
    badge: 'NEW DROP',
    summary: 'Heavyweight street silhouette with 320GSM custom combed cotton.',
    description: 'Engineered with dropped shoulder seams, structured collar ribbing, and hand-pulled silkscreen graphic art by KAYOO Studio Phnom Penh.',
    materials: '100% Dense Combed Cotton (320 GSM). Pre-shrunk bio-wash.',
    care: 'Machine wash cold inside out with like colors. Hang dry in shade. Do not iron directly on silkscreen print.',
    images: ['/products/kayoo-tee-duo.jpeg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colorName: 'Obsidian Black',
    colorHex: '#161618'
  });

  const [newProduct, setNewProduct] = useState(getInitialNewProduct);
  const [editFormData, setEditFormData] = useState(getInitialNewProduct);

  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(productSearch.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Handle local file upload (converts to base64 DataURL for instant zero-server persistence)
  const handleFileUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      addToast('Image size exceeds 8MB. Please select a smaller photo.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (isEdit) {
        setEditFormData((prev) => ({
          ...prev,
          images: [dataUrl, ...prev.images]
        }));
      } else {
        setNewProduct((prev) => ({
          ...prev,
          images: [dataUrl, ...prev.images]
        }));
      }
      addToast('Product photo uploaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Add custom URL
  const handleAddCustomUrl = (isEdit = false) => {
    if (!customImageUrl.trim()) return;
    if (isEdit) {
      setEditFormData((prev) => ({
        ...prev,
        images: [...prev.images, customImageUrl.trim()]
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, customImageUrl.trim()]
      }));
    }
    setCustomImageUrl('');
    addToast('Image URL added to gallery', 'success');
  };

  // Toggle or add preset image from library
  const handleSelectPreset = (imagePath, isEdit = false) => {
    if (isEdit) {
      setEditFormData((prev) => {
        const exists = prev.images.includes(imagePath);
        if (exists) {
          if (prev.images.length === 1) return prev; // keep at least 1
          return { ...prev, images: prev.images.filter((img) => img !== imagePath) };
        }
        return { ...prev, images: [imagePath, ...prev.images] };
      });
    } else {
      setNewProduct((prev) => {
        const exists = prev.images.includes(imagePath);
        if (exists) {
          if (prev.images.length === 1) return prev;
          return { ...prev, images: prev.images.filter((img) => img !== imagePath) };
        }
        return { ...prev, images: [imagePath, ...prev.images] };
      });
    }
  };

  // Remove image
  const handleRemoveImage = (index, isEdit = false) => {
    if (isEdit) {
      setEditFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  // Publish new creation
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      addToast('Please enter a product title.', 'error');
      return;
    }
    if (!newProduct.price || Number(newProduct.price) <= 0) {
      addToast('Please specify a valid retail price.', 'error');
      return;
    }

    const imagesToUse = newProduct.images.length > 0 ? newProduct.images : ['/products/kayoo-tee-duo.jpeg'];

    const payload = {
      name: newProduct.name.trim(),
      sku: newProduct.sku.trim(),
      category: newProduct.category,
      gender: newProduct.gender,
      price: Number(newProduct.price),
      compareAtPrice: newProduct.compareAtPrice ? Number(newProduct.compareAtPrice) : null,
      stock: Number(newProduct.stock) || 20,
      badge: newProduct.badge,
      summary: newProduct.summary,
      description: newProduct.description,
      materials: newProduct.materials,
      care: newProduct.care,
      images: imagesToUse,
      colors: [{ name: newProduct.colorName || 'Obsidian Black', hex: newProduct.colorHex || '#161618' }],
      sizes: newProduct.sizes.map((s) => ({
        size: s,
        stock: Math.ceil((Number(newProduct.stock) || 20) / (newProduct.sizes.length || 1))
      }))
    };

    const created = await addProduct(payload);
    setProductList(getActiveProducts());
    setShowAddProductModal(false);
    setNewProduct(getInitialNewProduct());
    addToast(`"${created.name}" published to live store!`, 'success');
  };

  // Open Edit Modal
  const handleOpenEdit = (product) => {
    setEditingProductId(product.id);
    setEditFormData({
      id: product.id,
      name: product.name,
      sku: product.sku || '',
      category: product.category || 'tops',
      gender: product.gender || 'unisex',
      price: product.price,
      compareAtPrice: product.compareAtPrice || '',
      stock: product.stock,
      badge: product.badge || 'NEW DROP',
      summary: product.summary || '',
      description: product.description || '',
      materials: product.materials || '',
      care: product.care || '',
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : ['/products/kayoo-tee-duo.jpeg'],
      sizes: Array.isArray(product.sizes) ? product.sizes.map((s) => s.size) : ['S', 'M', 'L', 'XL'],
      colorName: product.colors?.[0]?.name || 'Obsidian Black',
      colorHex: product.colors?.[0]?.hex || '#161618'
    });
    setShowEditProductModal(true);
  };

  // Save edited product
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editFormData.name.trim() || !editFormData.price) return;

    const payload = {
      name: editFormData.name.trim(),
      sku: editFormData.sku.trim(),
      category: editFormData.category,
      gender: editFormData.gender,
      price: Number(editFormData.price),
      compareAtPrice: editFormData.compareAtPrice ? Number(editFormData.compareAtPrice) : null,
      isSale: Boolean(editFormData.compareAtPrice && Number(editFormData.compareAtPrice) > Number(editFormData.price)),
      stock: Number(editFormData.stock) || 20,
      badge: editFormData.badge,
      summary: editFormData.summary,
      description: editFormData.description,
      materials: editFormData.materials,
      care: editFormData.care,
      images: editFormData.images.length > 0 ? editFormData.images : ['/products/kayoo-tee-duo.jpeg'],
      colors: [{ name: editFormData.colorName, hex: editFormData.colorHex }],
      sizes: editFormData.sizes.map((s) => ({
        size: s,
        stock: Math.ceil((Number(editFormData.stock) || 20) / (editFormData.sizes.length || 1))
      }))
    };

    await updateProduct(editingProductId, payload);
    setProductList(getActiveProducts());
    setShowEditProductModal(false);
    addToast(`"${payload.name}" updated successfully.`, 'success');
  };

  // Duplicate product
  const handleDuplicateProduct = async (product) => {
    const payload = {
      ...product,
      id: undefined,
      sku: `KY-COPY-${Math.floor(100 + Math.random() * 900)}`,
      name: `${product.name} (Copy)`
    };
    const created = await addProduct(payload);
    setProductList(getActiveProducts());
    addToast(`Created duplicate "${created.name}".`, 'info');
  };

  // Delete product
  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      await deleteProduct(id);
      setProductList(getActiveProducts());
      addToast(`"${name}" removed from active inventory.`, 'info');
    }
  };

  // Reset to default factory products
  const handleResetCatalog = async () => {
    await resetProductsToDefault();
    setProductList(getActiveProducts());
    setShowResetConfirmModal(false);
    addToast('Factory catalog restored successfully.', 'success');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Order ${orderId} updated to "${newStatus}".`, 'success');
  };

  return (
    <div style={{ backgroundColor: '#0F0F12', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Header Bar */}
      <header
        style={{
          borderBottom: '1px solid #23232A',
          backgroundColor: '#16161B',
          padding: '14px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-xs)',
              backgroundColor: '#A855F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 900,
              fontSize: '1.1rem'
            }}
          >
            ★
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.06em', fontFamily: 'var(--font-display)' }}>
              KAYOO STUDIO COMMAND CENTER
            </div>
            <div style={{ fontSize: '0.72rem', color: '#908E88' }}>
              Phnom Penh Headquarters • Production & Live Inventory Portal
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="badge badge-gold" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', borderColor: '#A855F7', color: '#D8B4FE' }}>
            SYSTEM ONLINE • LIVE
          </span>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: '#FFFFFF',
              color: '#000',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.04em'
            }}
          >
            STOREFRONT VIEW <ExternalLink size={14} />
          </Link>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar Nav */}
        <aside
          style={{
            width: '260px',
            borderRight: '1px solid #23232A',
            backgroundColor: '#121216',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
          className="admin-sidebar"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { id: 'products', label: `Creations (${productList.length})`, icon: Package },
              { id: 'overview', label: 'Analytics Overview', icon: LayoutDashboard },
              { id: 'orders', label: `Orders (${ordersList.length})`, icon: ShoppingBag },
              { id: 'customers', label: 'Collectors (3,890)', icon: Users },
              { id: 'discounts', label: `Vouchers (${discountList.length})`, icon: Tag },
              { id: 'reviews', label: `Reviews (${reviewsList.length})`, icon: MessageSquare },
              { id: 'settings', label: 'Studio Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                    color: isActive ? '#E9D5FF' : '#A2A09B',
                    border: isActive ? '1px solid #A855F7' : '1px solid transparent',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.86rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? '#C084FC' : '#8E8A82'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => setShowResetConfirmModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 12px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#FCA5A5',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <RotateCcw size={14} /> Restore Default Catalog
            </button>

            <div style={{ padding: '16px', backgroundColor: '#1A1A22', borderRadius: 'var(--radius-sm)', border: '1px solid #282834', fontSize: '0.75rem', color: '#908E88' }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>Live Production System</div>
              Products you insert are permanently saved and instantly live across the storefront.
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <main style={{ flex: 1, padding: '36px', overflowY: 'auto' }}>
          {/* TAB 1: PRODUCTS MANAGER (Default) */}
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <h2 style={{ color: '#FFF', fontSize: '1.8rem', margin: 0 }}>Creations Inventory</h2>
                  <p style={{ color: '#8E8A82', fontSize: '0.85rem', marginTop: 4 }}>
                    Manage pricing, inventory, upload photos, and insert new garment drops.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#16161B',
                      border: '1px solid #282834',
                      borderRadius: 'var(--radius-pill)',
                      color: '#FFF',
                      fontSize: '0.82rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Categories</option>
                    <option value="tops">Tops & Tees</option>
                    <option value="hoodies">Hoodies & Sweats</option>
                    <option value="trousers">Pants & Joggers</option>
                    <option value="accessories">Accessories</option>
                  </select>

                  {/* Search box */}
                  <div style={{ position: 'relative', width: '220px' }}>
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search name or SKU..."
                      style={{
                        width: '100%',
                        padding: '8px 14px 8px 34px',
                        backgroundColor: '#16161B',
                        border: '1px solid #282834',
                        borderRadius: 'var(--radius-pill)',
                        color: '#FFF',
                        fontSize: '0.82rem',
                        outline: 'none'
                      }}
                    />
                    <Search size={14} color="#8E8A82" style={{ position: 'absolute', left: 12, top: 10 }} />
                  </div>

                  {/* Primary Add Creation Button */}
                  <button
                    onClick={() => {
                      setNewProduct(getInitialNewProduct());
                      setShowAddProductModal(true);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{
                      backgroundColor: '#A855F7',
                      color: '#000',
                      border: 'none',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Plus size={16} /> + ADD CREATION
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div style={{ backgroundColor: '#16161B', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #282834', color: '#8E8A82', textAlign: 'left', backgroundColor: '#121216' }}>
                      <th style={{ padding: '14px 16px' }}>Creation & Image</th>
                      <th style={{ padding: '14px 16px' }}>SKU</th>
                      <th style={{ padding: '14px 16px' }}>Category</th>
                      <th style={{ padding: '14px 16px' }}>Division</th>
                      <th style={{ padding: '14px 16px' }}>Price</th>
                      <th style={{ padding: '14px 16px' }}>Stock</th>
                      <th style={{ padding: '14px 16px' }}>Status</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #1E1E26' }}>
                        <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ position: 'relative', width: 44, height: 56, flexShrink: 0, borderRadius: 4, overflow: 'hidden', backgroundColor: '#000', border: '1px solid #333' }}>
                            <img
                              src={p.images?.[0] || '/products/kayoo-tee-duo.jpeg'}
                              alt=""
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {p.images?.length > 1 && (
                              <span style={{ position: 'absolute', bottom: 2, right: 2, backgroundColor: 'rgba(0,0,0,0.7)', color: '#FFF', fontSize: '0.6rem', padding: '1px 3px', borderRadius: 2 }}>
                                +{p.images.length - 1}
                              </span>
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#FFF' }}>{p.name}</div>
                            {p.badge && (
                              <span className="badge badge-gold" style={{ fontSize: '0.62rem', padding: '1px 6px', marginTop: 4 }}>
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#A855F7' }}>{p.sku}</td>
                        <td style={{ padding: '12px 16px', textTransform: 'capitalize', color: '#D0CEC8' }}>{p.category}</td>
                        <td style={{ padding: '12px 16px', textTransform: 'capitalize', color: '#D0CEC8' }}>{p.gender}</td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: '#FFF' }}>
                          ${p.price}
                          {p.compareAtPrice && (
                            <span style={{ color: '#888', textDecoration: 'line-through', fontSize: '0.75rem', marginLeft: 6 }}>
                              ${p.compareAtPrice}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ color: p.stock <= 5 ? '#F87171' : '#4ADE80', fontWeight: 600 }}>
                            {p.stock} units
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>ACTIVE</span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
                            <Link
                              to={`/product/${p.id}`}
                              target="_blank"
                              title="Preview on Storefront"
                              style={{ color: '#9CA3AF', padding: '4px' }}
                            >
                              <Eye size={15} />
                            </Link>
                            <button
                              onClick={() => handleOpenEdit(p)}
                              title="Edit Creation"
                              style={{ color: '#A855F7', padding: '4px' }}
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDuplicateProduct(p)}
                              title="Duplicate Creation"
                              style={{ color: '#E5E7EB', padding: '4px' }}
                            >
                              <Copy size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              title="Delete Creation"
                              style={{ color: '#EF4444', padding: '4px' }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                  <h2 style={{ color: '#FFF', fontSize: '1.8rem', margin: 0 }}>Executive Overview</h2>
                  <p style={{ color: '#8E8A82', fontSize: '0.85rem', marginTop: 4 }}>
                    Aggregated studio performance across Phnom Penh, Siem Reap, and international syndicate collectors.
                  </p>
                </div>
                <span className="badge badge-gold">Q1 2026 METRICS</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 36 }}>
                <div style={{ backgroundColor: '#16161B', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A' }}>
                  <div style={{ fontSize: '0.78rem', color: '#8E8A82', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Total Gross Revenue
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>$148,920</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#4ADE80', marginTop: 6 }}>
                    <TrendingUp size={14} /> +18.4% vs last quarter
                  </div>
                </div>

                <div style={{ backgroundColor: '#16161B', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A' }}>
                  <div style={{ fontSize: '0.78rem', color: '#8E8A82', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Live Products Active
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>{productList.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#A855F7', marginTop: 6 }}>
                    Across 5 Streetwear categories
                  </div>
                </div>

                <div style={{ backgroundColor: '#16161B', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A' }}>
                  <div style={{ fontSize: '0.78rem', color: '#8E8A82', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Active KAYOO Patrons
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>3,890</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--accent-gold)', marginTop: 6 }}>
                    ★ 64% Syndicate Retention
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ color: '#FFF', fontSize: '1.8rem', marginBottom: 20 }}>Order Fulfillment Directory</h2>
              <div style={{ backgroundColor: '#16161B', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A', padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #282834', color: '#8E8A82', textAlign: 'left' }}>
                      <th style={{ padding: '12px 14px' }}>Order #</th>
                      <th style={{ padding: '12px 14px' }}>Customer</th>
                      <th style={{ padding: '12px 14px' }}>Destination</th>
                      <th style={{ padding: '12px 14px' }}>Items</th>
                      <th style={{ padding: '12px 14px' }}>Payment</th>
                      <th style={{ padding: '12px 14px' }}>Total</th>
                      <th style={{ padding: '12px 14px' }}>Status Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersList.map((ord) => (
                      <tr key={ord.id} style={{ borderBottom: '1px solid #202028' }}>
                        <td style={{ padding: '14px', fontWeight: 700, color: '#FFF' }}>{ord.orderNumber}</td>
                        <td style={{ padding: '14px', color: '#D0CEC8' }}>{ord.shippingAddress?.fullName}</td>
                        <td style={{ padding: '14px', color: '#8E8A82' }}>{ord.shippingAddress?.city}, {ord.shippingAddress?.country}</td>
                        <td style={{ padding: '14px' }}>{ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</td>
                        <td style={{ padding: '14px', color: '#A09D96' }}>{ord.paymentMethod}</td>
                        <td style={{ padding: '14px', fontWeight: 700, color: '#FFF' }}>${ord.total} USD</td>
                        <td style={{ padding: '14px' }}>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            style={{
                              backgroundColor: '#202028',
                              color: '#FFF',
                              border: '1px solid #363644',
                              borderRadius: 'var(--radius-xs)',
                              padding: '6px 10px',
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div>
              <h2 style={{ color: '#FFF', fontSize: '1.8rem', marginBottom: 20 }}>KAYOO Collector Register</h2>
              <div style={{ backgroundColor: '#16161B', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A', padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #282834', color: '#8E8A82', textAlign: 'left' }}>
                      <th style={{ padding: '12px 14px' }}>Patron</th>
                      <th style={{ padding: '12px 14px' }}>Email</th>
                      <th style={{ padding: '12px 14px' }}>VIP Tier</th>
                      <th style={{ padding: '12px 14px' }}>Total Spend</th>
                      <th style={{ padding: '12px 14px' }}>Orders</th>
                      <th style={{ padding: '12px 14px' }}>Collector Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #202028' }}>
                      <td style={{ padding: '14px', fontWeight: 700, color: '#FFF' }}>{DEMO_USER.name}</td>
                      <td style={{ padding: '14px', color: '#A09D96' }}>{DEMO_USER.email}</td>
                      <td style={{ padding: '14px' }}><span className="badge badge-gold">TIER II</span></td>
                      <td style={{ padding: '14px', fontWeight: 700, color: '#FFF' }}>$3,480 USD</td>
                      <td style={{ padding: '14px' }}>6 Orders</td>
                      <td style={{ padding: '14px', color: '#8E8A82' }}>2024</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #202028' }}>
                      <td style={{ padding: '14px', fontWeight: 700, color: '#FFF' }}>Julian Thorne</td>
                      <td style={{ padding: '14px', color: '#A09D96' }}>j.thorne@kayoo.com</td>
                      <td style={{ padding: '14px' }}><span className="badge badge-gold">TIER III</span></td>
                      <td style={{ padding: '14px', fontWeight: 700, color: '#FFF' }}>$8,920 USD</td>
                      <td style={{ padding: '14px' }}>14 Orders</td>
                      <td style={{ padding: '14px', color: '#8E8A82' }}>2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: DISCOUNTS */}
          {activeTab === 'discounts' && (
            <div>
              <h2 style={{ color: '#FFF', fontSize: '1.8rem', marginBottom: 20 }}>Promotions & Vouchers</h2>
              <div style={{ backgroundColor: '#16161B', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A', padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #282834', color: '#8E8A82', textAlign: 'left' }}>
                      <th style={{ padding: '12px 14px' }}>Code</th>
                      <th style={{ padding: '12px 14px' }}>Discount</th>
                      <th style={{ padding: '12px 14px' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discountList.map((d, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #202028' }}>
                        <td style={{ padding: '14px', fontWeight: 800, color: '#A855F7', fontFamily: 'monospace' }}>{d.code}</td>
                        <td style={{ padding: '14px', fontWeight: 700, color: '#FFF' }}>{d.discountPercent ? `${d.discountPercent}% OFF` : 'FREE SHIPPING'}</td>
                        <td style={{ padding: '14px', color: '#A09D96' }}>{d.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '640px' }}>
              <h2 style={{ color: '#FFF', fontSize: '1.8rem', marginBottom: 24 }}>Storefront Configurations</h2>
              <div style={{ backgroundColor: '#16161B', borderRadius: 'var(--radius-sm)', border: '1px solid #23232A', padding: '28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label className="form-label" style={{ color: '#A09D96' }}>KAYOO Trading Currency</label>
                  <input type="text" defaultValue="USD ($)" className="form-input" style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }} />
                </div>
                <div>
                  <label className="form-label" style={{ color: '#A09D96' }}>Complimentary Courier Threshold ($)</label>
                  <input type="number" defaultValue="50" className="form-input" style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }} />
                </div>
                <div>
                  <label className="form-label" style={{ color: '#A09D96' }}>Primary Fulfillment Hub</label>
                  <input type="text" defaultValue="KAYOO Phnom Penh Studio Logistics (Street 308 Chamkarmon)" className="form-input" style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }} />
                </div>
                <button
                  type="button"
                  onClick={() => addToast('Store settings updated.', 'success')}
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start', backgroundColor: '#A855F7', color: '#000', border: 'none', fontWeight: 700 }}
                >
                  Save Store Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          ADD CREATION MODAL (SUPER POWERED WITH PHOTO UPLOAD & ARCHIVE PICKER)
          ========================================================================= */}
      {showAddProductModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowAddProductModal(false)} />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '94%',
              maxWidth: '960px',
              maxHeight: '92vh',
              overflowY: 'auto',
              backgroundColor: '#16161B',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 1400,
              padding: '32px',
              color: '#FFF',
              border: '1px solid #2E2E38',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid #262630', paddingBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, color: '#FFF', fontSize: '1.4rem' }}>Insert New KAYOO Creation</h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#908E88' }}>
                  Upload photos, set pricing, and publish directly to the live website.
                </p>
              </div>
              <button onClick={() => setShowAddProductModal(false)} style={{ color: '#FFF', padding: 6, backgroundColor: '#222', borderRadius: '50%' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32 }} className="admin-modal-grid">
                {/* LEFT: FORM INPUTS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Title & SKU */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Creation Title *</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. KAYOO Acid-Wash Vintage Skater Hoodie"
                        className="form-input"
                        style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>SKU Code</label>
                      <input
                        type="text"
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                        className="form-input"
                        style={{ backgroundColor: '#101014', color: '#A855F7', borderColor: '#333', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>

                  {/* Category & Gender */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="form-select"
                        style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                      >
                        <option value="tops">Tops & Shirts</option>
                        <option value="hoodies">Hoodies & Sweats</option>
                        <option value="trousers">Pants & Trousers</option>
                        <option value="outerwear">Jackets & Outerwear</option>
                        <option value="accessories">Accessories & Caps</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Gender / Division</label>
                      <select
                        value={newProduct.gender}
                        onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })}
                        className="form-select"
                        style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                      >
                        <option value="unisex">Unisex</option>
                        <option value="men">Men's Fit</option>
                        <option value="women">Women's Fit</option>
                      </select>
                    </div>
                  </div>

                  {/* Pricing & Stock */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Price (USD) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="28"
                        className="form-input"
                        style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Compare Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newProduct.compareAtPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, compareAtPrice: e.target.value })}
                        placeholder="38 (Optional)"
                        className="form-input"
                        style={{ backgroundColor: '#101014', color: '#888', borderColor: '#333' }}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Initial Stock</label>
                      <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="form-input"
                        style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Badge & Color */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Promotional Badge</label>
                      <select
                        value={newProduct.badge}
                        onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                        className="form-select"
                        style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                      >
                        <option value="NEW DROP">NEW DROP</option>
                        <option value="CORE ARCHIVE">CORE ARCHIVE</option>
                        <option value="BESTSELLER">BESTSELLER</option>
                        <option value="LIMITED EDITION">LIMITED EDITION</option>
                        <option value="100% 320GSM">100% 320GSM</option>
                        <option value="EXCLUSIVE">EXCLUSIVE</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label" style={{ color: '#D0CEC8' }}>Color Tone</label>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input
                          type="color"
                          value={newProduct.colorHex}
                          onChange={(e) => setNewProduct({ ...newProduct, colorHex: e.target.value })}
                          style={{ width: 36, height: 38, border: 'none', background: 'transparent', cursor: 'pointer' }}
                        />
                        <input
                          type="text"
                          value={newProduct.colorName}
                          onChange={(e) => setNewProduct({ ...newProduct, colorName: e.target.value })}
                          placeholder="Obsidian Black"
                          className="form-input"
                          style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333', fontSize: '0.82rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* IMAGE UPLOAD & SELECTION SECTION */}
                  <div style={{ backgroundColor: '#101014', borderRadius: 'var(--radius-sm)', border: '1px solid #282834', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <label className="form-label" style={{ color: '#D8B4FE', margin: 0, fontWeight: 700 }}>
                        <ImageIcon size={14} style={{ display: 'inline', marginRight: 6 }} /> Product Image Source *
                      </label>
                      <div style={{ display: 'flex', gap: 4, backgroundColor: '#1A1A22', padding: 3, borderRadius: 'var(--radius-pill)' }}>
                        <button
                          type="button"
                          onClick={() => setImageSourceTab('upload')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-pill)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            backgroundColor: imageSourceTab === 'upload' ? '#A855F7' : 'transparent',
                            color: imageSourceTab === 'upload' ? '#000' : '#888',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageSourceTab('gallery')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-pill)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            backgroundColor: imageSourceTab === 'gallery' ? '#A855F7' : 'transparent',
                            color: imageSourceTab === 'gallery' ? '#000' : '#888',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          KAYOO Library (27)
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageSourceTab('url')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-pill)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            backgroundColor: imageSourceTab === 'url' ? '#A855F7' : 'transparent',
                            color: imageSourceTab === 'url' ? '#000' : '#888',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Paste URL
                        </button>
                      </div>
                    </div>

                    {/* TAB A: LOCAL FILE UPLOADER */}
                    {imageSourceTab === 'upload' && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: '2px dashed #3D3D4E',
                          borderRadius: 'var(--radius-sm)',
                          padding: '24px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: '#16161C',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleFileUpload(e, false)}
                          accept="image/*"
                          style={{ display: 'none' }}
                        />
                        <Upload size={24} color="#A855F7" style={{ margin: '0 auto 8px' }} />
                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Click to browse or drag & drop photo</div>
                        <div style={{ fontSize: '0.72rem', color: '#888', marginTop: 4 }}>
                          Supports JPEG, PNG, WEBP (stored in local high-res database)
                        </div>
                      </div>
                    )}

                    {/* TAB B: KAYOO PHOTO ARCHIVE GALLERY */}
                    {imageSourceTab === 'gallery' && (
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#8E8A82', marginBottom: 8 }}>
                          Click any lookbook photo from your photo shoots to set it as this product's image:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))', gap: 6, maxHeight: '180px', overflowY: 'auto', padding: 4 }}>
                          {PRESET_KAYOO_IMAGES.map((preset) => {
                            const isSelected = newProduct.images.includes(preset.path);
                            return (
                              <div
                                key={preset.path}
                                onClick={() => handleSelectPreset(preset.path, false)}
                                title={preset.label}
                                style={{
                                  position: 'relative',
                                  height: '84px',
                                  borderRadius: 4,
                                  overflow: 'hidden',
                                  cursor: 'pointer',
                                  border: isSelected ? '2px solid #A855F7' : '1px solid #333'
                                }}
                              >
                                <img src={preset.path} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {isSelected && (
                                  <div style={{ position: 'absolute', top: 2, right: 2, backgroundColor: '#A855F7', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={10} color="#000" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* TAB C: URL INPUT */}
                    {imageSourceTab === 'url' && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          type="url"
                          value={customImageUrl}
                          onChange={(e) => setCustomImageUrl(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="form-input"
                          style={{ backgroundColor: '#16161C', color: '#FFF', borderColor: '#333', fontSize: '0.82rem' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCustomUrl(false)}
                          className="btn btn-secondary btn-sm"
                          style={{ borderColor: '#A855F7', color: '#D8B4FE', flexShrink: 0 }}
                        >
                          Add URL
                        </button>
                      </div>
                    )}

                    {/* Selected Images Strip */}
                    {newProduct.images.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: '0.72rem', color: '#888', marginBottom: 6 }}>
                          Attached Photos ({newProduct.images.length}) — First photo is primary cover:
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {newProduct.images.map((img, idx) => (
                            <div key={idx} style={{ position: 'relative', width: 54, height: 68, borderRadius: 4, overflow: 'hidden', border: idx === 0 ? '2px solid #A855F7' : '1px solid #444' }}>
                              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx, false)}
                                style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(0,0,0,0.8)', color: '#FFF', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                              >
                                ×
                              </button>
                              {idx === 0 && (
                                <span style={{ position: 'absolute', bottom: 2, left: 2, backgroundColor: '#A855F7', color: '#000', fontSize: '0.55rem', fontWeight: 800, padding: '1px 3px', borderRadius: 2 }}>
                                  COVER
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary & Description */}
                  <div>
                    <label className="form-label" style={{ color: '#D0CEC8' }}>Description & Specifications</label>
                    <textarea
                      rows={2}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="form-textarea"
                      style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                {/* RIGHT: LIVE CARD PREVIEW */}
                <div style={{ backgroundColor: '#101014', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid #282834', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A855F7', marginBottom: 14 }}>
                      Live Storefront Card Preview
                    </div>

                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', overflow: 'hidden', color: '#000', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', maxWidth: '280px', margin: '0 auto' }}>
                      <div style={{ position: 'relative', height: '320px', backgroundColor: '#F0ECE4' }}>
                        <img
                          src={newProduct.images[0] || '/products/kayoo-tee-duo.jpeg'}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            backgroundColor: '#121214',
                            color: '#FFF',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-pill)',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {newProduct.badge || 'NEW DROP'}
                        </span>
                      </div>

                      <div style={{ padding: '14px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#777', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {newProduct.category} • {newProduct.gender}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: 2, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {newProduct.name || 'Untitled KAYOO Creation'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                          <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#111' }}>
                            ${newProduct.price || '0'}
                          </span>
                          {newProduct.compareAtPrice && (
                            <span style={{ fontSize: '0.8rem', color: '#888', textDecoration: 'line-through' }}>
                              ${newProduct.compareAtPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => setShowAddProductModal(false)}
                      className="btn btn-secondary"
                      style={{ flex: 1, borderColor: '#333', color: '#FFF' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 1.4, backgroundColor: '#A855F7', color: '#000', border: 'none', fontWeight: 800 }}
                    >
                      PUBLISH CREATION
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      {/* =========================================================================
          EDIT CREATION MODAL
          ========================================================================= */}
      {showEditProductModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowEditProductModal(false)} />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '94%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#16161B',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 1400,
              padding: '32px',
              color: '#FFF',
              border: '1px solid #2E2E38',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, color: '#FFF' }}>Edit Creation: {editFormData.sku}</h3>
              <button onClick={() => setShowEditProductModal(false)} style={{ color: '#FFF', padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="form-label" style={{ color: '#D0CEC8' }}>Title</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="form-input"
                  style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label className="form-label" style={{ color: '#D0CEC8' }}>Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    className="form-input"
                    style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: '#D0CEC8' }}>Compare Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editFormData.compareAtPrice}
                    onChange={(e) => setEditFormData({ ...editFormData, compareAtPrice: e.target.value })}
                    className="form-input"
                    style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: '#D0CEC8' }}>Stock Quantity</label>
                  <input
                    type="number"
                    value={editFormData.stock}
                    onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                    className="form-input"
                    style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                    required
                  />
                </div>
              </div>

              {/* Photo Upload & Gallery in Edit Modal */}
              <div style={{ backgroundColor: '#101014', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid #282834' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <label className="form-label" style={{ color: '#D8B4FE', margin: 0 }}>Add / Replace Product Image</label>
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#A855F7',
                      color: '#000',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    + Upload New Photo
                  </button>
                  <input
                    type="file"
                    ref={editFileInputRef}
                    onChange={(e) => handleFileUpload(e, true)}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {editFormData.images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: 60, height: 75, borderRadius: 4, overflow: 'hidden', border: idx === 0 ? '2px solid #A855F7' : '1px solid #444' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx, true)}
                        style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(0,0,0,0.8)', color: '#FFF', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                      >
                        ×
                      </button>
                      {idx === 0 && (
                        <span style={{ position: 'absolute', bottom: 2, left: 2, backgroundColor: '#A855F7', color: '#000', fontSize: '0.55rem', fontWeight: 800, padding: '1px 3px', borderRadius: 2 }}>
                          COVER
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: '#D0CEC8' }}>Product Description</label>
                <textarea
                  rows={2}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="form-textarea"
                  style={{ backgroundColor: '#101014', color: '#FFF', borderColor: '#333' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setShowEditProductModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1, borderColor: '#333', color: '#FFF' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, backgroundColor: '#A855F7', color: '#000', border: 'none', fontWeight: 800 }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Confirmation Modal for Resetting Catalog */}
      {showResetConfirmModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowResetConfirmModal(false)} />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '440px',
              backgroundColor: '#16161B',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              color: '#FFF',
              border: '1px solid #333',
              zIndex: 1500,
              textAlign: 'center'
            }}
          >
            <RotateCcw size={36} color="#F87171" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>Reset Catalog to Factory Defaults?</h4>
            <p style={{ fontSize: '0.85rem', color: '#908E88', lineHeight: 1.5, marginBottom: 20 }}>
              This will restore the original 12 KAYOO flagship items and clear custom added pieces.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1, borderColor: '#333', color: '#FFF' }}
              >
                Keep My Changes
              </button>
              <button
                onClick={handleResetCatalog}
                className="btn btn-primary"
                style={{ flex: 1, backgroundColor: '#EF4444', color: '#FFF', border: 'none', fontWeight: 700 }}
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 840px) {
          .admin-sidebar {
            display: none !important;
          }
          .admin-modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
