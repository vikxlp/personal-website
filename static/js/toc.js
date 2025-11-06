// Table of Contents functionality
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTOC);
    } else {
        initTOC();
    }

    function initTOC() {
        // Only run on blog posts
        if (!document.querySelector('.single')) return;

        // Get all h2 headings from the content
        const content = document.querySelector('.content');
        if (!content) return;

        const headings = content.querySelectorAll('h2');
        if (headings.length === 0) return;

        // Create TOC container
        const tocContainer = document.createElement('div');
        tocContainer.className = 'toc-container';

        // Create TOC element
        const toc = document.createElement('nav');
        toc.className = 'toc';
        toc.setAttribute('aria-label', 'Table of contents');

        // Create lines for default state
        const tocLines = document.createElement('div');
        tocLines.className = 'toc-lines';

        // Create items for hover state
        const tocItems = document.createElement('div');
        tocItems.className = 'toc-items';

        // Add headings to TOC
        headings.forEach((heading, index) => {
            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }

            // Create line for default state
            const line = document.createElement('div');
            line.className = 'toc-line';
            line.dataset.target = heading.id;
            tocLines.appendChild(line);

            // Create link for hover state
            const link = document.createElement('a');
            link.className = 'toc-item';
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.dataset.target = heading.id;

            // Smooth scroll on click
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Get the heading's position relative to the document
                const headingTop = heading.offsetTop;

                // Scroll to heading position minus 120px offset
                window.scrollTo({
                    top: headingTop - 120,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                setTimeout(() => {
                    history.pushState(null, '', `#${heading.id}`);
                }, 100);
            });

            tocItems.appendChild(link);
        });

        // Append elements
        toc.appendChild(tocLines);
        toc.appendChild(tocItems);
        tocContainer.appendChild(toc);
        document.body.appendChild(tocContainer);

        // Align TOC with h1 element
        const h1 = document.querySelector('.single h1');
        if (h1) {
            const setTocPosition = () => {
                const h1Rect = h1.getBoundingClientRect();
                const h1Top = h1Rect.top + window.scrollY;
                tocContainer.style.top = `${h1Top}px`;
            };

            // Set position after page loads
            if (document.readyState === 'complete') {
                setTocPosition();
            } else {
                window.addEventListener('load', setTocPosition);
            }
        }

        // Update active state on scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveHeading(headings);
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check
        updateActiveHeading(headings);
    }

    function updateActiveHeading(headings) {
        const scrollPosition = window.scrollY + 150; // Offset for better UX

        let activeIndex = 0;
        headings.forEach((heading, index) => {
            if (heading.offsetTop <= scrollPosition) {
                activeIndex = index;
            }
        });

        // Update active states
        document.querySelectorAll('.toc-line, .toc-item').forEach((element, index) => {
            element.classList.toggle('active', index === activeIndex);
        });
    }
})();
