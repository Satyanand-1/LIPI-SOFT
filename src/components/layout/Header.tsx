"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { primaryNav, type NavItem } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/components/motion/MotionProvider";

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const getScrolled = () => window.scrollY > 12;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, () => false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || menuOpen ? "border-line bg-paper" : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-3 focus-visible:z-10 focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-paper"
      >
        Skip to content
      </a>

      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="LIPI SOFT, home" className="-ml-1 px-1 py-2" onClick={() => closeMenu()}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.href}>
                  <ServicesMenu item={item} active={isActive(pathname, item.href)} pathname={pathname} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="link-draw py-2 text-[0.94rem] font-medium aria-[current=page]:text-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex" onClick={() => closeMenu()}>
            Start a Project
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid size-11 place-items-center lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={cn("absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-300 ease-expo", menuOpen ? "top-[5px] rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-300 ease-expo", menuOpen ? "top-[5px] -rotate-45" : "top-[10px]")} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>{menuOpen ? <MobileMenu pathname={pathname} onClose={closeMenu} toggleRef={toggleRef} /> : null}</AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop services dropdown                                           */
/* ------------------------------------------------------------------ */

function ServicesMenu({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True while the menu is open only because the pointer is hovering. The
  // click that follows a hover should then keep it open, not toggle it shut.
  const openedByHover = useRef(false);
  const panelId = useId();

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      openedByHover.current = false;
      setOpen(false);
    }, 140);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => cancelClose, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpen(false);
      buttonRef.current?.focus();
    }
    if (e.key === "ArrowDown" && document.activeElement === buttonRef.current) {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => wrapRef.current?.querySelector<HTMLAnchorElement>("[data-menu-link]")?.focus());
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          cancelClose();
          if (!open) openedByHover.current = true;
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          // Decided from the ref, not from `open`: a click can arrive before
          // React has re-rendered after the hover that opened the menu.
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((v) => !v);
        }}
        className={cn("link-draw flex items-center gap-1.5 py-2 text-[0.94rem] font-medium", active && "text-accent-ink")}
        data-active={active}
      >
        {item.label}
        <ChevronDown aria-hidden="true" className={cn("size-3.5 transition-transform duration-300 ease-expo", open && "rotate-180")} strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute left-1/2 top-full w-[38rem] -translate-x-1/2 pt-4"
          >
            <div className="border border-line-strong bg-paper-raised shadow-[0_24px_60px_-28px_rgb(20_22_26/0.35)]">
              <div className="h-1 bg-ink" />
              <ul className="grid grid-cols-2 gap-x-2 p-3">
                {item.children?.map((child, i) => {
                  const current = isActive(pathname, child.href);
                  return (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        data-menu-link
                        aria-current={current ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="group flex gap-3 p-3 transition-colors hover:bg-paper-sunk focus-visible:bg-paper-sunk aria-[current=page]:bg-paper-sunk"
                      >
                        <span className="type-label pt-1 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="block font-display text-[1.02rem] font-semibold leading-tight group-hover:text-accent-ink">{child.label}</span>
                          <span className="mt-1 line-clamp-2 block text-[0.82rem] leading-snug text-ink-faint">{child.description}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
                <li className="flex">
                  <Link
                    href={item.href}
                    data-menu-link
                    onClick={() => setOpen(false)}
                    className="group flex w-full items-center justify-between gap-3 bg-ink p-4 text-paper transition-colors hover:bg-accent-ink focus-visible:bg-accent-ink"
                  >
                    <span className="font-display text-[1.02rem] font-semibold">All services</span>
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                  </Link>
                </li>
              </ul>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile menu                                                         */
/* ------------------------------------------------------------------ */

function MobileMenu({
  pathname,
  onClose,
  toggleRef,
}: {
  pathname: string;
  onClose: (restoreFocus?: boolean) => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));

  // Lock page scroll, close on Escape, and keep Tab inside the menu and its toggle.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(true);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const inside = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
        (el) => el.offsetParent !== null,
      );
      const toggle = toggleRef.current;
      const ring = toggle ? [toggle, ...inside] : inside;
      const first = ring[0];
      const last = ring[ring.length - 1];
      if (!first || !last) return;
      if (!ring.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, toggleRef]);

  const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };

  return (
    <m.div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto overscroll-contain bg-paper lg:hidden"
    >
      <m.nav
        aria-label="Mobile"
        className="shell flex min-h-full flex-col pb-8 pt-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } }}
      >
        <ul className="border-b border-line">
          {primaryNav.map((nav) => {
            const active = isActive(pathname, nav.href);
            if (!nav.children) {
              return (
                <m.li key={nav.href} variants={item} className="border-t border-line">
                  <Link
                    href={nav.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => onClose()}
                    className="flex items-center justify-between py-4 font-display text-[1.7rem] font-semibold leading-none tracking-[-0.02em] aria-[current=page]:text-accent-ink"
                  >
                    {nav.label}
                    {active ? <span aria-hidden="true" className="size-2 bg-accent" /> : null}
                  </Link>
                </m.li>
              );
            }
            return (
              <m.li key={nav.href} variants={item} className="border-t border-line">
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services"
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "flex w-full items-center justify-between py-4 text-left font-display text-[1.7rem] font-semibold leading-none tracking-[-0.02em]",
                    active && "text-accent-ink",
                  )}
                >
                  {nav.label}
                  <ChevronDown aria-hidden="true" className={cn("size-5 transition-transform duration-300 ease-expo", servicesOpen && "rotate-180")} />
                </button>
                <div id="mobile-services" data-open={servicesOpen} inert={!servicesOpen} className="acc-panel">
                  <div>
                    <ul className="pb-4">
                      <li>
                        <Link href={nav.href} onClick={() => onClose()} aria-current={pathname === nav.href ? "page" : undefined} className="block py-2.5 text-[1.05rem] font-medium text-ink-soft aria-[current=page]:text-accent-ink">
                          All services
                        </Link>
                      </li>
                      {nav.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => onClose()}
                            aria-current={isActive(pathname, child.href) ? "page" : undefined}
                            className="block py-2.5 text-[1.05rem] font-medium text-ink-soft aria-[current=page]:text-accent-ink"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.li>
            );
          })}
        </ul>

        <m.div variants={item} className="mt-auto pt-8">
          <ButtonLink href="/contact" className="w-full" onClick={() => onClose()}>
            Start a Project
          </ButtonLink>
        </m.div>
      </m.nav>
    </m.div>
  );
}
