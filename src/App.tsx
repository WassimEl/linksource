import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { categories, type Link } from "@/data/links";
import { useFavorites } from "@/hooks/useFavorites";

// ── Sound effects (Web Audio API) ────────────────────────────

let audioCtx: AudioContext | null = null;
let lastHoverSound = 0;

function getAudioContext() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playHoverSound() {
  try {
    const now = Date.now();
    if (now - lastHoverSound < 200) return;
    lastHoverSound = now;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.003, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  } catch {}
}

function playClickSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.006, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch {}
}

function getFavicon(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return null;
  }
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

// ── Browser-chrome style preview popup ───────────────────────────────────────

interface TooltipState {
  link: Link;
  x: number;
  y: number;
  placement: "top" | "bottom";
}

function PreviewTooltip({ tooltip }: { tooltip: TooltipState }) {
  const favicon = getFavicon(tooltip.link.url);
  const domain = getDomain(tooltip.link.url);

  const left = Math.min(Math.max(tooltip.x - 10, 8), window.innerWidth - 328);

  const style: React.CSSProperties = {
    position: "fixed",
    left,
    zIndex: 9999,
    pointerEvents: "none",
    ...(tooltip.placement === "top"
      ? { bottom: window.innerHeight - tooltip.y + 10 }
      : { top: tooltip.y + 10 }),
  };

  return (
    <div className="pv-wrap" style={style}>
      {/* Browser chrome bar */}
      <div className="pv-chrome">
        <div className="pv-dots">
          <span className="pv-dot red" />
          <span className="pv-dot yellow" />
          <span className="pv-dot green" />
        </div>
        <div className="pv-urlbar">{domain}</div>
      </div>

      {/* Info panel */}
      <div className="pv-info">
        <div className="pv-info-row">
          <div className="pv-favicon-wrap">
            {favicon ? (
              <img src={favicon} alt="" width={28} height={28}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            ) : <span style={{ fontSize: 18 }}>🌐</span>}
          </div>
          <div className="pv-info-text">
            <span className="pv-info-name">{tooltip.link.name}</span>
            <span className="pv-info-domain">{domain}</span>
          </div>
        </div>
        {tooltip.link.description && (
          <p className="pv-desc">{tooltip.link.description}</p>
        )}
        {tooltip.link.tags && tooltip.link.tags.length > 0 && (
          <div className="pv-tags">
            {tooltip.link.tags.map((t) => (
              <span key={t} className="pv-tag">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Link card ────────────────────────────────────────────────────────────────

function LinkCard({
  link,
  isFav,
  onToggleFav,
  onHover,
  onLeave,
}: {
  link: Link;
  isFav: boolean;
  onToggleFav: (url: string) => void;
  onHover: (link: Link, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const favicon = getFavicon(link.url);
  return (
    <div className="link-card-wrapper"
      onMouseEnter={(e) => { onHover(link, e); playHoverSound(); }}
      onMouseLeave={onLeave}
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-card"
      >
        <div className="link-card-icon">
          {favicon ? (
            <img src={favicon} alt="" width={18} height={18}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : <span>🔗</span>}
        </div>
        <div className="link-card-content">
          <span className="link-card-name">{link.name}</span>
          {link.description && (
            <span className="link-card-desc">{link.description}</span>
          )}
        </div>
        <div className="link-card-arrow">↗</div>
      </a>
      <button
        className={`fav-btn ${isFav ? "fav-btn-active" : ""}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFav(link.url); playClickSound(); }}
        title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
        aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {isFav ? "★" : "☆"}
      </button>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { favorites, toggle: toggleFav, isFav } = useFavorites();

  // Flatten all links for favorites lookup
  const allLinks = useMemo(
    () => categories.flatMap((c) => c.links),
    []
  );

  const favLinks = useMemo(
    () => allLinks.filter((l) => favorites.has(l.url)),
    [allLinks, favorites]
  );

  const totalLinks = useMemo(
    () => categories.reduce((acc, c) => acc + c.links.length, 0),
    []
  );

  const filtered = useMemo(() => {
    if (activeCategory === "favorites") {
      const q = search.toLowerCase().trim();
      const links = q
        ? favLinks.filter(
            (l) =>
              l.name.toLowerCase().includes(q) ||
              (l.description && l.description.toLowerCase().includes(q)) ||
              l.url.toLowerCase().includes(q)
          )
        : favLinks;
      return links.length > 0
        ? [{ id: "favorites", label: "Favoris", icon: "⭐", links }]
        : [];
    }

    const q = search.toLowerCase().trim();
    return categories
      .filter((c) => !activeCategory || c.id === activeCategory)
      .map((c) => ({
        ...c,
        links: c.links.filter(
          (l) =>
            !q ||
            l.name.toLowerCase().includes(q) ||
            (l.description && l.description.toLowerCase().includes(q)) ||
            l.url.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.links.length > 0);
  }, [search, activeCategory, favLinks]);

  const displayedCount = useMemo(
    () => filtered.reduce((acc, c) => acc + c.links.length, 0),
    [filtered]
  );

  const handleHover = useCallback((link: Link, e: React.MouseEvent) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    hoverTimeout.current = setTimeout(() => {
      const midY = rect.top + rect.height / 2;
      const placement = midY > window.innerHeight / 2 ? "top" : "bottom";
      setTooltip({
        link,
        x: rect.left,
        y: placement === "top" ? rect.top : rect.bottom,
        placement,
      });
    }, 300);
  }, []);

  const handleLeave = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setTooltip(null);
  }, []);

  const activeCategoryLabel =
    activeCategory === "favorites"
      ? "Favoris"
      : categories.find((c) => c.id === activeCategory)?.label;

  return (
    <div className="app-shell">
      {/* Animated background gradient orbs */}
      <div className="bg-orbs">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {tooltip && <PreviewTooltip key={tooltip.link.url} tooltip={tooltip} />}

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">🔗</div>
          <div>
            <div className="sidebar-title">LinkBoard</div>
            <div className="sidebar-subtitle">{totalLinks} liens</div>
          </div>
        </div>

        <div className="sidebar-search">
          <input
            type="search"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <nav className="sidebar-nav">
          {/* All */}
          <button
            onClick={() => { setActiveCategory(null); setSearch(""); }}
            className={`sidebar-item ${!activeCategory ? "sidebar-item-active" : ""}`}
          >
            <span className="sidebar-item-icon">✨</span>
            <span className="sidebar-item-label">Tous les liens</span>
            <span className="sidebar-item-count">{totalLinks}</span>
          </button>

          {/* Favorites */}
          <button
            onClick={() => { setActiveCategory("favorites"); setSearch(""); }}
            className={`sidebar-item sidebar-fav-item ${activeCategory === "favorites" ? "sidebar-item-active" : ""}`}
          >
            <span className="sidebar-item-icon">⭐</span>
            <span className="sidebar-item-label">Favoris</span>
            <span className="sidebar-item-count">{favorites.size}</span>
          </button>

          <div className="sidebar-divider" />

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id === activeCategory ? null : cat.id);
                setSearch("");
              }}
              className={`sidebar-item ${activeCategory === cat.id ? "sidebar-item-active" : ""}`}
            >
              <span className="sidebar-item-icon">{cat.icon}</span>
              <span className="sidebar-item-label">{cat.label}</span>
              <span className="sidebar-item-count">{cat.links.length}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <div className="main-header">
          <div>
            <h1 className="main-title">
              {activeCategory
                ? activeCategoryLabel
                : search
                  ? `Résultats pour "${search}"`
                  : "Tous les liens"}
            </h1>
            <p className="main-subtitle">
              {displayedCount} lien{displayedCount !== 1 ? "s" : ""}
              {!activeCategory && !search ? " dans " + categories.length + " catégories" : ""}
            </p>
          </div>
          {(activeCategory || search) && (
            <button
              className="clear-btn"
              onClick={() => { setActiveCategory(null); setSearch(""); }}
            >
              ✕ Effacer
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {activeCategory === "favorites" ? "⭐" : "🔍"}
            </div>
            <div className="empty-text">
              {activeCategory === "favorites"
                ? "Aucun favori pour l'instant"
                : "Aucun lien trouvé"}
            </div>
            <div className="empty-sub">
              {activeCategory === "favorites"
                ? "Clique sur ☆ sur un lien pour l'ajouter"
                : "Essaie une autre recherche ou catégorie"}
            </div>
          </div>
        ) : (
          <div className="categories-list">
            {filtered.map((cat) => (
              <section key={cat.id} className="category-block">
                {(!activeCategory || filtered.length > 1) && (
                  <div className="category-header">
                    <span className="category-icon">{cat.icon}</span>
                    <h2 className="category-title">{cat.label}</h2>
                    <span className="category-count">{cat.links.length}</span>
                  </div>
                )}
                <div className="links-grid">
                  {cat.links.map((link) => (
                    <LinkCard
                      key={link.url}
                      link={link}
                      isFav={isFav(link.url)}
                      onToggleFav={toggleFav}
                      onHover={handleHover}
                      onLeave={handleLeave}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
