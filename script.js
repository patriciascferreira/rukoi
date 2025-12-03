/* RUKOI — script.js (completo: produtos + carrinho com qtd + envio Whats) */

const WHATS_NUM = "5511970677547";

/* produtos baseados no seu menu (descrições do card enviado) */
const PRODUCTS = [
  {
    id: 0,
    nome: "CÚMA",
    price: 9.9,
    desc: "Morango no chocolate 100% cacau com cumaru amazônico e brigadeiro. Sabor intenso e sofisticado, com aroma único e marcante.",
    img: "imagens/Chocolate.jpeg",
  },
  {
    id: 1,
    nome: "BLÚMA",
    price: 10.9,
    desc: "Morango no chocolate branco com cumaru amazônico e brigadeiro. Delicado, suave e elegante.",
    img: "imagens/chocolate branco.jpeg",
  },
  {
    id: 2,
    nome: "TAMU",
    price: 9.5,
    desc: "Morango e tâmara jumbo cobertos com chocolate. Contraste de texturas e sabores ricos, minimalista e sofisticado.",
    img: "imagens/tamu.jpeg",
  },
  {
    id: 3,
    nome: "LÓMA",
    price: 9.5,
    desc: "Morango no chocolate branco com brigadeiro de coco natural. Suave e leve, transmite delicadeza e acolhimento.",
    img: "imagens/coco.jpeg",
  },
  {
    id: 4,
    nome: "SOLÉ",
    price: 10.5,
    desc: "Morango no chocolate branco com brigadeiro de maracujá natural. Fresco, cítrico e luminoso.",
    img: "imagens/sola.jpeg",
  },
  {
    id: 5,
    nome: "Pistache",
    price: 11.5,
    desc: "Morango envolto em chocolate amargo, com notas de Pistache. Intenso e delicado.",
    img: "imagens/pistache.jpeg",
  },
  {
    id: 6,
    nome: "LOVA",
    price: 10.0,
    desc: "Morango no chocolate branco, com brigadeiro especial de lavanda e amora. Delicado, aromático e irresistível.",
    img: "imagens/LOVA.jpeg",
  },
  {
    id: 7,
    nome: "Caixa com 7 unidades sortidas",
    price: 10.0,
    desc: "Caixa com 7 unidades sortidas dos nossos morangos gourmet. Perfeita para presentear ou se deliciar com uma variedade de sabores exclusivos.",
    img: "imagens/CAIXA7.jpeg",
  },
];

/* carrinho com persistência */
let cart = JSON.parse(localStorage.getItem("rukoi_cart") || "[]");

/* ----- utilitários ----- */
function saveCart() {
  localStorage.setItem("rukoi_cart", JSON.stringify(cart));
  updateBadge();
}

function getCartTotal() {
  return cart.reduce((acc, it) => acc + it.price * it.qtd, 0);
}

function updateBadge() {
  const count = cart.reduce((acc, it) => acc + it.qtd, 0);
  document
    .querySelectorAll("#cartCount")
    .forEach((el) => (el.innerText = count));
}

/* ----- render grid ----- */
function initIndex() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  PRODUCTS.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="top-ribbon">RUKOI</div>
      <img class="foto" src="${p.img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p class="desc">${p.desc}</p>
      <div class="price-row">
        <div class="price">R$ ${p.price.toFixed(2)}</div>
        <div class="btns">
          <button class="btn secondary" data-id="${
            p.id
          }" onclick="viewProduct(${p.id})">Ver</button>
          <button class="btn add-btn" data-id="${p.id}">Adicionar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // bind add buttons
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const cardEl = e.currentTarget.closest(".card");
      const imgEl = cardEl && cardEl.querySelector(".foto");
      addToCartById(id, imgEl);
      // feedback
      e.currentTarget.innerText = "Adicionado ✓";
      setTimeout(() => (e.currentTarget.innerText = "Adicionar"), 900);
    });
  });

  updateBadge();
}

/* ----- add/remove cart ----- */
function addToCartById(id, imgEl) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  const found = cart.find((i) => i.id === id);
  if (found) found.qtd++;
  else cart.push({ id: p.id, nome: p.nome, price: p.price, qtd: 1 });

  saveCart();
  // animação de imagem voando pro carrinho
  if (imgEl) animateToCart(imgEl);
}

/* remove item fully */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartBox();
}

/* increase / decrease quantity */
function aumentar(index) {
  cart[index].qtd++;
  saveCart();
  renderCartBox();
}
function diminuir(index) {
  if (cart[index].qtd > 1) cart[index].qtd--;
  else cart.splice(index, 1);
  saveCart();
  renderCartBox();
}

/* ----- render cart box ----- */
function renderCartBox() {
  const box = document.getElementById("cartBox");
  if (!box) return;
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  let total = 0;

  cart.forEach((it, idx) => {
    total += it.price * it.qtd;
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="max-width:60%"><strong>${
        it.nome
      }</strong><br><small>R$ ${it.price.toFixed(2)}</small></div>
      <div class="qtd-area">
        <button class="qtd-btn" onclick="diminuir(${idx})">-</button>
        <div class="qtd-num">${it.qtd}</div>
        <button class="qtd-btn" onclick="aumentar(${idx})">+</button>
        <button class="qtd-btn" style="background:transparent;color:var(--brown);font-size:16px;margin-left:6px" onclick="removeItem(${idx})">✕</button>
      </div>
    `;
    list.appendChild(li);
  });

  document.getElementById("cartTotal").innerText = total.toFixed(2);
  updateBadge();
}

/* ----- open/close cart ----- */
document.addEventListener("click", (e) => {
  if (e.target.closest("#openCart")) {
    const box = document.getElementById("cartBox");
    box.classList.toggle("hidden");
    if (!box.classList.contains("hidden")) renderCartBox();
  }
});
document.getElementById &&
  document.getElementById("closeCart") &&
  document.getElementById("closeCart").addEventListener("click", () => {
    const box = document.getElementById("cartBox");
    box.classList.add("hidden");
  });

/* ----- animate image to cart ----- */
function animateToCart(imgEl) {
  try {
    const fly = imgEl.cloneNode(true);
    fly.classList.add("flying-img");
    document.body.appendChild(fly);

    const imgRect = imgEl.getBoundingClientRect();
    fly.style.left = imgRect.left + "px";
    fly.style.top = imgRect.top + "px";
    fly.style.width = imgRect.width + "px";
    fly.style.height = imgRect.height + "px";
    fly.style.opacity = "1";

    const cartBtn = document.querySelector(".mini-cart");
    const cartRect = cartBtn.getBoundingClientRect();
    fly.getBoundingClientRect();

    const translateX =
      cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2);
    const translateY =
      cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2);

    fly.style.transform = `translate(${translateX}px, ${translateY}px) scale(.18)`;
    fly.style.opacity = "0.0";

    // badge pulse
    const badge = document.querySelector(".badge");
    if (badge) {
      badge.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.25)" },
          { transform: "scale(1)" },
        ],
        { duration: 700 }
      );
    }

    setTimeout(() => fly.remove(), 900);
  } catch (err) {}
}

/* ----- View product (simples modal-like) ----- */
function viewProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return alert("Produto não encontrado");
  // quick modal using alert for simplicity - can be replaced by a proper modal
  const detalhes = `${p.nome}\n\n${p.desc}\n\nPreço: R$ ${p.price.toFixed(2)}`;
  if (confirm(`${detalhes}\n\nDeseja adicionar ao carrinho?`)) {
    addToCartById(id);
  }
}

/* ----- enviar pedido por WhatsApp (com quantidades e total) ----- */
function sendOrderWhats() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let texto = "Olá! Quero fazer um pedido RUKOI:%0A%0A";
  cart.forEach((it) => {
    texto += `• ${it.nome} — ${it.qtd}x — R$ ${(it.price * it.qtd).toFixed(
      2
    )}%0A`;
  });
  const total = getCartTotal();
  texto += `%0A🔸 Total: R$ ${total.toFixed(2)}%0A`;
  texto += `%0A📍 Endereço:%0A💳 Pagamento:%0A📝 Observações:%0A`;

  const url = `https://wa.me/${WHATS_NUM}?text=${texto}`;
  window.open(url, "_blank");
}

/* hook send button */
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "sendWhats") sendOrderWhats();
  if (e.target && e.target.id === "sendWhatsBtn") sendOrderWhats();
});

/* ----- expose small helpers for inline use ----- */
window.aumentar = aumentar;
window.diminuir = diminuir;
window.removeItem = removeItem;
window.addToCartById = addToCartById;
window.viewProduct = viewProduct;

/* ----- init on load ----- */
updateBadge();
