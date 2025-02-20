import "./style.scss";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { register } from "swiper/element/bundle";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";

register();

const productsSlider = document.querySelector("#productsSlider");
const userProfileBtn = document.querySelector(".user-profile-wrapper");
const dialog = document.querySelector(".history-dialog");
const historiesSlider = document.querySelector(".history-dialog-swiper");

const swiperParams = {
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1300: {
        slidesPerView: 4,
      },
    },
  };
  Object.assign(productsSlider, swiperParams);

  productsSlider.initialize();

  const getProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/category/furniture?limit=10`
    );
    const dataProducts = await response.json();
    for (let i = 0, j = dataProducts.products.length; i < j; i++) {
      const product = dataProducts.products[i];
      const slider = document.createElement("swiper-slide");
      const thumb = document.createElement("img");
      thumb.classList.add("thumbnail");
      thumb.src = product.thumbnail;
      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");
      productInfo.innerHTML = `
        <h2 class="title">${product.title}</h2>
        <p class="description">${product.description}</p>
        <p class="price">
          <span>${product.price}€</span>
          <button class="add-to-cart">+</button>
        </p>
      `;
      slider.appendChild(thumb);
      slider.appendChild(productInfo);
      slider.classList.add("product-card");
      productsSlider.appendChild(slider);
    }
    productsSlider.swiper.update();
  };

  userProfileBtn.addEventListener("click", () => {
    dialog.show();
  });

  dialog.addEventListener("sl-show", () => {
    window.setTimeout(() => {
      historiesSlider.swiper.update();
    }, 100);
  });

  window.addEventListener("load", getProducts);