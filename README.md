# RUKOI — Chocolateria Gourmet

**Visão Geral**

- **Descrição:** Site estático para o menu de bombons artesanais da RUKOI. Publicado em: https://patriciascferreira.github.io/rukoi/
- **Responsáveis:** Hellen Kuzma — responsável pelos doces; Patricia — responsável pelo código.

**Contatos**

- **WhatsApp (pedidos - bombom):** +55 11 97067-7547 (atualmente configurado no site)
- **GitHub (desenvolvedora):** https://github.com/patriciascferreira

**Arquivos principais**

- `index.html`: página inicial com grid de produtos e botão do carrinho.
- `product.html`: página de detalhe do produto (inicializa via `initProduct`).
- `checkout.html`: formulário para finalizar pedido e enviar via WhatsApp (inicializa via `initCheckout`).
- `script.js`: lógica de front-end (produtos, carrinho, animações e envio por WhatsApp).
- `style.css`: estilos e layout responsivo.

**Documentação de funções (arquivo: `script.js`)**

- `const WHATS_NUM` — string com o número do WhatsApp no formato internacional (ex.: `5511...`). Usada para abrir `https://wa.me/...`.

- `const PRODUCTS` — array com objetos `{ id, nome, price, desc, img }` que representam o catálogo. Para adicionar/remover produtos, altere este array.

- `let cart` — array persistido em `localStorage` como `rukoi_cart`.

- `saveCart()` — salva o estado do `cart` em `localStorage` e atualiza o badge do carrinho.

  - Observação: ideal adicionar debounce se for chamado muitas vezes.

- `getCartTotal()` — retorna o total do carrinho (soma de `price * qtd`).

- `updateBadge()` — atualiza o contador exibido em elementos com id `cartCount`.

- `initIndex()` — renderiza o grid de produtos em `#productGrid`, cria cards, botões e vincula eventos de adicionar.

  - Chamado em `index.html` com `initIndex()`.

- `addToCartById(id, imgEl)` — adiciona o produto ao `cart` (incrementa quantidade se já existir). Recebe o elemento de imagem para animar até o carrinho.

- `removeItem(index)` — remove o item do `cart` pelo índice.

- `aumentar(index)` / `diminuir(index)` — alteram a quantidade do item no `cart` e re-renderizam a caixa do carrinho.

- `renderCartBox()` — popula o elemento `#cartBox` com os itens do carrinho e atualiza o total.

- Evento geral `document.addEventListener('click', ...)` — controla abertura/fechamento do `cartBox` e binds de enviar pedido.

- `animateToCart(imgEl)` — clona a imagem do produto e anima até o botão do carrinho (efeito visual). Silencia erros internos com `try/catch`.

- `viewProduct(id)` — exibe um modal simples usando `confirm()` com detalhes do produto e opção de adicionar. Recomenda-se substituir por modal não bloqueante.

- `sendOrderWhats()` — monta a mensagem com itens, total e placeholders para endereço/pagamento e abre o `wa.me` com o texto codificado.

- Exposição global: funções `aumentar`, `diminuir`, `removeItem`, `addToCartById`, `viewProduct` são atribuídas em `window` para uso inline nos elementos gerados.

**Estrutura e responsabilidades por arquivo**

- `index.html`:

  - Container de produtos (`#productGrid`), botão do carrinho (`#openCart`), e botão flutuante do WhatsApp.
  - Carrega `script.js` e chama `initIndex()`.

- `product.html`:

  - Espaço para preencher detalhes do produto via `initProduct()` (nota: `initProduct` não está implementado no `script.js` atual — adicionar se necessário).

- `checkout.html`:
  - Lista de itens do pedido (`#checkoutItems`) e formulário `#orderForm` para coletar nome, telefone e endereço.
  - Chama `initCheckout()` (também não presente no `script.js` atual — ver nota abaixo).

**Notas importantes / Observações**

- Em `product.html` e `checkout.html` existem chamadas `initProduct()` e `initCheckout()` — atualmente não há implementações separadas para estes hooks em `script.js`. Se desejar páginas dedicadas, implemente `initProduct()` e `initCheckout()` para carregar os dados do `localStorage` e sincronizar o carrinho.
- Há uso de `confirm()`/`alert()` para UX rápido — trocar por modais acessíveis melhora a experiência.
- Os elementos com `id="cartCount"` aparecem em várias páginas; manter o mesmo id é aceitável, mas garantir que existam antes de manipular evita erros.

**Sugestões de melhoria (curto a médio prazo)**

- ✅ Acessibilidade (A11y): adicionar roles/labels nos controles, focos visíveis, estados ARIA no diálogo do carrinho.
- ✅ Validação do formulário de checkout: validar telefone/CEP e normalizar antes de enviar para WhatsApp.
- ✅ Substituir `confirm()`/`alert()` por modais não bloqueantes e mais acessíveis.
- ✅ Implementar `initProduct()` e `initCheckout()` para manter lógica de página separada.
- ✅ Otimizar imagens (usar WebP ou compressão) e fornecer `srcset` para responsividade.
- ✅ Lazy-loading de imagens (`loading="lazy"`) para melhorar perfomance.
- ✅ Remover uso de `onclick` inline se existir; preferir `addEventListener`/event delegation.
- ✅ Testes automatizados: pequenas suítes unitárias para utilitários (ex.: cálculo de total) e E2E para fluxo de compra.
- ✅ CI/CD: adicionar GitHub Action para rodar lint, testes e deploy automático para `gh-pages` (opcional).
- ✅ Internacionalização: extrair textos para permitir traduções futuras.

---

— Patricia & Hellen
