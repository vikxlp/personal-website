// Table of Contents functionality
(function() {
    'use strict';

    // Initialize TOC when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTOC);
    } else {
        initTOC();
    }

    function initTOC() {
        // Only run on blog posts
        if (!document.querySelector('.single')) return;

        const content = document.querySelector('.content');
        if (!content) return;

        const headings = content.querySelectorAll('h2');
        if (!headings.length) return;

        // Create TOC structure
        const tocContainer = document.createElement('div');
        tocContainer.className = 'toc-container';

        const toc = document.createElement('nav');
        toc.className = 'toc';
        toc.setAttribute('aria-label', 'Table of contents');

        const tocLines = document.createElement('div');
        tocLines.className = 'toc-lines';

        const tocItems = document.createElement('div');
        tocItems.className = 'toc-items';

        // Generate TOC items from headings
        headings.forEach((heading, index) => {
            if (!heading.id) heading.id = `heading-${index}`;

            // Line for default state
            const line = document.createElement('div');
            line.className = 'toc-line';
            tocLines.appendChild(line);

            // Link for hover state
            const link = document.createElement('a');
            link.className = 'toc-item';
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;

            // Smooth scroll with offset
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: heading.offsetTop - 120,
                    behavior: 'smooth'
                });
                setTimeout(() => history.pushState(null, '', `#${heading.id}`), 100);
            });

            tocItems.appendChild(link);
        });

        // Build and append TOC
        toc.appendChild(tocLines);
        toc.appendChild(tocItems);
        tocContainer.appendChild(toc);
        document.body.appendChild(tocContainer);

        // Position TOC aligned with h1
        const h1 = document.querySelector('.single h1');
        if (h1) {
            const setTocPosition = () => {
                tocContainer.style.top = `${h1.getBoundingClientRect().top + window.scrollY}px`;
            };
            document.readyState === 'complete' ? setTocPosition() : window.addEventListener('load', setTocPosition);
        }

        // Track active heading on scroll (throttled with RAF)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveHeading(headings);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        updateActiveHeading(headings);
    }

    function updateActiveHeading(headings) {
        const scrollPosition = window.scrollY + 150;
        let activeIndex = 0;

        headings.forEach((heading, index) => {
            if (heading.offsetTop <= scrollPosition) activeIndex = index;
        });

        // Toggle active class on both lines and items
        document.querySelectorAll('.toc-line, .toc-item').forEach((el, i) => {
            el.classList.toggle('active', i === activeIndex);
        });
    }
})();
