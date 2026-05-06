const content = window.siteContent;

const navItems = [
  ["Program", "program"],
  ["Modules", "modules"],
  ["Schedule", "schedule"],
  ["Events", "events"],
  ["Logistics", "logistics"],
  ["Join", "join"]
];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderFlow(targetId, blocks) {
  const target = document.getElementById(targetId);
  blocks.forEach((block) => {
    const article = el("article", "info-block");
    article.appendChild(el("h3", "", block.title));

    if (block.body) {
      block.body.forEach((paragraph) => article.appendChild(el("p", "", paragraph)));
    }

    if (block.list) {
      const list = el("ul", "check-list");
      block.list.forEach((item) => list.appendChild(el("li", "", item)));
      article.appendChild(list);
    }

    target.appendChild(article);
  });
}

function renderNavigation() {
  const nav = document.getElementById("sectionNav");
  navItems.forEach(([label, id]) => {
    const link = el("a", "", label);
    link.href = `#${id}`;
    nav.appendChild(link);
  });

  const moduleTitle = el("span", "nav-heading", "Modules");
  nav.appendChild(moduleTitle);
  content.modules.forEach((module) => {
    const link = el("a", "module-nav-link", module.title);
    link.href = `#module-${module.id}`;
    nav.appendChild(link);
  });
}

function renderModules(modules = content.modules) {
  const grid = document.getElementById("moduleGrid");
  grid.innerHTML = "";

  modules.forEach((module) => {
    const card = el("article", "module-card");
    card.id = `module-${module.id}`;
    card.dataset.search = `${module.title} ${module.tag} ${module.summary} ${module.sections
      .map((section) => `${section.heading} ${section.bullets.join(" ")}`)
      .join(" ")}`.toLowerCase();

    const meta = el("div", "module-meta");
    meta.appendChild(el("span", "tag", module.tag));
    meta.appendChild(el("span", "", module.title));

    card.appendChild(meta);
    card.appendChild(el("h3", "", module.title));
    card.appendChild(el("p", "module-summary", module.summary));

    module.sections.forEach((section, index) => {
      const details = el("details", "module-details");
      if (index === 0) details.open = true;
      const summary = el("summary", "", section.heading);
      details.appendChild(summary);

      const list = el("ul", "bullet-list");
      section.bullets.forEach((item) => list.appendChild(el("li", "", item)));
      details.appendChild(list);
      card.appendChild(details);
    });

    if (module.links) {
      const links = el("div", "resource-links");
      module.links.forEach(([label, href]) => {
        const link = el("a", "", label);
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener";
        links.appendChild(link);
      });
      card.appendChild(links);
    }

    grid.appendChild(card);
  });

  if (!modules.length) {
    grid.appendChild(el("p", "empty-state", "No modules match that search."));
  }
}

function renderSchedule() {
  const target = document.getElementById("scheduleContent");
  content.schedule.forEach((term) => {
    const article = el("article", "timeline-term");
    article.appendChild(el("h3", "", term.term));

    term.weeks.forEach(([week, detail]) => {
      const row = el("div", "timeline-row");
      row.appendChild(el("strong", "", week));
      row.appendChild(el("p", "", detail));
      article.appendChild(row);
    });

    target.appendChild(article);
  });
}

function renderSplitList(targetId, items) {
  const target = document.getElementById(targetId);
  items.forEach((item) => {
    const article = el("article", "mini-card");
    article.appendChild(el("h3", "", item.title));
    article.appendChild(el("p", "", item.body));
    target.appendChild(article);
  });
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const filtered = content.modules.filter((module) => {
      const text = `${module.title} ${module.tag} ${module.summary} ${module.sections
        .map((section) => `${section.heading} ${section.bullets.join(" ")}`)
        .join(" ")}`.toLowerCase();
      return text.includes(query);
    });
    renderModules(filtered);
  });
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-button");
  const sidebar = document.querySelector(".sidebar");
  button.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  sidebar.addEventListener("click", (event) => {
    if (event.target.tagName === "A") sidebar.classList.remove("open");
  });
}

function drawMaze() {
  const canvas = document.getElementById("mazeCanvas");
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const cells = 8;
  const gap = size / cells;
  let t = 0;

  const path = [
    [0, 7],
    [1, 7],
    [1, 6],
    [2, 6],
    [3, 6],
    [3, 5],
    [3, 4],
    [4, 4],
    [5, 4],
    [5, 3],
    [6, 3],
    [6, 2],
    [7, 2]
  ];

  function frame() {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#fff8ef";
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = "#16243a";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeRect(12, 12, size - 24, size - 24);

    ctx.lineWidth = 4;
    for (let i = 1; i < cells; i += 1) {
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.moveTo(i * gap, 24);
      ctx.lineTo(i * gap, size - 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(24, i * gap);
      ctx.lineTo(size - 24, i * gap);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = "#f47b20";
    ctx.lineWidth = 12;
    ctx.beginPath();
    path.forEach(([x, y], index) => {
      const px = x * gap + gap / 2;
      const py = y * gap + gap / 2;
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    const segment = Math.floor(t) % path.length;
    const next = (segment + 1) % path.length;
    const mix = t - Math.floor(t);
    const x = (path[segment][0] * (1 - mix) + path[next][0] * mix) * gap + gap / 2;
    const y = (path[segment][1] * (1 - mix) + path[next][1] * mix) * gap + gap / 2;

    ctx.fillStyle = "#1f8f8a";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#16243a";
    ctx.fillRect(x - 16, y - 8, 32, 16);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x + 10, y - 2, 4, 0, Math.PI * 2);
    ctx.fill();

    t += 0.018;
    requestAnimationFrame(frame);
  }

  frame();
}

renderNavigation();
renderFlow("programContent", content.program);
renderModules();
renderSchedule();
renderSplitList("eventsContent", content.events);
renderSplitList("logisticsContent", content.logistics);
renderFlow("joinContent", content.join);
setupSearch();
setupMobileMenu();
drawMaze();
