/**
* Template Name: Restaurantly - v3.1.0
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Chatbot
   */
  document.getElementById('chatbot-icon').addEventListener('click', function() {
      const now = new Date();
      const hours = now.getHours();
      let greeting;

      if (hours < 12) {
          greeting = 'Good Morning';
      } else if (hours < 18) {
          greeting = 'Good Afternoon';
      } else {
          greeting = 'Good Evening';
      }

      const chatPanelBody = document.getElementById('chat-panel-body');
      chatPanelBody.textContent = greeting;
      document.getElementById('chat-panel').style.display = 'block';
  });

  document.getElementById('close-chat-panel').addEventListener('click', function() {
      document.getElementById('chat-panel').style.display = 'none';
  });

  /**
   * Shopping Cart & Checkout
  */
   document.addEventListener('DOMContentLoaded', () => {
        let cart = [];
        let checkoutCart = [];
        const balanceAmount = 70.25;
        let subtotalAmount = 0;
        let totalAmount = 0;

        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const checkoutCartItems = document.getElementById('checkout-cart-items');
        const checkoutTotalAmountElem = document.getElementById('checkout-total-amount');
        const payWithBalanceBtn = document.getElementById('pay-with-balance');
        const checkoutButton = document.getElementById('checkout-button');
        const cartButton = document.getElementById('cart-button');

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const item = button.getAttribute('data-item');
                const price = parseFloat(button.getAttribute('data-price'));

                const existingItem = cart.find(cartItem => cartItem.item === item);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ item, price, quantity: 1 });
                }
                updateCart();
                new bootstrap.Modal(document.getElementById('cartModal')).show();
            });
        });

        cartButton.addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('cartModal')).show();
        });

        checkoutButton.addEventListener('click', () => {
            checkoutCart = JSON.parse(JSON.stringify(cart)); // Deep copy of cart
            updateCheckoutCart();
            const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
            cartModal.hide();
            new bootstrap.Modal(document.getElementById('checkoutModal')).show();
        });

        function updateCart() {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${item.item}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn-increase" data-id="${index}">+</button>
                        <button class="btn btn-sm btn-dark btn-decrease" data-id="${index}">-</button>
                    </td>
                    <td class="remover-cell"><button class="btn btn-danger btn-sm btn-remove-item" data-id="${index}">X</button></td>
                `;
                cartItems.appendChild(tr);
                total += item.price * item.quantity;
            });

            cartTotal.textContent = total.toFixed(2);

            // Attach event listeners to the dynamically added buttons
            document.querySelectorAll('.btn-increase').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-id'));
                    cart[index].quantity += 1;
                    updateCart();
                });
            });

            document.querySelectorAll('.btn-decrease').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-id'));
                    if (cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                    } else {
                        cart.splice(index, 1);
                    }
                    updateCart();
                });
            });

            document.querySelectorAll('.btn-remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-id'));
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }

        function updateCheckoutCart() {
            checkoutCartItems.innerHTML = '';
            subtotalAmount = 0;

            checkoutCart.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.item}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn-increase" data-id="${index}">+</button>
                        <button class="btn btn-sm btn-dark btn-decrease" data-id="${index}">-</button>
                    </td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                `;
                checkoutCartItems.appendChild(tr);
                subtotalAmount += item.price * item.quantity;
            });

            totalAmount = subtotalAmount;
            checkoutTotalAmountElem.textContent = totalAmount.toFixed(2);

            payWithBalanceBtn.disabled = totalAmount > balanceAmount;

            // Attach event listeners to the dynamically added buttons
            document.querySelectorAll('.btn-increase').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-id'));
                    checkoutCart[index].quantity += 1;
                    updateCheckoutCart();
                });
            });

            document.querySelectorAll('.btn-decrease').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-id'));
                    if (checkoutCart[index].quantity > 1) {
                        checkoutCart[index].quantity -= 1;
                    } else {
                        checkoutCart.splice(index, 1);
                    }
                    updateCheckoutCart();
                });
            });
        }

        payWithBalanceBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Paid Successfully',
                text: `You have $${(balanceAmount - totalAmount).toFixed(2)} left. Enjoy your session!`,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'session_index.html';
            });
        });

        updateCart();
   });

})()