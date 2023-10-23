(function () {
    ("use strict");

    $('.sidebar-btn').on("click", function () {
        $('.main-nav').addClass('show-menu');
    });

    $('.menu-close-btn').on("click", function () {
        $('.main-nav').removeClass('show-menu');
    });

    // mobile-drop-down

    $(".main-nav .bi").on('click', function (event) {
        var $fl = $(this);
        $(this).parent().siblings().find('.sub-menu').slideUp();
        $(this).parent().siblings().find('.bi').addClass('bi-chevron-down');
        if ($fl.hasClass('bi-chevron-down')) {
            $fl.removeClass('bi-chevron-down').addClass('bi-chevron-up');
        } else {
            $fl.removeClass('bi-chevron-up').addClass('bi-chevron-down');
        }
        $fl.next(".sub-menu").slideToggle();
    });


    // sticky header

    // window.addEventListener('scroll',function(){
    //     const header = document.querySelector('header.style-1,header.style-2, header.style-3,header.style-4,header.style-5,header.style-6');
    //     header.classList.toggle("sticky",window.scrollY > 0);
    // });


    //EMPTY INPUT FIELD
    function emptyInputFiled(id, selector = 'id', html = true) {
        var identifier = selector === 'id' ? `#${id}` : `.${id}`;
        $(identifier)[html ? 'html' : 'val']('');
    }


    // Select two
    const selectTwo = document.querySelectorAll(".select2-js")
    if (selectTwo != null) {
        selectTwo.forEach((item) => {
            $(item).select2(
                {
                    dropdownParent: '#smooth-content',
                }
            );
        })
    }


    // password js
    $(document).on('click', '#toggle-password', function (e) {
        var passwordInput = $("#password-input");
        var passwordFieldType = passwordInput.attr('type');
        if (passwordFieldType == 'password') {
            passwordInput.attr('type', 'text');
            $("#toggle-password").removeClass('fa-duotone fa-eye eye').addClass('fa-duotone fa-eye-slash eye');
        } else {
            passwordInput.attr('type', 'password');
            $("#toggle-password").removeClass('fa-duotone fa-eye-slash eye').addClass('fa-duotone fa-eye eye');
        }
    });


    // Nice Selecte initialization
    if (document.querySelector(".niceSelect")) {
        $(document).ready(function () {
            $('.niceSelect').niceSelect();
        });
    }

    // Testimonial slider

    var swiper = new Swiper(".testimonial-slider", {
        slidesPerView: 1,
        speed: 1200,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.testi-next',
            prevEl: '.testi-prev',
          },
        autoplay: {
            delay: 3500, // Autoplay duration in milliseconds
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
     
        breakpoints: {
            280: {
                slidesPerView: 1,
            },
            386: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 1,
            },
            1400: {
                slidesPerView: 1,
            },
        }
    });

    // Blog slider

       var swiper = new Swiper(".blog-slider", {
        slidesPerView: 1,
        speed: 1200,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.testi-next',
            prevEl: '.testi-prev',
          },
        autoplay: {
            delay: 1000, // Autoplay duration in milliseconds
        },
        breakpoints: {
            280: {
                slidesPerView: 1,
            },
            386: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 2,
            },
            1400: {
                slidesPerView: 2,
            },
        }
    });

    // Odometer Counter

    $(".counter-single").each(function () {
        $(this).isInViewport(function (status) {
            if (status === "entered") {
                for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
                    var el = document.querySelectorAll('.odometer')[i];
                    el.innerHTML = el.getAttribute("data-odometer-final");
                }
            }
        });
    });

    // Tab on Hover
    document.querySelectorAll('#myTab a').forEach(function(everyitem){ 	
        var tabTrigger = new bootstrap.Tab(everyitem)
        everyitem.addEventListener('mouseenter', function(){
            tabTrigger.show();
        });
        
    });

}())
