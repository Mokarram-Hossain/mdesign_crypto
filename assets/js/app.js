(function () {
    ("use strict")
    // Html Root Element
    const rootHtml = document.documentElement;
    let deviceWidth = window.innerWidth;

    const tl = gsap.timeline({
        delay: 0.5,
    });

    // Use 'addEventListener' to attach events to the 'load' event of the window.
    window.addEventListener("load", () => {
        // Smooth scrolling initialize
        ScrollTrigger.normalizeScroll(true);
        ScrollSmoother.create({
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: true,
        });

        // Sticky scrolling initialize
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: { className: "sticky", targets: ".header-area" },
        });


        if (document.querySelector(".banner-section")) {
            TweenLite.from(".header-logo", 1, {
                opacity: 0,
                x: -10,
                ease: Expo.easeInOut,
            });

            let menuItems = gsap.utils.toArray(".menu-item-has-children");
            gsap.from(menuItems, {
                opacity: 0,
                x: -10,
                ease: Power3.easeInOut,
                stagger: 0.08,
            });

            // Banner all animations
            tl.from(".banner-info h1", { x: -200, opacity: 0, duration: 0.8 });

            // Banner Image
            gsap.set(".banner-image", { x: 200 });
            tl.to(".banner-image", { x: 0, duration: 0.8, opacity: 1 });

            let textAnim = new SplitText(".banner-text", { type: "chars words" });
            tl.from(textAnim.words, { duration: 0.5, x: 50, autoAlpha: 0, stagger: 0.04 }, "-=1", 0.08);

            const bannerBtn = gsap.utils.toArray(".banner-btn .i-btn");
            gsap.set(bannerBtn, { y: 20, opacity: 0 });
            tl.to(bannerBtn, { y: 0, opacity: 1, duration: 0.5, stagger: 0.5 });
        }

        // Card Batch Animation
        function batch(targets, vars) {
            let varsCopy = {},
                interval = vars.interval || 0.2,
                proxyCallback = (type, callback) => {
                    let batch = [],
                        delay = gsap.delayedCall(interval, () => {
                            callback(batch);
                            batch.length = 0;
                        }).pause();
                    return (self) => {
                        batch.length || delay.restart(true);
                        batch.push(self.trigger);
                        vars.batchMax && vars.batchMax <= batch.length && delay.progress(2);
                    };
                },
                p;
            for (p in vars) {
                varsCopy[p] = ~p.indexOf("Enter") || ~p.indexOf("Leave") ? proxyCallback(p, vars[p]) : vars[p];
            }
            gsap.utils.toArray(targets).forEach((target) => {
                let config = {};
                for (p in varsCopy) {
                    config[p] = varsCopy[p];
                }
                config.trigger = target;
                ScrollTrigger.create(config);
            });
        }

        batch(".fade-item", {
            interval: 0.2,
            batchMax: 4,
            onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, duration: 0.8, stagger: 0.2, overwrite: true }),
            onLeave: (batch) => gsap.set(batch, { autoAlpha: 0, duration: 0.8, overwrite: true }),
            onEnterBack: (batch) => gsap.to(batch, { autoAlpha: 1, duration: 0.8, stagger: 0.2, overwrite: true }),
            onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, duration: 0.8, overwrite: true }),
        });

        // Reveal animations based on scroll
        function animateFrom(elem, direction) {
            direction = direction || 1;
            var x = 0,
                y = direction * 100;
            if (elem.classList.contains("fromLeft")) {
                x = -100;
                y = 0;
            } else if (elem.classList.contains("fromRight")) {
                x = 100;
                y = 0;
            }

            elem.style.transform = `translate(${x}px, ${y}px)`;
            elem.style.opacity = "0";

            gsap.fromTo(
                elem,
                { x: x, y: y, autoAlpha: 0 },
                {
                    duration: 2.5,
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    ease: "expo",
                    overwrite: "auto",
                }
            );
        }
        function hide(elem) {
            gsap.set(elem, { autoAlpha: 0 });
        }

        gsap.utils.toArray(".gs_reveal").forEach((elem) => {
            hide(elem);
            ScrollTrigger.create({
                trigger: elem,
                onEnter: () => animateFrom(elem),
                onEnterBack: () => animateFrom(elem, -1),
                onLeave: () => hide(elem),
            });
        });
    });


    // Dark And Light mode
    const themeBtn = document.querySelector(".theme-btn");
    if (themeBtn != null) {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            themeBtn.innerHTML = storedTheme === "dark" ? `<i class="bi bi-moon-fill"></i>` : `<i class="bi bi-brightness-high"></i>`;
            rootHtml.setAttribute("color-scheme", storedTheme);
        } else {
            themeBtn.innerHTML = `<i class="bi bi-brightness-high"></i>`;
            rootHtml.setAttribute("color-scheme", "light");
        }

        themeBtn.addEventListener("click", () => {
            // Toggle theme preference
            const currentTheme = themeBtn.innerHTML;
            const changeTheme = currentTheme === `<i class="bi bi-brightness-high"></i>` ? `<i class="bi bi-moon-fill"></i>` : `<i class="bi bi-brightness-high"></i>`;
            themeBtn.innerHTML = changeTheme;

            // Toggle theme attributes
            const currentAttribute = rootHtml.getAttribute("color-scheme");
            const newAttribute = currentAttribute === "dark" ? "light" : "dark";
            rootHtml.setAttribute("color-scheme", newAttribute);

            localStorage.setItem("theme", newAttribute);
        });
    }

    // Scroll down Button
    var btnScrollDown = document.querySelector('.scroll-down');
    function scrollDown() {
        var windowCoords = document.documentElement.clientHeight;
        (function scroll() {
            if (window.pageYOffset < windowCoords) {
                window.scrollBy(0, 10);
                setTimeout(scroll, 0);
            }
            else if (window.pageYOffset > windowCoords) {
                window.scrollTo(0, windowCoords);
            }
        })();
    }
    if (btnScrollDown != null) {
        btnScrollDown.addEventListener('click', scrollDown);
    }


    // search bar
    const searchBtn = document.querySelector(".search-btn");
    window.addEventListener("load", () => {
        if (searchBtn != null) {
            searchBtn.addEventListener('click', () => {
                const searchBar = document.querySelector(".search-bar")
                const closeSearchbar = searchBar.querySelector("span")
                searchBar.style.cssText = "transform:translateY(0);";
                if (searchBar) {
                    closeSearchbar.addEventListener("click", () => {
                        searchBar.style.cssText = "transform:translateY(-100%);";
                    })
                }
            })
        }
    })

}())