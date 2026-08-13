/* v0.3.3 market-feasibility layer; strategy disclosure only, no research-question changes. */
const v033BaseHomeView = homeView;
homeView = function () {
  const base = v033BaseHomeView();
  const needle = '<a class="text-button" href="/prototype/test-guide.html">查看原型測試說明';
  const index = base.indexOf(needle);
  if (index < 0) return base;
  const end = base.indexOf('</a>', index);
  if (end < 0) return base;
  const insertAt = end + 4;
  const marketLink = `<a class="text-button" href="/prototype/market-feasibility.html">查看市場可行性評估 ${icon("arrow",17)}</a>`;
  return `${base.slice(0, insertAt)}${marketLink}${base.slice(insertAt)}`;
};
render();
