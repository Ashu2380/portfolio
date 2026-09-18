import { useEffect, useRef, useState } from 'react';

/** Typing animation through a list of words. Returns current text. */
export function useTyping(words, typeMs = 78, delMs = 42, holdMs = 1700) {
  const [text, setText] = useState('');
  useEffect(() => {
    let wi = 0, ci = 0, del = false, timer;
    const tick = () => {
      const word = words[wi];
      setText(word.slice(0, ci));
      let delay = del ? delMs : typeMs;
      if (!del && ci >= word.length) { delay = holdMs; del = true; }
      else if (del && ci <= 0) { del = false; wi = (wi + 1) % words.length; delay = 420; }
      else { ci += del ? -1 : 1; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, delay0());
    function delay0() { return 400; }
    return () => clearTimeout(timer);
  }, []);
  return text;
}

/** Runs `start` once when the element scrolls into view. */
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const obs = new IntersectionObserver(
      (es) => es.forEach((en) => {
        if (en.isIntersecting) { setInView(true); obs.disconnect(); }
      }),
      options || { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/** Animated counter that counts up to `end` when visible. */
export function Counter({ end, duration = 1300 }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref}>{val}</span>;
}

/** Wrapper that fades content up when scrolled into view. */
export function Reveal({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Skill bar that fills to `pct` when visible. */
export function SkillBar({ name, pct }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div className="meter" ref={ref}>
      <div className="meter-top"><span>{name}</span><b>{pct}%</b></div>
      <div className="track"><i style={{ width: inView ? `${pct}%` : '0%' }} /></div>
    </div>
  );
}
