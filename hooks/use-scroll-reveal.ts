"use client";

import { useEffect, useRef, type RefObject } from "react";

export function useScrollReveal(scope: RefObject<HTMLElement | null>, contentKey: string) {
  const revealed = useRef(new WeakSet<HTMLElement>());

  useEffect(() => {
    const root = scope.current;
    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      typeof Element.prototype.animate !== "function"
    ) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".product-card"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pending = new Set<HTMLElement>();
    const hidden = new Map<HTMLElement, { value: string; priority: string }>();
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | null = null;
    let frame: number | null = null;
    let disposed = false;

    function restoreOpacity(card: HTMLElement) {
      const original = hidden.get(card);
      if (!original) return;
      if (original.value) card.style.setProperty("opacity", original.value, original.priority);
      else card.style.removeProperty("opacity");
      hidden.delete(card);
    }

    function cancelAnimation(card: HTMLElement) {
      const animation = animations.get(card);
      if (!animation) return;
      animation.onfinish = null;
      animation.cancel();
      animations.delete(card);
    }

    function reveal(card: HTMLElement, animate = false, delay = 0) {
      pending.delete(card);
      observer?.unobserve(card);
      revealed.current.add(card);
      restoreOpacity(card);
      cancelAnimation(card);

      if (
        !animate ||
        preference.matches ||
        card.contains(document.activeElement) ||
        card.getBoundingClientRect().bottom <= 0
      ) return;

      try {
        const animation = card.animate(
          [
            { opacity: 0, transform: "translateY(32px) scale(.97) rotate(-.6deg)" },
            { opacity: 1, transform: "translateY(0) scale(1) rotate(0deg)" },
          ],
          { duration: 600, delay, easing: "cubic-bezier(.16, 1, .3, 1)", fill: "both" },
        );
        animations.set(card, animation);
        animation.onfinish = () => {
          // Release the transform so card hover styles work after the reveal.
          cancelAnimation(card);
        };
      } catch {
        // The restored card stays visible if this browser cannot animate it.
      }
    }

    function revealPassedCards() {
      frame = null;
      if (disposed) return;
      // A large scroll jump can skip the observer's intersecting state entirely.
      for (const card of pending) {
        if (card.getBoundingClientRect().bottom <= 0) reveal(card);
      }
      for (const card of animations.keys()) {
        if (card.getBoundingClientRect().bottom <= 0) cancelAnimation(card);
      }
    }

    function onViewportChange() {
      if (frame === null && (pending.size || animations.size)) {
        frame = window.requestAnimationFrame(revealPassedCards);
      }
    }

    function onFocus(event: FocusEvent) {
      const card = event.target instanceof Element
        ? event.target.closest<HTMLElement>(".product-card")
        : null;
      if (card && root?.contains(card)) reveal(card);
    }

    function onPreferenceChange() {
      if (!preference.matches) return;
      observer?.disconnect();
      for (const card of cards) reveal(card);
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
    }

    if (preference.matches) {
      // Already-visible content should never disappear if this setting changes.
      for (const card of cards) revealed.current.add(card);
    } else {
      observer = new IntersectionObserver((entries) => {
        if (disposed || preference.matches) return;
        const arriving = entries
          .filter((entry) => entry.isIntersecting && pending.has(entry.target as HTMLElement))
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);

        arriving.forEach((entry, index) => {
          reveal(entry.target as HTMLElement, true, Math.min(index * 65, 195));
        });
        for (const entry of entries) {
          const card = entry.target as HTMLElement;
          if (pending.has(card) && entry.boundingClientRect.bottom <= 0) reveal(card);
        }
      }, { threshold: 0, rootMargin: "0px 0px -24px" });

      for (const card of cards) {
        if (revealed.current.has(card)) continue;
        if (card.contains(document.activeElement)) {
          reveal(card);
          continue;
        }
        pending.add(card);
        observer.observe(card);
        if (card.getBoundingClientRect().top >= window.innerHeight) {
          hidden.set(card, {
            value: card.style.getPropertyValue("opacity"),
            priority: card.style.getPropertyPriority("opacity"),
          });
          card.style.opacity = "0";
        }
      }
    }

    root.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onViewportChange, { passive: true, capture: true });
    window.addEventListener("resize", onViewportChange, { passive: true });
    preference.addEventListener("change", onPreferenceChange);

    return () => {
      disposed = true;
      observer?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
      root.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onViewportChange, true);
      window.removeEventListener("resize", onViewportChange);
      preference.removeEventListener("change", onPreferenceChange);
      for (const card of animations.keys()) cancelAnimation(card);
      for (const card of hidden.keys()) restoreOpacity(card);
      pending.clear();
    };
  }, [scope, contentKey]);
}
