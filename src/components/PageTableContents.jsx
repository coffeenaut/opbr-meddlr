import {useState, useRef, useEffect} from 'react'
const PageTableContents = ({nestedHeadings}) => {
    const [activeId, setActiveId] = useState();
    
    const Headings = ({ headings, activeId }) => (
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={heading.id === activeId ? "active" : ""}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`).scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              {heading.title}
            </a>
            {heading.items.length > 0 && (
              <ul>
                {heading.items.map((child) => (
                  <li
                    key={child.id}
                    className={child.id === activeId ? "active" : ""}
                  >
                    <a
                      href={`#${child.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(`#${child.id}`).scrollIntoView({
                          behavior: "smooth"
                        });
                      }}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
    const useIntersectionObserver = (setActiveId) => {
        const headingElementsRef = useRef({});
        useEffect(() => {
          const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement) => {
              map[headingElement.target.id] = headingElement;
              return map;
            }, headingElementsRef.current);
      
            // Get all headings that are currently visible on the page
            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
              const headingElement = headingElementsRef.current[key];
              if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
            });
      
            const getIndexFromId = (id) =>
              headingElements.findIndex((heading) => heading.id === id);
      
            // If there is only one visible heading, this is our "active" heading
            if (visibleHeadings.length === 1) {
              setActiveId(visibleHeadings[0].target.id);
              // If there is more than one visible heading,
              // choose the one that is closest to the top of the page
            } else if (visibleHeadings.length > 1) {
              const sortedVisibleHeadings = visibleHeadings.sort(
                (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
              );
      
              setActiveId(sortedVisibleHeadings[0].target.id);
            }
          };
      
          const observer = new IntersectionObserver(callback, { root: document, rootMargin: "100px" });
      
          const headingElements = Array.from(document.querySelectorAll("h2, h3"));
      
          headingElements.forEach((element) => observer.observe(element));
      
          return () => observer.disconnect();
        }, [setActiveId]);
      };
      useIntersectionObserver(setActiveId);
    return (
        <>
          <nav aria-label="Table of contents">
            <Headings headings={nestedHeadings} activeId={activeId} />
          </nav>
        </>
    )
}
export default PageTableContents