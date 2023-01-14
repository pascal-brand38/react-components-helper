import o, { useState as g, useEffect as w } from "react";
var C = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, v = o.createContext && o.createContext(C), d = globalThis && globalThis.__assign || function() {
  return d = Object.assign || function(e) {
    for (var r, n = 1, t = arguments.length; n < t; n++) {
      r = arguments[n];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, d.apply(this, arguments);
}, O = globalThis && globalThis.__rest || function(e, r) {
  var n = {};
  for (var t in e)
    Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, t = Object.getOwnPropertySymbols(e); a < t.length; a++)
      r.indexOf(t[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[a]) && (n[t[a]] = e[t[a]]);
  return n;
};
function b(e) {
  return e && e.map(function(r, n) {
    return o.createElement(r.tag, d({
      key: n
    }, r.attr), b(r.child));
  });
}
function p(e) {
  return function(r) {
    return o.createElement(x, d({
      attr: d({}, e.attr)
    }, r), b(e.child));
  };
}
function x(e) {
  var r = function(n) {
    var t = e.attr, a = e.size, m = e.title, s = O(e, ["attr", "size", "title"]), i = a || n.size || "1em", l;
    return n.className && (l = n.className), e.className && (l = (l ? l + " " : "") + e.className), o.createElement("svg", d({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, t, s, {
      className: l,
      style: d(d({
        color: e.color || n.color
      }, n.style), e.style),
      height: i,
      width: i,
      xmlns: "http://www.w3.org/2000/svg"
    }), m && o.createElement("title", null, m), e.children);
  };
  return v !== void 0 ? o.createElement(v.Consumer, null, function(n) {
    return r(n);
  }) : r(C);
}
function z(e) {
  return p({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208 0-220.912-179.088-400-400-400s-400 179.088-400 400 179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0 12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z" } }] })(e);
}
function k(e) {
  return p({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" } }] })(e);
}
function I(e) {
  return p({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" } }] })(e);
}
const S = ({
  type: e,
  // type of dropdown: dropdown, or searchbar
  initialValue: r,
  // initial value of the box
  list: n,
  // list of items to be shown in the dropdown when opened, or in the searchbar when guessing
  valueFromItem: t,
  // how the item is printed
  onChange: a,
  onSelect: m
  // (index, item) function, called when an item is selected from the dropdown
}) => {
  const [s, i] = g(!1), l = () => {
    i(!s);
  }, [_, u] = g(r), f = ({ index: c, item: h }) => {
    i(!1), u(t(h)), m({ index: c, item: h });
  }, N = () => /* @__PURE__ */ o.createElement(o.Fragment, null, e === "dropdown" && (s ? /* @__PURE__ */ o.createElement(I, null) : /* @__PURE__ */ o.createElement(k, null)), e === "searchbar" && /* @__PURE__ */ o.createElement(z, null));
  return /* @__PURE__ */ o.createElement("div", { className: "rch-dropdown" }, /* @__PURE__ */ o.createElement("div", { className: "rch-dropdown__top" }, e === "dropdown" && /* @__PURE__ */ o.createElement("button", { className: "rch-dropdown__top-toclick", onClick: l }, " ", _, " "), e === "searchbar" && /* @__PURE__ */ o.createElement(
    "input",
    {
      className: "rch-dropdown__top-toclick",
      type: "text",
      value: _,
      onChange: (c) => {
        i(!0), u(c.target.value), a(c.target.value);
      },
      onKeyUp: ({ key: c }) => {
        c === "Enter" && n && s && f({ index: 0, item: n[0] });
      }
    }
  ), /* @__PURE__ */ o.createElement(N, null)), n && s ? /* @__PURE__ */ o.createElement("ul", { className: "rch-dropdown__list" }, n.map((c, h) => /* @__PURE__ */ o.createElement("li", { key: h, className: "rch-dropdown__list-item" }, /* @__PURE__ */ o.createElement("button", { className: "rch-dropdown__list-item", onClick: () => f({ index: h, item: c }) }, t(c))))) : null);
};
async function y(e, r) {
  const t = await (await fetch("https://geocoding-api.open-meteo.com/v1/search?language=fr&count=100&name=" + e)).json();
  return t && t.results ? r ? t.results.filter((a) => r.includes(a.country_code)) : t.results : null;
}
function E(e) {
  return e.name + " - " + e.admin2;
}
function j({ defaultTownName: e, newCoordsCallback: r, countryFilter: n = null }) {
  const [t, a] = g(null), [m, s] = g(null);
  function i(u) {
    y(u, n).then((f) => s(f));
  }
  w(() => {
    t || y(e, n).then((u) => a(u[0]));
  }), w(() => {
    r && t && r(t);
  }, [t]);
  function l() {
    return t;
  }
  function _() {
    return t ? /* @__PURE__ */ o.createElement(
      S,
      {
        type: "searchbar",
        initialValue: E(t),
        list: m,
        onChange: i,
        onSelect: ({ item: u }) => a(u),
        valueFromItem: E
      }
    ) : null;
  }
  return {
    getCoords: l,
    render: _
  };
}
export {
  S as RchDropdown,
  j as RchGeoCoords
};
