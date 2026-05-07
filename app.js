const content = window.siteContent;

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

function renderClubInfo() {
  const club = content.club;
  const target = document.getElementById("clubContent");

  const main = el("div", "club-main");
  const side = el("div", "club-side");

  const intro = el("article", "club-intro");
  intro.appendChild(el("h3", "", "Join the OCC MicroMouse build team"));
  intro.appendChild(
    el(
      "p",
      "",
      "We meet every week to work on the club, build robots, answer questions, and help students find a place to contribute."
    )
  );

  const expectations = el("article", "club-expectations");
  expectations.appendChild(el("h3", "", "What to expect"));
  const list = el("ul", "check-list");
  [
    "A student-led environment where the club is still being shaped.",
    "Hands-on work sessions for robotics, electronics, coding, design, testing, and documentation.",
    "Room for beginners and experienced builders.",
    "Opportunities to help shape what MicroMouse at OCC becomes next."
  ].forEach((item) => list.appendChild(el("li", "", item)));
  expectations.appendChild(list);

  const details = el("div", "club-details");
  [
    ["Meeting", club.meeting],
    ["Email", club.email],
    ["Instagram", club.instagram]
  ].forEach(([label, value]) => {
    const item = el("article", "club-detail-row");
    item.appendChild(el("span", "club-detail-label", label));
    if (label === "Email") {
      const link = el("a", "club-detail-link", value);
      link.href = `mailto:${value}`;
      item.appendChild(link);
    } else if (label === "Instagram") {
      const link = el("a", "club-detail-link", value);
      link.href = club.instagramUrl;
      link.target = "_blank";
      link.rel = "noopener";
      item.appendChild(link);
    } else {
      item.appendChild(el("strong", "", value));
    }
    details.appendChild(item);
  });

  const discord = el("article", "discord-card");
  discord.appendChild(el("span", "", "Discord"));
  discord.appendChild(el("h3", "", "Scan to join the server"));
  const qrLink = el("a", "qr-link");
  qrLink.href = club.discordInviteUrl;
  qrLink.target = "_blank";
  qrLink.rel = "noopener";
  const qr = document.createElement("img");
  qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=14&data=${encodeURIComponent(
    club.discordInviteUrl
  )}`;
  qr.alt = "QR code for joining the MicroMouse at OCC Discord server";
  qr.loading = "lazy";
  qrLink.appendChild(qr);
  discord.appendChild(qrLink);
  const discordUrl = el("a", "discord-url", club.discordInviteUrl.replace(/^https?:\/\//, ""));
  discordUrl.href = club.discordInviteUrl;
  discordUrl.target = "_blank";
  discordUrl.rel = "noopener";
  discord.appendChild(discordUrl);

  main.appendChild(intro);
  main.appendChild(expectations);
  side.appendChild(discord);
  side.appendChild(details);

  target.appendChild(main);
  target.appendChild(side);
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

renderClubInfo();
renderFlow("introContent", content.intro);
renderFlow("joinContent", content.join);
drawMaze();
