import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode, JSX } from "react";

const SECTION_ORDER = ["skills", "projects", "experience", "testimonials", "contact"];

interface SectionContextType {
  setSectionContent: (id: string, hasContent: boolean) => void;
  sectionNumbers: Record<string, string>;
}

const SectionContext = createContext<SectionContextType | null>(null);

export function SectionProvider({ children }: { children: ReactNode }): JSX.Element {
  const [sectionContent, setSectionContentState] = useState<Record<string, boolean>>({});

  const setSectionContent = (id: string, hasContent: boolean) => {
    setSectionContentState(prev => ({ ...prev, [id]: hasContent }));
  };

  const sectionNumbers = useMemo(() => {
    const numbers: Record<string, string> = {};
    let count = 0;
    for (const id of SECTION_ORDER) {
      if (sectionContent[id]) {
        count++;
        numbers[id] = String(count).padStart(2, "0");
      } else {
        numbers[id] = "";
      }
    }
    return numbers;
  }, [sectionContent]);

  return (
    <SectionContext.Provider value={{ setSectionContent, sectionNumbers }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionCounter(sectionId: string, hasContent: boolean = true) {
  const [isVisible, setIsVisible] = useState(false);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const context = useContext(SectionContext);

  useEffect(() => {
    if (context) {
      context.setSectionContent(sectionId, hasContent);
    }
  }, [sectionId, hasContent, context]);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  const ref = useCallback((element: HTMLElement | null) => {
    setNode(element);
  }, []);

  const counter = isVisible && context ? context.sectionNumbers[sectionId] ?? "" : "";

  return { counter, isVisible, ref };
}
