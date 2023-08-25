const sidebarFunctioning = () => {
    const e = document.querySelector(".header__mobile-burger-menu"),
      t = document.querySelector(".sidebar__close-btn"),
      o = document.querySelector(".sidebar");
    e.addEventListener("click", () => {
      o.style.display = "block";
    }),
      t.addEventListener("click", () => {
        o.style.display = "none";
      });
  },
  toggleDropdown = (e) => {
    let t = document.getElementById("dropdown-" + e),
      o = document.querySelector(".header"),
      n = document.querySelector(".main-content");
    if (t.classList.contains("active"))
      t.classList.remove("active"),
        o.classList.remove("dropdown-active"),
        n.classList.remove("dropdown-active");
    else {
      let e = document.querySelector(".dropdown-content.active");
      e && e.classList.remove("active"),
        t.classList.add("active"),
        o.classList.add("dropdown-active"),
        n.classList.add("dropdown-active");
    }
  },
  closeDropdown = (e) => {
    let t = document.getElementById("dropdown-" + e),
      o = document.querySelector(".header"),
      n = document.querySelector(".main-content");
    t.classList.remove("active"),
      o.classList.remove("dropdown-active"),
      n.classList.remove("dropdown-active");
  },
  videPlayer = (e, t) => {
    const o = document.querySelectorAll(e),
      n = t;
    o.forEach((e) => {
      new Plyr(e.querySelector(n)),
        e.addEventListener("ended", () => {
          e.querySelector(".video-icon").style.display = "block";
        }),
        e.addEventListener("mouseenter", () => {
          e.querySelector(".video-icon").style.opacity = "1";
        }),
        e.addEventListener("mouseleave", () => {
          n.paused || n.ended
            ? (e.querySelector(".video-icon").style.opacity = "1")
            : (e.querySelector(".video-icon").style.opacity = "0");
        });
    });
  },
  handleToggleText = (e, t, o, n, l) => {
    const i = document.querySelector(e),
      c = i && i.querySelector(t),
      r = i && i.querySelector(o),
      s = i && i.querySelector(n);
    i &&
      c &&
      r &&
      s &&
      (r.addEventListener("click", () => {
        (c.style.maxHeight = c.scrollHeight + "px"),
          (r.style.display = "none"),
          (s.style.display = "flex");
      }),
      s.addEventListener("click", () => {
        (c.style.maxHeight = l),
          (s.style.display = "none"),
          (r.style.display = "flex"),
          (c.scrollTop = 0);
      }));
  },
  toggleSubMenu = () => {
    const e = document.querySelectorAll(".navigation-list__item"),
      t = document.querySelectorAll(".navigation-sublist__item"),
      o = document.querySelector(".sidebar__navigation-title"),
      n = document.querySelector(".sidebar__bottom"),
      l = document.querySelector(".sidebar__top"),
      i = document.querySelector(".sidebar__group-tel"),
      c = document.querySelector(".sidebar__group-address"),
      r = document.querySelector(".sidebar__back").querySelector("button"),
      s = (e, t, s, a) => {
        if (t.querySelector(s)) {
          e.preventDefault(),
            e.stopPropagation(),
            (n.style.display = "none"),
            (i.style.display = "none"),
            (c.style.display = "none"),
            (l.style.marginBottom = "0"),
            a.forEach(function (e) {
              e !== t
                ? (e.style.display = "none")
                : ((t.querySelector("a").style.display = "none"),
                  t
                    .querySelectorAll(":scope > img")
                    .forEach((e) => (e.style.display = "none")),
                  (t.style.paddingBottom = "0"),
                  (t.style.borderBottom = "none"),
                  (t.querySelector(s).style.display = "block"));
            }),
            (o.textContent = t.querySelector("a").textContent);
          const d = () => {};
          r && r.addEventListener("click", d);
        }
      };
    e.forEach(function (t) {
      t.addEventListener("click", function (o) {
        s(o, t, ".navigation-sublist-group", e);
      });
    }),
      t.forEach(function (e) {
        e.addEventListener("click", function (o) {
          s(o, e, ".navigation-sublist__item-content", t);
        });
      });
  };
document.addEventListener("DOMContentLoaded", () => {
  videPlayer(".video__container", ".video"),
    handleToggleText(
      ".seo-block__content",
      ".seo-block__subtitle",
      "#btn-read-more-seo",
      "#btn-collapse-seo",
      "208px"
    ),
    handleToggleText(
      ".services-rent__benefit-container",
      ".services-rent__benefit",
      "#btn-read-more-rent",
      "#btn-collapse-rent",
      "138px"
    ),
    handleToggleText(
      ".service__maintenance-collapse__container",
      ".service__maintenance-collapse__content",
      "#btn-read-more-service",
      "#btn-collapse-service",
      "290px"
    ),
    handleToggleText(
      ".taxi__benifit-container-1",
      ".taxi__benifit-list-1",
      "#btn-read-more-taxi-1",
      "#btn-collapse-taxi-1",
      "138px"
    ),
    handleToggleText(
      ".taxi__benifit-container-2",
      ".taxi__benifit-list-2",
      "#btn-read-more-taxi-2",
      "#btn-collapse-taxi-2",
      "138px"
    ),
    sidebarFunctioning(),
    toggleSubMenu();
});
