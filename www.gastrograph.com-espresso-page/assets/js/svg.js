! function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.SVG = e()
}(this, function() {
    function t(t, e) {
        e = e || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var i = document.createEvent("CustomEvent");
        return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
    }

    function e(t) {
        return t.toLowerCase().replace(/-(.)/g, function(t, e) {
            return e.toUpperCase()
        })
    }

    function i(t) {
        return 4 == t.length ? ["#", t.substring(1, 2), t.substring(1, 2), t.substring(2, 3), t.substring(2, 3), t.substring(3, 4), t.substring(3, 4)].join("") : t
    }

    function n(t) {
        var e = t.toString(16);
        return 1 == e.length ? "0" + e : e
    }

    function r(t, e, i) {
        return (null == e || null == i) && (null == i ? i = t.height / t.width * e : null == e && (e = t.width / t.height * i)), {
            width: e,
            height: i
        }
    }

    function s(t, e) {
        return "number" == typeof t.from ? t.from + (t.to - t.from) * e : t instanceof l.Color || t instanceof l.Number ? t.at(e) : 1 > e ? t.from : t.to
    }

    function h(t) {
        for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e][0], null != t[e][1] && (n += t[e][1], null != t[e][2] && (n += " ", n += t[e][2], null != t[e][3] && (n += " ", n += t[e][3], n += " ", n += t[e][4], null != t[e][5] && (n += " ", n += t[e][5], n += " ", n += t[e][6], null != t[e][7] && (n += " ", n += t[e][7])))));
        return n + " "
    }

    function o(t) {
        t.x2 = t.x + t.width, t.y2 = t.y + t.height, t.cx = t.x + t.width / 2, t.cy = t.y + t.height / 2
    }

    function a(t) {
        if (t.matrix) {
            var e = t.matrix.replace(/\s/g, "").split(",");
            6 == e.length && (t.a = parseFloat(e[0]), t.b = parseFloat(e[1]), t.c = parseFloat(e[2]), t.d = parseFloat(e[3]), t.e = parseFloat(e[4]), t.f = parseFloat(e[5]))
        }
        return t
    }

    function u(t) {
        var e = t.toString().match(l.regex.reference);
        return e ? e[1] : void 0
    }
    var l = this.SVG = function(t) {
        return l.supported ? (t = new l.Doc(t), l.parser || l.prepare(t), t) : void 0
    };
    if (l.ns = "http://www.w3.org/2000/svg", l.xmlns = "http://www.w3.org/2000/xmlns/", l.xlink = "http://www.w3.org/1999/xlink", l.did = 1e3, l.eid = function(t) {
            return "Svgjs" + t.charAt(0).toUpperCase() + t.slice(1) + l.did++
        }, l.create = function(t) {
            var e = document.createElementNS(this.ns, t);
            return e.setAttribute("id", this.eid(t)), e
        }, l.extend = function() {
            var t, e, i, n;
            for (t = [].slice.call(arguments), e = t.pop(), n = t.length - 1; n >= 0; n--)
                if (t[n])
                    for (i in e) t[n].prototype[i] = e[i];
            l.Set && l.Set.inherit && l.Set.inherit()
        }, l.prepare = function(t) {
            var e = document.getElementsByTagName("body")[0],
                i = (e ? new l.Doc(e) : t.nested()).size(2, 0),
                n = l.create("path");
            i.node.appendChild(n), l.parser = {
                body: e || t.parent,
                draw: i.style("opacity:0;position:fixed;left:100%;top:100%;overflow:hidden"),
                poly: i.polyline().node,
                path: n
            }
        }, l.supported = function() {
            return !!document.createElementNS && !!document.createElementNS(l.ns, "svg").createSVGRect
        }(), !l.supported) return !1;
    l.get = function(t) {
            var e = document.getElementById(u(t) || t);
            return e ? e.instance : void 0
        }, l.invent = function(t) {
            var e = "function" == typeof t.create ? t.create : function() {
                this.constructor.call(this, l.create(t.create))
            };
            return t.inherit && (e.prototype = new t.inherit), t.extend && l.extend(e, t.extend), t.construct && l.extend(t.parent || l.Container, t.construct), e
        }, "function" != typeof t && (t.prototype = window.Event.prototype, window.CustomEvent = t),
        function(t) {
            for (var e = 0, i = ["moz", "webkit"], n = 0; n < i.length && !window.requestAnimationFrame; ++n) t.requestAnimationFrame = t[i[n] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"];
            t.requestAnimationFrame = t.requestAnimationFrame || function(i) {
                var n = (new Date).getTime(),
                    r = Math.max(0, 16 - (n - e)),
                    s = t.setTimeout(function() {
                        i(n + r)
                    }, r);
                return e = n + r, s
            }, t.cancelAnimationFrame = t.cancelAnimationFrame || t.clearTimeout
        }(window), l.regex = {
            unit: /^(-?[\d\.]+)([a-z%]{0,2})$/,
            hex: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
            rgb: /rgb\((\d+),(\d+),(\d+)\)/,
            reference: /#([a-z0-9\-_]+)/i,
            isHex: /^#[a-f0-9]{3,6}$/i,
            isRgb: /^rgb\(/,
            isCss: /[^:]+:[^;]+;?/,
            isBlank: /^(\s+)?$/,
            isNumber: /^-?[\d\.]+$/,
            isPercent: /^-?[\d\.]+%$/,
            isImage: /\.(jpg|jpeg|png|gif)(\?[^=]+.*)?/i,
            isEvent: /^[\w]+:[\w]+$/
        }, l.defaults = {
            matrix: "1 0 0 1 0 0",
            attrs: {
                "stroke-opacity": 1,
                "stroke-width": 0,
                "stroke-linejoin": "miter",
                "stroke-linecap": "butt",
                fill: "#000000",
                stroke: "#000000",
                x: 0,
                y: 0,
                cx: 0,
                cy: 0,
                width: 0,
                height: 0,
                r: 0,
                rx: 0,
                ry: 0,
                offset: 0,
                "stop-color": "#000000",
                "font-size": 16,
                "font-family": "Helvetica, Arial, sans-serif",
                "text-anchor": "start"
            },
            trans: function() {
                return {
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                    skewX: 0,
                    skewY: 0,
                    matrix: this.matrix,
                    a: 1,
                    b: 0,
                    c: 0,
                    d: 1,
                    e: 0,
                    f: 0
                }
            }
        }, l.Color = function(t) {
            var e;
            this.r = 0, this.g = 0, this.b = 0, "string" == typeof t ? l.regex.isRgb.test(t) ? (e = l.regex.rgb.exec(t.replace(/\s/g, "")), this.r = parseInt(e[1]), this.g = parseInt(e[2]), this.b = parseInt(e[3])) : l.regex.isHex.test(t) && (e = l.regex.hex.exec(i(t)), this.r = parseInt(e[1], 16), this.g = parseInt(e[2], 16), this.b = parseInt(e[3], 16)) : "object" == typeof t && (this.r = t.r, this.g = t.g, this.b = t.b)
        }, l.extend(l.Color, {
            toString: function() {
                return this.toHex()
            },
            toHex: function() {
                return "#" + n(this.r) + n(this.g) + n(this.b)
            },
            toRgb: function() {
                return "rgb(" + [this.r, this.g, this.b].join() + ")"
            },
            brightness: function() {
                return this.r / 255 * .3 + this.g / 255 * .59 + this.b / 255 * .11
            },
            morph: function(t) {
                return this.destination = new l.Color(t), this
            },
            at: function(t) {
                return this.destination ? (t = 0 > t ? 0 : t > 1 ? 1 : t, new l.Color({
                    r: ~~(this.r + (this.destination.r - this.r) * t),
                    g: ~~(this.g + (this.destination.g - this.g) * t),
                    b: ~~(this.b + (this.destination.b - this.b) * t)
                })) : this
            }
        }), l.Color.test = function(t) {
            return t += "", l.regex.isHex.test(t) || l.regex.isRgb.test(t)
        }, l.Color.isRgb = function(t) {
            return t && "number" == typeof t.r && "number" == typeof t.g && "number" == typeof t.b
        }, l.Color.isColor = function(t) {
            return l.Color.isRgb(t) || l.Color.test(t)
        }, l.Array = function(t, e) {
            t = (t || []).valueOf(), 0 == t.length && e && (t = e.valueOf()), this.value = this.parse(t)
        }, l.extend(l.Array, {
            morph: function(t) {
                if (this.destination = this.parse(t), this.value.length != this.destination.length) {
                    for (var e = this.value[this.value.length - 1], i = this.destination[this.destination.length - 1]; this.value.length > this.destination.length;) this.destination.push(i);
                    for (; this.value.length < this.destination.length;) this.value.push(e)
                }
                return this
            },
            settle: function() {
                for (var t = 0, e = this.value.length, i = []; e > t; t++) - 1 == i.indexOf(this.value[t]) && i.push(this.value[t]);
                return this.value = i
            },
            at: function(t) {
                if (!this.destination) return this;
                for (var e = 0, i = this.value.length, n = []; i > e; e++) n.push(this.value[e] + (this.destination[e] - this.value[e]) * t);
                return new l.Array(n)
            },
            toString: function() {
                return this.value.join(" ")
            },
            valueOf: function() {
                return this.value
            },
            parse: function(t) {
                return t = t.valueOf(), Array.isArray(t) ? t : this.split(t)
            },
            split: function(t) {
                return t.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ")
            },
            reverse: function() {
                return this.value.reverse(), this
            }
        }), l.PointArray = function() {
            this.constructor.apply(this, arguments)
        }, l.PointArray.prototype = new l.Array, l.extend(l.PointArray, {
            toString: function() {
                for (var t = 0, e = this.value.length, i = []; e > t; t++) i.push(this.value[t].join(","));
                return i.join(" ")
            },
            at: function(t) {
                if (!this.destination) return this;
                for (var e = 0, i = this.value.length, n = []; i > e; e++) n.push([this.value[e][0] + (this.destination[e][0] - this.value[e][0]) * t, this.value[e][1] + (this.destination[e][1] - this.value[e][1]) * t]);
                return new l.PointArray(n)
            },
            parse: function(t) {
                if (t = t.valueOf(), Array.isArray(t)) return t;
                t = this.split(t);
                for (var e, i = 0, n = t.length, r = []; n > i; i++) e = t[i].split(","), r.push([parseFloat(e[0]), parseFloat(e[1])]);
                return r
            },
            move: function(t, e) {
                var i = this.bbox();
                if (t -= i.x, e -= i.y, !isNaN(t) && !isNaN(e))
                    for (var n = this.value.length - 1; n >= 0; n--) this.value[n] = [this.value[n][0] + t, this.value[n][1] + e];
                return this
            },
            size: function(t, e) {
                var i, n = this.bbox();
                for (i = this.value.length - 1; i >= 0; i--) this.value[i][0] = (this.value[i][0] - n.x) * t / n.width + n.x, this.value[i][1] = (this.value[i][1] - n.y) * e / n.height + n.y;
                return this
            },
            bbox: function() {
                return l.parser.poly.setAttribute("points", this.toString()), l.parser.poly.getBBox()
            }
        }), l.PathArray = function(t, e) {
            this.constructor.call(this, t, e)
        }, l.PathArray.prototype = new l.Array, l.extend(l.PathArray, {
            toString: function() {
                return h(this.value)
            },
            move: function(t, e) {
                var i = this.bbox();
                if (t -= i.x, e -= i.y, !isNaN(t) && !isNaN(e))
                    for (var n, r = this.value.length - 1; r >= 0; r--) n = this.value[r][0], "M" == n || "L" == n || "T" == n ? (this.value[r][1] += t, this.value[r][2] += e) : "H" == n ? this.value[r][1] += t : "V" == n ? this.value[r][1] += e : "C" == n || "S" == n || "Q" == n ? (this.value[r][1] += t, this.value[r][2] += e, this.value[r][3] += t, this.value[r][4] += e, "C" == n && (this.value[r][5] += t, this.value[r][6] += e)) : "A" == n && (this.value[r][6] += t, this.value[r][7] += e);
                return this
            },
            size: function(t, e) {
                var i, n, r = this.bbox();
                for (i = this.value.length - 1; i >= 0; i--) n = this.value[i][0], "M" == n || "L" == n || "T" == n ? (this.value[i][1] = (this.value[i][1] - r.x) * t / r.width + r.x, this.value[i][2] = (this.value[i][2] - r.y) * e / r.height + r.y) : "H" == n ? this.value[i][1] = (this.value[i][1] - r.x) * t / r.width + r.x : "V" == n ? this.value[i][1] = (this.value[i][1] - r.y) * e / r.height + r.y : "C" == n || "S" == n || "Q" == n ? (this.value[i][1] = (this.value[i][1] - r.x) * t / r.width + r.x, this.value[i][2] = (this.value[i][2] - r.y) * e / r.height + r.y, this.value[i][3] = (this.value[i][3] - r.x) * t / r.width + r.x, this.value[i][4] = (this.value[i][4] - r.y) * e / r.height + r.y, "C" == n && (this.value[i][5] = (this.value[i][5] - r.x) * t / r.width + r.x, this.value[i][6] = (this.value[i][6] - r.y) * e / r.height + r.y)) : "A" == n && (this.value[i][1] = this.value[i][1] * t / r.width, this.value[i][2] = this.value[i][2] * e / r.height, this.value[i][6] = (this.value[i][6] - r.x) * t / r.width + r.x, this.value[i][7] = (this.value[i][7] - r.y) * e / r.height + r.y);
                return this
            },
            parse: function(t) {
                if (t instanceof l.PathArray) return t.valueOf();
                var e, i, n, r, s, o, a, u, c, f, d, p = 0,
                    m = 0;
                for (l.parser.path.setAttribute("d", "string" == typeof t ? t : h(t)), d = l.parser.path.pathSegList, e = 0, i = d.numberOfItems; i > e; ++e) f = d.getItem(e), c = f.pathSegTypeAsLetter, "M" == c || "L" == c || "H" == c || "V" == c || "C" == c || "S" == c || "Q" == c || "T" == c || "A" == c ? ("x" in f && (p = f.x), "y" in f && (m = f.y)) : ("x1" in f && (s = p + f.x1), "x2" in f && (a = p + f.x2), "y1" in f && (o = m + f.y1), "y2" in f && (u = m + f.y2), "x" in f && (p += f.x), "y" in f && (m += f.y), "m" == c ? d.replaceItem(l.parser.path.createSVGPathSegMovetoAbs(p, m), e) : "l" == c ? d.replaceItem(l.parser.path.createSVGPathSegLinetoAbs(p, m), e) : "h" == c ? d.replaceItem(l.parser.path.createSVGPathSegLinetoHorizontalAbs(p), e) : "v" == c ? d.replaceItem(l.parser.path.createSVGPathSegLinetoVerticalAbs(m), e) : "c" == c ? d.replaceItem(l.parser.path.createSVGPathSegCurvetoCubicAbs(p, m, s, o, a, u), e) : "s" == c ? d.replaceItem(l.parser.path.createSVGPathSegCurvetoCubicSmoothAbs(p, m, a, u), e) : "q" == c ? d.replaceItem(l.parser.path.createSVGPathSegCurvetoQuadraticAbs(p, m, s, o), e) : "t" == c ? d.replaceItem(l.parser.path.createSVGPathSegCurvetoQuadraticSmoothAbs(p, m), e) : "a" == c ? d.replaceItem(l.parser.path.createSVGPathSegArcAbs(p, m, f.r1, f.r2, f.angle, f.largeArcFlag, f.sweepFlag), e) : ("z" == c || "Z" == c) && (p = n, m = r)), ("M" == c || "m" == c) && (n = p, r = m);
                for (t = [], d = l.parser.path.pathSegList, e = 0, i = d.numberOfItems; i > e; ++e) f = d.getItem(e), c = f.pathSegTypeAsLetter, p = [c], "M" == c || "L" == c || "T" == c ? p.push(f.x, f.y) : "H" == c ? p.push(f.x) : "V" == c ? p.push(f.y) : "C" == c ? p.push(f.x1, f.y1, f.x2, f.y2, f.x, f.y) : "S" == c ? p.push(f.x2, f.y2, f.x, f.y) : "Q" == c ? p.push(f.x1, f.y1, f.x, f.y) : "A" == c && p.push(f.r1, f.r2, f.angle, 0 | f.largeArcFlag, 0 | f.sweepFlag, f.x, f.y), t.push(p);
                return t
            },
            bbox: function() {
                return l.parser.path.setAttribute("d", this.toString()), l.parser.path.getBBox()
            }
        }), l.Number = function(t) {
            if (this.value = 0, this.unit = "", "number" == typeof t) this.value = isNaN(t) ? 0 : isFinite(t) ? t : 0 > t ? -3.4e38 : 3.4e38;
            else if ("string" == typeof t) {
                var e = t.match(l.regex.unit);
                e && (this.value = parseFloat(e[1]), "%" == e[2] ? this.value /= 100 : "s" == e[2] && (this.value *= 1e3), this.unit = e[2])
            } else t instanceof l.Number && (this.value = t.value, this.unit = t.unit)
        }, l.extend(l.Number, {
            toString: function() {
                return ("%" == this.unit ? ~~(1e8 * this.value) / 1e6 : "s" == this.unit ? this.value / 1e3 : this.value) + this.unit
            },
            valueOf: function() {
                return this.value
            },
            plus: function(t) {
                return this.value = this + new l.Number(t), this
            },
            minus: function(t) {
                return this.plus(-new l.Number(t))
            },
            times: function(t) {
                return this.value = this * new l.Number(t), this
            },
            divide: function(t) {
                return this.value = this / new l.Number(t), this
            },
            to: function(t) {
                return "string" == typeof t && (this.unit = t), this
            },
            morph: function(t) {
                return this.destination = new l.Number(t), this
            },
            at: function(t) {
                return this.destination ? new l.Number(this.destination).minus(this).times(t).plus(this) : this
            }
        }), l.ViewBox = function(t) {
            var e, i, n, r, s = 1,
                h = 1,
                o = t.bbox(),
                a = (t.attr("viewBox") || "").match(/-?[\d\.]+/g),
                u = t,
                c = t;
            for (n = new l.Number(t.width()), r = new l.Number(t.height());
                "%" == n.unit;) s *= n.value, n = new l.Number(u instanceof l.Doc ? u.parent.offsetWidth : u.parent.width()), u = u.parent;
            for (;
                "%" == r.unit;) h *= r.value, r = new l.Number(c instanceof l.Doc ? c.parent.offsetHeight : c.parent.height()), c = c.parent;
            this.x = o.x, this.y = o.y, this.width = n * s, this.height = r * h, this.zoom = 1, a && (e = parseFloat(a[0]), i = parseFloat(a[1]), n = parseFloat(a[2]), r = parseFloat(a[3]), this.zoom = this.width / this.height > n / r ? this.height / r : this.width / n, this.x = e, this.y = i, this.width = n, this.height = r)
        }, l.extend(l.ViewBox, {
            toString: function() {
                return this.x + " " + this.y + " " + this.width + " " + this.height
            }
        }), l.BBox = function(t) {
            var e;
            if (this.x = 0, this.y = 0, this.width = 0, this.height = 0, t) {
                try {
                    e = t.node.getBBox()
                } catch (i) {
                    e = {
                        x: t.node.clientLeft,
                        y: t.node.clientTop,
                        width: t.node.clientWidth,
                        height: t.node.clientHeight
                    }
                }
                this.x = e.x + t.trans.x, this.y = e.y + t.trans.y, this.width = e.width * t.trans.scaleX, this.height = e.height * t.trans.scaleY
            }
            o(this)
        }, l.extend(l.BBox, {
            merge: function(t) {
                var e = new l.BBox;
                return e.x = Math.min(this.x, t.x), e.y = Math.min(this.y, t.y), e.width = Math.max(this.x + this.width, t.x + t.width) - e.x, e.height = Math.max(this.y + this.height, t.y + t.height) - e.y, o(e), e
            }
        }), l.RBox = function(t) {
            var e, i, n = {};
            if (this.x = 0, this.y = 0, this.width = 0, this.height = 0, t) {
                for (e = t.doc().parent, i = t.doc().viewbox().zoom, n = t.node.getBoundingClientRect(), this.x = n.left, this.y = n.top, this.x -= e.offsetLeft, this.y -= e.offsetTop; e = e.offsetParent;) this.x -= e.offsetLeft, this.y -= e.offsetTop;
                for (e = t; e = e.parent;) "svg" == e.type && e.viewbox && (i *= e.viewbox().zoom, this.x -= e.x() || 0, this.y -= e.y() || 0)
            }
            this.x /= i, this.y /= i, this.width = n.width /= i, this.height = n.height /= i, this.x += "number" == typeof window.scrollX ? window.scrollX : window.pageXOffset, this.y += "number" == typeof window.scrollY ? window.scrollY : window.pageYOffset, o(this)
        }, l.extend(l.RBox, {
            merge: function(t) {
                var e = new l.RBox;
                return e.x = Math.min(this.x, t.x), e.y = Math.min(this.y, t.y), e.width = Math.max(this.x + this.width, t.x + t.width) - e.x, e.height = Math.max(this.y + this.height, t.y + t.height) - e.y, o(e), e
            }
        }), l.Element = l.invent({
            create: function(t) {
                this._stroke = l.defaults.attrs.stroke, this.trans = l.defaults.trans(), (this.node = t) && (this.type = t.nodeName, this.node.instance = this)
            },
            extend: {
                x: function(t) {
                    return null != t && (t = new l.Number(t), t.value /= this.trans.scaleX), this.attr("x", t)
                },
                y: function(t) {
                    return null != t && (t = new l.Number(t), t.value /= this.trans.scaleY), this.attr("y", t)
                },
                cx: function(t) {
                    return null == t ? this.x() + this.width() / 2 : this.x(t - this.width() / 2)
                },
                cy: function(t) {
                    return null == t ? this.y() + this.height() / 2 : this.y(t - this.height() / 2)
                },
                move: function(t, e) {
                    return this.x(t).y(e)
                },
                center: function(t, e) {
                    return this.cx(t).cy(e)
                },
                width: function(t) {
                    return this.attr("width", t)
                },
                height: function(t) {
                    return this.attr("height", t)
                },
                size: function(t, e) {
                    var i = r(this.bbox(), t, e);
                    return this.width(new l.Number(i.width)).height(new l.Number(i.height))
                },
                clone: function() {
                    var t, e, i = this.type;
                    return t = "rect" == i || "ellipse" == i ? this.parent[i](0, 0) : "line" == i ? this.parent[i](0, 0, 0, 0) : "image" == i ? this.parent[i](this.src) : "text" == i ? this.parent[i](this.content) : "path" == i ? this.parent[i](this.attr("d")) : "polyline" == i || "polygon" == i ? this.parent[i](this.attr("points")) : "g" == i ? this.parent.group() : this.parent[i](), e = this.attr(), delete e.id, t.attr(e), t.trans = this.trans, t.transform({})
                },
                remove: function() {
                    return this.parent && this.parent.removeElement(this), this
                },
                replace: function(t) {
                    return this.after(t).remove(), t
                },
                addTo: function(t) {
                    return t.put(this)
                },
                putIn: function(t) {
                    return t.add(this)
                },
                doc: function(t) {
                    return this._parent(t || l.Doc)
                },
                attr: function(t, e, i) {
                    if (null == t) {
                        for (t = {}, e = this.node.attributes, i = e.length - 1; i >= 0; i--) t[e[i].nodeName] = l.regex.isNumber.test(e[i].nodeValue) ? parseFloat(e[i].nodeValue) : e[i].nodeValue;
                        return t
                    }
                    if ("object" == typeof t)
                        for (e in t) this.attr(e, t[e]);
                    else if (null === e) this.node.removeAttribute(t);
                    else {
                        if (null == e) return e = this.node.attributes[t], null == e ? l.defaults.attrs[t] : l.regex.isNumber.test(e.nodeValue) ? parseFloat(e.nodeValue) : e.nodeValue;
                        if ("style" == t) return this.style(e);
                        "stroke-width" == t ? this.attr("stroke", parseFloat(e) > 0 ? this._stroke : null) : "stroke" == t && (this._stroke = e), ("fill" == t || "stroke" == t) && (l.regex.isImage.test(e) && (e = this.doc().defs().image(e, 0, 0)), e instanceof l.Image && (e = this.doc().defs().pattern(0, 0, function() {
                            this.add(e)
                        }))), "number" == typeof e ? e = new l.Number(e) : l.Color.isColor(e) ? e = new l.Color(e) : Array.isArray(e) && (e = new l.Array(e)), "leading" == t ? this.leading && this.leading(e) : "string" == typeof i ? this.node.setAttributeNS(i, t, e.toString()) : this.node.setAttribute(t, e.toString()), !this.rebuild || "font-size" != t && "x" != t || this.rebuild(t, e)
                    }
                    return this
                },
                transform: function(t, e) {
                    if (0 == arguments.length) return this.trans;
                    if ("string" == typeof t) {
                        if (arguments.length < 2) return this.trans[t];
                        var i = {};
                        return i[t] = e, this.transform(i)
                    }
                    var i = [];
                    t = a(t);
                    for (e in t) null != t[e] && (this.trans[e] = t[e]);
                    return this.trans.matrix = this.trans.a + " " + this.trans.b + " " + this.trans.c + " " + this.trans.d + " " + this.trans.e + " " + this.trans.f, t = this.trans, t.matrix != l.defaults.matrix && i.push("matrix(" + t.matrix + ")"), 0 != t.rotation && i.push("rotate(" + t.rotation + " " + (null == t.cx ? this.bbox().cx : t.cx) + " " + (null == t.cy ? this.bbox().cy : t.cy) + ")"), (1 != t.scaleX || 1 != t.scaleY) && i.push("scale(" + t.scaleX + " " + t.scaleY + ")"), 0 != t.skewX && i.push("skewX(" + t.skewX + ")"), 0 != t.skewY && i.push("skewY(" + t.skewY + ")"), (0 != t.x || 0 != t.y) && i.push("translate(" + new l.Number(t.x / t.scaleX) + " " + new l.Number(t.y / t.scaleY) + ")"), 0 == i.length ? this.node.removeAttribute("transform") : this.node.setAttribute("transform", i.join(" ")), this
                },
                style: function(t, i) {
                    if (0 == arguments.length) return this.node.style.cssText || "";
                    if (arguments.length < 2)
                        if ("object" == typeof t)
                            for (i in t) this.style(i, t[i]);
                        else {
                            if (!l.regex.isCss.test(t)) return this.node.style[e(t)];
                            t = t.split(";");
                            for (var n = 0; n < t.length; n++) i = t[n].split(":"), this.style(i[0].replace(/\s+/g, ""), i[1])
                        } else this.node.style[e(t)] = null === i || l.regex.isBlank.test(i) ? "" : i;
                    return this
                },
                id: function(t) {
                    return this.attr("id", t)
                },
                bbox: function() {
                    return new l.BBox(this)
                },
                rbox: function() {
                    return new l.RBox(this)
                },
                inside: function(t, e) {
                    var i = this.bbox();
                    return t > i.x && e > i.y && t < i.x + i.width && e < i.y + i.height
                },
                show: function() {
                    return this.style("display", "")
                },
                hide: function() {
                    return this.style("display", "none")
                },
                visible: function() {
                    return "none" != this.style("display")
                },
                toString: function() {
                    return this.attr("id")
                },
                classes: function() {
                    var t = this.node.getAttribute("class");
                    return null === t ? [] : t.trim().split(/\s+/)
                },
                hasClass: function(t) {
                    return -1 != this.classes().indexOf(t)
                },
                addClass: function(t) {
                    var e;
                    return this.hasClass(t) || (e = this.classes(), e.push(t), this.node.setAttribute("class", e.join(" "))), this
                },
                removeClass: function(t) {
                    var e;
                    return this.hasClass(t) && (e = this.classes().filter(function(e) {
                        return e != t
                    }), this.node.setAttribute("class", e.join(" "))), this
                },
                toggleClass: function(t) {
                    return this.hasClass(t) ? this.removeClass(t) : this.addClass(t), this
                },
                reference: function(t) {
                    return l.get(this.attr()[t])
                },
                _parent: function(t) {
                    for (var e = this; null != e && !(e instanceof t);) e = e.parent;
                    return e
                }
            }
        }), l.Parent = l.invent({
            create: function(t) {
                this.constructor.call(this, t)
            },
            inherit: l.Element,
            extend: {
                children: function() {
                    return this._children || (this._children = [])
                },
                add: function(t, e) {
                    return this.has(t) || (e = null == e ? this.children().length : e, t.parent && t.parent.children().splice(t.parent.index(t), 1), this.children().splice(e, 0, t), this.node.insertBefore(t.node, this.node.childNodes[e] || null), t.parent = this), this._defs && (this.node.removeChild(this._defs.node), this.node.appendChild(this._defs.node)), this
                },
                put: function(t, e) {
                    return this.add(t, e), t
                },
                has: function(t) {
                    return this.index(t) >= 0
                },
                index: function(t) {
                    return this.children().indexOf(t)
                },
                get: function(t) {
                    return this.children()[t]
                },
                first: function() {
                    return this.children()[0]
                },
                last: function() {
                    return this.children()[this.children().length - 1]
                },
                each: function(t, e) {
                    var i, n, r = this.children();
                    for (i = 0, n = r.length; n > i; i++) r[i] instanceof l.Element && t.apply(r[i], [i, r]), e && r[i] instanceof l.Container && r[i].each(t, e);
                    return this
                },
                removeElement: function(t) {
                    return this.children().splice(this.index(t), 1), this.node.removeChild(t.node), t.parent = null, this
                },
                clear: function() {
                    for (var t = this.children().length - 1; t >= 0; t--) this.removeElement(this.children()[t]);
                    return this._defs && this._defs.clear(), this
                },
                defs: function() {
                    return this.doc().defs()
                }
            }
        }), l.Container = l.invent({
            create: function(t) {
                this.constructor.call(this, t)
            },
            inherit: l.Parent,
            extend: {
                viewbox: function(t) {
                    return 0 == arguments.length ? new l.ViewBox(this) : (t = 1 == arguments.length ? [t.x, t.y, t.width, t.height] : [].slice.call(arguments), this.attr("viewBox", t))
                }
            }
        }), l.FX = l.invent({
            create: function(t) {
                this.target = t
            },
            extend: {
                animate: function(t, e, i) {
                    var n, r, h, o, a = this.target,
                        u = this;
                    return "object" == typeof t && (i = t.delay, e = t.ease, t = t.duration), t = "=" == t ? t : null == t ? 1e3 : new l.Number(t).valueOf(), e = e || "<>", u.to = function(t) {
                        var i;
                        if (t = 0 > t ? 0 : t > 1 ? 1 : t, null == n) {
                            n = [];
                            for (o in u.attrs) n.push(o);
                            if (a.morphArray && (u._plot || n.indexOf("points") > -1)) {
                                var l, c = new a.morphArray(u._plot || u.attrs.points || a.array);
                                u._size && c.size(u._size.width.to, u._size.height.to), l = c.bbox(), u._x ? c.move(u._x.to, l.y) : u._cx && c.move(u._cx.to - l.width / 2, l.y), l = c.bbox(), u._y ? c.move(l.x, u._y.to) : u._cy && c.move(l.x, u._cy.to - l.height / 2), delete u._x, delete u._y, delete u._cx, delete u._cy, delete u._size, u._plot = a.array.morph(c)
                            }
                        }
                        if (null == r) {
                            r = [];
                            for (o in u.trans) r.push(o)
                        }
                        if (null == h) {
                            h = [];
                            for (o in u.styles) h.push(o)
                        }
                        for (t = "<>" == e ? -Math.cos(t * Math.PI) / 2 + .5 : ">" == e ? Math.sin(t * Math.PI / 2) : "<" == e ? -Math.cos(t * Math.PI / 2) + 1 : "-" == e ? t : "function" == typeof e ? e(t) : t, u._plot ? a.plot(u._plot.at(t)) : (u._x ? a.x(u._x.at(t)) : u._cx && a.cx(u._cx.at(t)), u._y ? a.y(u._y.at(t)) : u._cy && a.cy(u._cy.at(t)), u._size && a.size(u._size.width.at(t), u._size.height.at(t))), u._viewbox && a.viewbox(u._viewbox.x.at(t), u._viewbox.y.at(t), u._viewbox.width.at(t), u._viewbox.height.at(t)), u._leading && a.leading(u._leading.at(t)), i = n.length - 1; i >= 0; i--) a.attr(n[i], s(u.attrs[n[i]], t));
                        for (i = r.length - 1; i >= 0; i--) a.transform(r[i], s(u.trans[r[i]], t));
                        for (i = h.length - 1; i >= 0; i--) a.style(h[i], s(u.styles[h[i]], t));
                        u._during && u._during.call(a, t, function(e, i) {
                            return s({
                                from: e,
                                to: i
                            }, t)
                        })
                    }, "number" == typeof t && (this.timeout = setTimeout(function() {
                        var n = (new Date).getTime();
                        u.situation = {
                            interval: 1e3 / 60,
                            start: n,
                            play: !0,
                            finish: n + t,
                            duration: t
                        }, u.render = function() {
                            if (u.situation.play === !0) {
                                var n = (new Date).getTime(),
                                    r = n > u.situation.finish ? 1 : (n - u.situation.start) / t;
                                u.to(r), n > u.situation.finish ? (u._plot && a.plot(new l.PointArray(u._plot.destination).settle()), u._loop === !0 || "number" == typeof u._loop && u._loop > 1 ? ("number" == typeof u._loop && --u._loop, u.animate(t, e, i)) : u._after ? u._after.apply(a, [u]) : u.stop()) : u.animationFrame = requestAnimationFrame(u.render)
                            } else u.animationFrame = requestAnimationFrame(u.render)
                        }, u.render()
                    }, new l.Number(i).valueOf())), this
                },
                bbox: function() {
                    return this.target.bbox()
                },
                attr: function(t, e) {
                    if ("object" == typeof t)
                        for (var i in t) this.attr(i, t[i]);
                    else {
                        var n = this.target.attr(t);
                        this.attrs[t] = l.Color.isColor(n) ? new l.Color(n).morph(e) : l.regex.unit.test(n) ? new l.Number(n).morph(e) : {
                            from: n,
                            to: e
                        }
                    }
                    return this
                },
                transform: function(t, e) {
                    if (1 == arguments.length) {
                        t = a(t), delete t.matrix, this.target.trans.cx = t.cx || null, this.target.trans.cy = t.cy || null, delete t.cx, delete t.cy;
                        for (e in t) this.trans[e] = {
                            from: this.target.trans[e],
                            to: t[e]
                        }
                    } else {
                        var i = {};
                        i[t] = e, this.transform(i)
                    }
                    return this
                },
                style: function(t, e) {
                    if ("object" == typeof t)
                        for (var i in t) this.style(i, t[i]);
                    else this.styles[t] = {
                        from: this.target.style(t),
                        to: e
                    };
                    return this
                },
                x: function(t) {
                    return this._x = new l.Number(this.target.x()).morph(t), this
                },
                y: function(t) {
                    return this._y = new l.Number(this.target.y()).morph(t), this
                },
                cx: function(t) {
                    return this._cx = new l.Number(this.target.cx()).morph(t), this
                },
                cy: function(t) {
                    return this._cy = new l.Number(this.target.cy()).morph(t), this
                },
                move: function(t, e) {
                    return this.x(t).y(e)
                },
                center: function(t, e) {
                    return this.cx(t).cy(e)
                },
                size: function(t, e) {
                    if (this.target instanceof l.Text) this.attr("font-size", t);
                    else {
                        var i = this.target.bbox();
                        this._size = {
                            width: new l.Number(i.width).morph(t),
                            height: new l.Number(i.height).morph(e)
                        }
                    }
                    return this
                },
                plot: function(t) {
                    return this._plot = t, this
                },
                leading: function(t) {
                    return this.target._leading && (this._leading = new l.Number(this.target._leading).morph(t)), this
                },
                viewbox: function(t, e, i, n) {
                    if (this.target instanceof l.Container) {
                        var r = this.target.viewbox();
                        this._viewbox = {
                            x: new l.Number(r.x).morph(t),
                            y: new l.Number(r.y).morph(e),
                            width: new l.Number(r.width).morph(i),
                            height: new l.Number(r.height).morph(n)
                        }
                    }
                    return this
                },
                update: function(t) {
                    return this.target instanceof l.Stop && (null != t.opacity && this.attr("stop-opacity", t.opacity), null != t.color && this.attr("stop-color", t.color), null != t.offset && this.attr("offset", new l.Number(t.offset))), this
                },
                during: function(t) {
                    return this._during = t, this
                },
                after: function(t) {
                    return this._after = t, this
                },
                loop: function(t) {
                    return this._loop = t || !0, this
                },
                stop: function(t) {
                    return t === !0 ? (this.animate(0), this._after && this._after.apply(this.target, [this])) : (clearTimeout(this.timeout), cancelAnimationFrame(this.animationFrame), this.attrs = {}, this.trans = {}, this.styles = {}, this.situation = {}, delete this._x, delete this._y, delete this._cx, delete this._cy, delete this._size, delete this._plot, delete this._loop, delete this._after, delete this._during, delete this._leading, delete this._viewbox), this
                },
                pause: function() {
                    return this.situation.play === !0 && (this.situation.play = !1, this.situation.pause = (new Date).getTime()), this
                },
                play: function() {
                    if (this.situation.play === !1) {
                        var t = (new Date).getTime() - this.situation.pause;
                        this.situation.finish += t, this.situation.start += t, this.situation.play = !0
                    }
                    return this
                }
            },
            parent: l.Element,
            construct: {
                animate: function(t, e, i) {
                    return (this.fx || (this.fx = new l.FX(this))).stop().animate(t, e, i)
                },
                stop: function(t) {
                    return this.fx && this.fx.stop(t), this
                },
                pause: function() {
                    return this.fx && this.fx.pause(), this
                },
                play: function() {
                    return this.fx && this.fx.play(), this
                }
            }
        }), l.extend(l.Element, l.FX, {
            dx: function(t) {
                return this.x((this.target || this).x() + t)
            },
            dy: function(t) {
                return this.y((this.target || this).y() + t)
            },
            dmove: function(t, e) {
                return this.dx(t).dy(e)
            }
        }), ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "touchstart", "touchmove", "touchleave", "touchend", "touchcancel"].forEach(function(t) {
            l.Element.prototype[t] = function(e) {
                var i = this;
                return this.node["on" + t] = "function" == typeof e ? function() {
                    return e.apply(i, arguments)
                } : null, this
            }
        }), l.listeners = [], l.handlerMap = [], l.registerEvent = function() {}, l.on = function(t, e, i) {
            var n = i.bind(t.instance || t),
                r = (l.handlerMap.indexOf(t) + 1 || l.handlerMap.push(t)) - 1,
                s = e.split(".")[0],
                h = e.split(".")[1] || "*";
            l.listeners[r] = l.listeners[r] || {}, l.listeners[r][s] = l.listeners[r][s] || {}, l.listeners[r][s][h] = l.listeners[r][s][h] || {}, l.listeners[r][s][h][i] = n, t.addEventListener(s, n, !1)
        }, l.off = function(t, e, i) {
            var n = l.handlerMap.indexOf(t),
                r = e && e.split(".")[0],
                s = e && e.split(".")[1];
            if (-1 != n)
                if (i) l.listeners[n][r] && l.listeners[n][r][s || "*"] && (t.removeEventListener(r, l.listeners[n][r][s || "*"][i], !1), delete l.listeners[n][r][s || "*"][i]);
                else if (s) {
                if (l.listeners[n][r] && l.listeners[n][r][s]) {
                    for (i in l.listeners[n][r][s]) l.off(t, [r, s].join("."), i);
                    delete l.listeners[n][r][s]
                }
            } else if (r) {
                if (l.listeners[n][r]) {
                    for (namespace in l.listeners[n][r]) l.off(t, [r, namespace].join("."));
                    delete l.listeners[n][r]
                }
            } else {
                for (e in l.listeners[n]) l.off(t, e);
                delete l.listeners[n]
            }
        }, l.extend(l.Element, {
            on: function(t, e) {
                return l.on(this.node, t, e), this
            },
            off: function(t, e) {
                return l.off(this.node, t, e), this
            },
            fire: function(e, i) {
                return this.node.dispatchEvent(new t(e, {
                    detail: i
                })), this
            }
        }), l.Defs = l.invent({
            create: "defs",
            inherit: l.Container
        }), l.G = l.invent({
            create: "g",
            inherit: l.Container,
            extend: {
                x: function(t) {
                    return null == t ? this.trans.x : this.transform("x", t)
                },
                y: function(t) {
                    return null == t ? this.trans.y : this.transform("y", t)
                },
                cx: function(t) {
                    return null == t ? this.bbox().cx : this.x(t - this.bbox().width / 2)
                },
                cy: function(t) {
                    return null == t ? this.bbox().cy : this.y(t - this.bbox().height / 2)
                }
            },
            construct: {
                group: function() {
                    return this.put(new l.G)
                }
            }
        }), l.extend(l.Element, {
            siblings: function() {
                return this.parent.children()
            },
            position: function() {
                return this.parent.index(this)
            },
            next: function() {
                return this.siblings()[this.position() + 1]
            },
            previous: function() {
                return this.siblings()[this.position() - 1]
            },
            forward: function() {
                var t = this.position();
                return this.parent.removeElement(this).put(this, t + 1)
            },
            backward: function() {
                var t = this.position();
                return t > 0 && this.parent.removeElement(this).add(this, t - 1), this
            },
            front: function() {
                return this.parent.removeElement(this).put(this)
            },
            back: function() {
                return this.position() > 0 && this.parent.removeElement(this).add(this, 0), this
            },
            before: function(t) {
                t.remove();
                var e = this.position();
                return this.parent.add(t, e), this
            },
            after: function(t) {
                t.remove();
                var e = this.position();
                return this.parent.add(t, e + 1), this
            }
        }), l.Mask = l.invent({
            create: function() {
                this.constructor.call(this, l.create("mask")), this.targets = []
            },
            inherit: l.Container,
            extend: {
                remove: function() {
                    for (var t = this.targets.length - 1; t >= 0; t--) this.targets[t] && this.targets[t].unmask();
                    return delete this.targets, this.parent.removeElement(this), this
                }
            },
            construct: {
                mask: function() {
                    return this.defs().put(new l.Mask)
                }
            }
        }), l.extend(l.Element, {
            maskWith: function(t) {
                return this.masker = t instanceof l.Mask ? t : this.parent.mask().add(t), this.masker.targets.push(this), this.attr("mask", 'url("#' + this.masker.attr("id") + '")')
            },
            unmask: function() {
                return delete this.masker, this.attr("mask", null)
            }
        }), l.Clip = l.invent({
            create: function() {
                this.constructor.call(this, l.create("clipPath")), this.targets = []
            },
            inherit: l.Container,
            extend: {
                remove: function() {
                    for (var t = this.targets.length - 1; t >= 0; t--) this.targets[t] && this.targets[t].unclip();
                    return delete this.targets, this.parent.removeElement(this), this
                }
            },
            construct: {
                clip: function() {
                    return this.defs().put(new l.Clip)
                }
            }
        }), l.extend(l.Element, {
            clipWith: function(t) {
                return this.clipper = t instanceof l.Clip ? t : this.parent.clip().add(t), this.clipper.targets.push(this), this.attr("clip-path", 'url("#' + this.clipper.attr("id") + '")')
            },
            unclip: function() {
                return delete this.clipper, this.attr("clip-path", null)
            }
        }), l.Gradient = l.invent({
            create: function(t) {
                this.constructor.call(this, l.create(t + "Gradient")), this.type = t
            },
            inherit: l.Container,
            extend: {
                from: function(t, e) {
                    return this.attr("radial" == this.type ? {
                        fx: new l.Number(t),
                        fy: new l.Number(e)
                    } : {
                        x1: new l.Number(t),
                        y1: new l.Number(e)
                    })
                },
                to: function(t, e) {
                    return this.attr("radial" == this.type ? {
                        cx: new l.Number(t),
                        cy: new l.Number(e)
                    } : {
                        x2: new l.Number(t),
                        y2: new l.Number(e)
                    })
                },
                radius: function(t) {
                    return "radial" == this.type ? this.attr({
                        r: new l.Number(t)
                    }) : this
                },
                at: function(t, e, i) {
                    return this.put(new l.Stop).update(t, e, i)
                },
                update: function(t) {
                    return this.clear(), "function" == typeof t && t.call(this, this), this
                },
                fill: function() {
                    return "url(#" + this.id() + ")"
                },
                toString: function() {
                    return this.fill()
                }
            },
            construct: {
                gradient: function(t, e) {
                    return this.defs().gradient(t, e)
                }
            }
        }), l.extend(l.Defs, {
            gradient: function(t, e) {
                return this.put(new l.Gradient(t)).update(e)
            }
        }), l.Stop = l.invent({
            create: "stop",
            inherit: l.Element,
            extend: {
                update: function(t) {
                    return ("number" == typeof t || t instanceof l.Number) && (t = {
                        offset: arguments[0],
                        color: arguments[1],
                        opacity: arguments[2]
                    }), null != t.opacity && this.attr("stop-opacity", t.opacity), null != t.color && this.attr("stop-color", t.color), null != t.offset && this.attr("offset", new l.Number(t.offset)), this
                }
            }
        }), l.Pattern = l.invent({
            create: "pattern",
            inherit: l.Container,
            extend: {
                fill: function() {
                    return "url(#" + this.id() + ")"
                },
                update: function(t) {
                    return this.clear(), "function" == typeof t && t.call(this, this), this
                },
                toString: function() {
                    return this.fill()
                }
            },
            construct: {
                pattern: function(t, e, i) {
                    return this.defs().pattern(t, e, i)
                }
            }
        }), l.extend(l.Defs, {
            pattern: function(t, e, i) {
                return this.put(new l.Pattern).update(i).attr({
                    x: 0,
                    y: 0,
                    width: t,
                    height: e,
                    patternUnits: "userSpaceOnUse"
                })
            }
        }), l.Doc = l.invent({
            create: function(t) {
                this.parent = "string" == typeof t ? document.getElementById(t) : t, this.constructor.call(this, "svg" == this.parent.nodeName ? this.parent : l.create("svg")), this.attr({
                    xmlns: l.ns,
                    version: "1.1",
                    width: "100%",
                    height: "100%"
                }).attr("xmlns:xlink", l.xlink, l.xmlns), this._defs = new l.Defs, this._defs.parent = this, this.node.appendChild(this._defs.node), this.doSpof = !1, this.parent != this.node && this.stage()
            },
            inherit: l.Container,
            extend: {
                stage: function() {
                    var t = this;
                    return this.parent.appendChild(this.node), t.spof(), l.on(window, "resize", function() {
                        t.spof()
                    }), this
                },
                defs: function() {
                    return this._defs
                },
                spof: function() {
                    if (this.doSpof) {
                        var t = this.node.getScreenCTM();
                        t && this.style("left", -t.e % 1 + "px").style("top", -t.f % 1 + "px")
                    }
                    return this
                },
                fixSubPixelOffset: function() {
                    return this.doSpof = !0, this
                },
                remove: function() {
                    return this.parent && (this.parent.removeChild(this.node), this.parent = null), this
                }
            }
        }), l.Shape = l.invent({
            create: function(t) {
                this.constructor.call(this, t)
            },
            inherit: l.Element
        }), l.Symbol = l.invent({
            create: "symbol",
            inherit: l.Container,
            construct: {
                symbol: function() {
                    return this.defs().put(new l.Symbol)
                }
            }
        }), l.Use = l.invent({
            create: "use",
            inherit: l.Shape,
            extend: {
                element: function(t) {
                    return this.target = t, this.attr("href", "#" + t, l.xlink)
                }
            },
            construct: {
                use: function(t) {
                    return this.put(new l.Use).element(t)
                }
            }
        }), l.Rect = l.invent({
            create: "rect",
            inherit: l.Shape,
            construct: {
                rect: function(t, e) {
                    return this.put((new l.Rect).size(t, e))
                }
            }
        }), l.Ellipse = l.invent({
            create: "ellipse",
            inherit: l.Shape,
            extend: {
                x: function(t) {
                    return null == t ? this.cx() - this.attr("rx") : this.cx(t + this.attr("rx"))
                },
                y: function(t) {
                    return null == t ? this.cy() - this.attr("ry") : this.cy(t + this.attr("ry"))
                },
                cx: function(t) {
                    return null == t ? this.attr("cx") : this.attr("cx", new l.Number(t).divide(this.trans.scaleX))
                },
                cy: function(t) {
                    return null == t ? this.attr("cy") : this.attr("cy", new l.Number(t).divide(this.trans.scaleY))
                },
                width: function(t) {
                    return null == t ? 2 * this.attr("rx") : this.attr("rx", new l.Number(t).divide(2))
                },
                height: function(t) {
                    return null == t ? 2 * this.attr("ry") : this.attr("ry", new l.Number(t).divide(2))
                },
                size: function(t, e) {
                    var i = r(this.bbox(), t, e);
                    return this.attr({
                        rx: new l.Number(i.width).divide(2),
                        ry: new l.Number(i.height).divide(2)
                    })
                }
            },
            construct: {
                circle: function(t) {
                    return this.ellipse(t, t)
                },
                ellipse: function(t, e) {
                    return this.put(new l.Ellipse).size(t, e).move(0, 0)
                }
            }
        }), l.Line = l.invent({
            create: "line",
            inherit: l.Shape,
            extend: {
                x: function(t) {
                    var e = this.bbox();
                    return null == t ? e.x : this.attr({
                        x1: this.attr("x1") - e.x + t,
                        x2: this.attr("x2") - e.x + t
                    })
                },
                y: function(t) {
                    var e = this.bbox();
                    return null == t ? e.y : this.attr({
                        y1: this.attr("y1") - e.y + t,
                        y2: this.attr("y2") - e.y + t
                    })
                },
                cx: function(t) {
                    var e = this.bbox().width / 2;
                    return null == t ? this.x() + e : this.x(t - e)
                },
                cy: function(t) {
                    var e = this.bbox().height / 2;
                    return null == t ? this.y() + e : this.y(t - e)
                },
                width: function(t) {
                    var e = this.bbox();
                    return null == t ? e.width : this.attr(this.attr("x1") < this.attr("x2") ? "x2" : "x1", e.x + t)
                },
                height: function(t) {
                    var e = this.bbox();
                    return null == t ? e.height : this.attr(this.attr("y1") < this.attr("y2") ? "y2" : "y1", e.y + t)
                },
                size: function(t, e) {
                    var i = r(this.bbox(), t, e);
                    return this.width(i.width).height(i.height)
                },
                plot: function(t, e, i, n) {
                    return this.attr({
                        x1: t,
                        y1: e,
                        x2: i,
                        y2: n
                    })
                }
            },
            construct: {
                line: function(t, e, i, n) {
                    return this.put((new l.Line).plot(t, e, i, n))
                }
            }
        }), l.Polyline = l.invent({
            create: "polyline",
            inherit: l.Shape,
            construct: {
                polyline: function(t) {
                    return this.put(new l.Polyline).plot(t)
                }
            }
        }), l.Polygon = l.invent({
            create: "polygon",
            inherit: l.Shape,
            construct: {
                polygon: function(t) {
                    return this.put(new l.Polygon).plot(t)
                }
            }
        }), l.extend(l.Polyline, l.Polygon, {
            morphArray: l.PointArray,
            plot: function(t) {
                return this.attr("points", this.array = new l.PointArray(t, [
                    [0, 0]
                ]))
            },
            move: function(t, e) {
                return this.attr("points", this.array.move(t, e))
            },
            x: function(t) {
                return null == t ? this.bbox().x : this.move(t, this.bbox().y)
            },
            y: function(t) {
                return null == t ? this.bbox().y : this.move(this.bbox().x, t)
            },
            width: function(t) {
                var e = this.bbox();
                return null == t ? e.width : this.size(t, e.height)
            },
            height: function(t) {
                var e = this.bbox();
                return null == t ? e.height : this.size(e.width, t)
            },
            size: function(t, e) {
                var i = r(this.bbox(), t, e);
                return this.attr("points", this.array.size(i.width, i.height))
            }
        }), l.Path = l.invent({
            create: "path",
            inherit: l.Shape,
            extend: {
                plot: function(t) {
                    return this.attr("d", this.array = new l.PathArray(t, [
                        ["M", 0, 0]
                    ]))
                },
                move: function(t, e) {
                    return this.attr("d", this.array.move(t, e))
                },
                x: function(t) {
                    return null == t ? this.bbox().x : this.move(t, this.bbox().y)
                },
                y: function(t) {
                    return null == t ? this.bbox().y : this.move(this.bbox().x, t)
                },
                size: function(t, e) {
                    var i = r(this.bbox(), t, e);
                    return this.attr("d", this.array.size(i.width, i.height))
                },
                width: function(t) {
                    return null == t ? this.bbox().width : this.size(t, this.bbox().height)
                },
                height: function(t) {
                    return null == t ? this.bbox().height : this.size(this.bbox().width, t)
                }
            },
            construct: {
                path: function(t) {
                    return this.put(new l.Path).plot(t)
                }
            }
        }), l.Image = l.invent({
            create: "image",
            inherit: l.Shape,
            extend: {
                load: function(t) {
                    if (!t) return this;
                    var e = this,
                        i = document.createElement("img");
                    return i.onload = function() {
                        var n = e.doc(l.Pattern);
                        0 == e.width() && 0 == e.height() && e.size(i.width, i.height), n && 0 == n.width() && 0 == n.height() && n.size(e.width(), e.height()), "function" == typeof e._loaded && e._loaded.call(e, {
                            width: i.width,
                            height: i.height,
                            ratio: i.width / i.height,
                            url: t
                        })
                    }, this.attr("href", i.src = this.src = t, l.xlink)
                },
                loaded: function(t) {
                    return this._loaded = t, this
                }
            },
            construct: {
                image: function(t, e, i) {
                    return this.put(new l.Image).load(t).size(e || 0, i || e || 0)
                }
            }
        }), l.Text = l.invent({
            create: function() {
                this.constructor.call(this, l.create("text")), this._leading = new l.Number(1.3), this._rebuild = !0, this._build = !1, this.attr("font-family", l.defaults.attrs["font-family"])
            },
            inherit: l.Shape,
            extend: {
                x: function(t) {
                    return null == t ? this.attr("x") : (this.textPath || this.lines.each(function() {
                        this.newLined && this.x(t)
                    }), this.attr("x", t))
                },
                y: function(t) {
                    var e = this.attr("y"),
                        i = "number" == typeof e ? e - this.bbox().y : 0;
                    return null == t ? "number" == typeof e ? e - i : e : this.attr("y", "number" == typeof t ? t + i : t)
                },
                cx: function(t) {
                    return null == t ? this.bbox().cx : this.x(t - this.bbox().width / 2)
                },
                cy: function(t) {
                    return null == t ? this.bbox().cy : this.y(t - this.bbox().height / 2)
                },
                text: function(t) {
                    if ("undefined" == typeof t) return this.content;
                    if (this.clear().build(!0), "function" == typeof t) t.call(this, this);
                    else {
                        t = (this.content = t).split("\n");
                        for (var e = 0, i = t.length; i > e; e++) this.tspan(t[e]).newLine()
                    }
                    return this.build(!1).rebuild()
                },
                size: function(t) {
                    return this.attr("font-size", t).rebuild()
                },
                leading: function(t) {
                    return null == t ? this._leading : (this._leading = new l.Number(t), this.rebuild())
                },
                rebuild: function(t) {
                    if ("boolean" == typeof t && (this._rebuild = t), this._rebuild) {
                        var e = this;
                        this.lines.each(function() {
                            this.newLined && (this.textPath || this.attr("x", e.attr("x")), this.attr("dy", e._leading * new l.Number(e.attr("font-size"))))
                        }), this.fire("rebuild")
                    }
                    return this
                },
                build: function(t) {
                    return this._build = !!t, this
                }
            },
            construct: {
                text: function(t) {
                    return this.put(new l.Text).text(t)
                },
                plain: function(t) {
                    return this.put(new l.Text).plain(t)
                }
            }
        }), l.TSpan = l.invent({
            create: "tspan",
            inherit: l.Shape,
            extend: {
                text: function(t) {
                    return "function" == typeof t ? t.call(this, this) : this.plain(t), this
                },
                dx: function(t) {
                    return this.attr("dx", t)
                },
                dy: function(t) {
                    return this.attr("dy", t)
                },
                newLine: function() {
                    var t = this.doc(l.Text);
                    return this.newLined = !0, this.dy(t._leading * t.attr("font-size")).attr("x", t.x())
                }
            }
        }), l.extend(l.Text, l.TSpan, {
            plain: function(t) {
                return this._build === !1 && this.clear(), this.node.appendChild(document.createTextNode(this.content = t)), this
            },
            tspan: function(t) {
                var e = (this.textPath || this).node,
                    i = new l.TSpan;
                return this._build === !1 && this.clear(), e.appendChild(i.node), i.parent = this, this instanceof l.Text && this.lines.add(i), i.text(t)
            },
            clear: function() {
                for (var t = (this.textPath || this).node; t.hasChildNodes();) t.removeChild(t.lastChild);
                return this instanceof l.Text && (delete this.lines, this.lines = new l.Set, this.content = ""), this
            },
            length: function() {
                return this.node.getComputedTextLength()
            }
        }), l.TextPath = l.invent({
            create: "textPath",
            inherit: l.Element,
            parent: l.Text,
            construct: {
                path: function(t) {
                    for (this.textPath = new l.TextPath; this.node.hasChildNodes();) this.textPath.node.appendChild(this.node.firstChild);
                    return this.node.appendChild(this.textPath.node), this.track = this.doc().defs().path(t), this.textPath.parent = this, this.textPath.attr("href", "#" + this.track, l.xlink), this
                },
                plot: function(t) {
                    return this.track && this.track.plot(t), this
                }
            }
        }), l.Nested = l.invent({
            create: function() {
                this.constructor.call(this, l.create("svg")), this.style("overflow", "visible")
            },
            inherit: l.Container,
            construct: {
                nested: function() {
                    return this.put(new l.Nested)
                }
            }
        }), l.A = l.invent({
            create: "a",
            inherit: l.Container,
            extend: {
                to: function(t) {
                    return this.attr("href", t, l.xlink)
                },
                show: function(t) {
                    return this.attr("show", t, l.xlink)
                },
                target: function(t) {
                    return this.attr("target", t)
                }
            },
            construct: {
                link: function(t) {
                    return this.put(new l.A).to(t)
                }
            }
        }), l.extend(l.Element, {
            linkTo: function(t) {
                var e = new l.A;
                return "function" == typeof t ? t.call(e, e) : e.to(t), this.parent.put(e).put(this)
            }
        }), l.Marker = l.invent({
            create: "marker",
            inherit: l.Container,
            extend: {
                width: function(t) {
                    return this.attr("markerWidth", t)
                },
                height: function(t) {
                    return this.attr("markerHeight", t)
                },
                ref: function(t, e) {
                    return this.attr("refX", t).attr("refY", e)
                },
                update: function(t) {
                    return this.clear(), "function" == typeof t && t.call(this, this), this
                },
                toString: function() {
                    return "url(#" + this.id() + ")"
                }
            },
            construct: {
                marker: function(t, e, i) {
                    return this.defs().marker(t, e, i)
                }
            }
        }), l.extend(l.Defs, {
            marker: function(t, e, i) {
                return this.put(new l.Marker).size(t, e).ref(t / 2, e / 2).viewbox(0, 0, t, e).attr("orient", "auto").update(i)
            }
        }), l.extend(l.Line, l.Polyline, l.Polygon, l.Path, {
            marker: function(t, e, i, n) {
                var r = ["marker"];
                return "all" != t && r.push(t), r = r.join("-"), t = arguments[1] instanceof l.Marker ? arguments[1] : this.doc().marker(e, i, n), this.attr(r, t)
            }
        });
    var c = {
        stroke: ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"],
        fill: ["color", "opacity", "rule"],
        prefix: function(t, e) {
            return "color" == e ? t : t + "-" + e
        }
    };
    return ["fill", "stroke"].forEach(function(t) {
        var e, i = {};
        i[t] = function(i) {
            if ("string" == typeof i || l.Color.isRgb(i) || i && "function" == typeof i.fill) this.attr(t, i);
            else
                for (e = c[t].length - 1; e >= 0; e--) null != i[c[t][e]] && this.attr(c.prefix(t, c[t][e]), i[c[t][e]]);
            return this
        }, l.extend(l.Element, l.FX, i)
    }), l.extend(l.Element, l.FX, {
        rotate: function(t, e, i) {
            return this.transform({
                rotation: t || 0,
                cx: e,
                cy: i
            })
        },
        skew: function(t, e) {
            return this.transform({
                skewX: t || 0,
                skewY: e || 0
            })
        },
        scale: function(t, e) {
            return this.transform({
                scaleX: t,
                scaleY: null == e ? t : e
            })
        },
        translate: function(t, e) {
            return this.transform({
                x: t,
                y: e
            })
        },
        matrix: function(t) {
            return this.transform({
                matrix: t
            })
        },
        opacity: function(t) {
            return this.attr("opacity", t)
        }
    }), l.extend(l.Rect, l.Ellipse, l.FX, {
        radius: function(t, e) {
            return this.attr({
                rx: t,
                ry: e || t
            })
        }
    }), l.extend(l.Path, {
        length: function() {
            return this.node.getTotalLength()
        },
        pointAt: function(t) {
            return this.node.getPointAtLength(t)
        }
    }), l.extend(l.Parent, l.Text, l.FX, {
        font: function(t) {
            for (var e in t) "leading" == e ? this.leading(t[e]) : "anchor" == e ? this.attr("text-anchor", t[e]) : "size" == e || "family" == e || "weight" == e || "stretch" == e || "variant" == e || "style" == e ? this.attr("font-" + e, t[e]) : this.attr(e, t[e]);
            return this
        }
    }), l.Set = l.invent({
        create: function() {
            this.clear()
        },
        extend: {
            add: function() {
                var t, e, i = [].slice.call(arguments);
                for (t = 0, e = i.length; e > t; t++) this.members.push(i[t]);
                return this
            },
            remove: function(t) {
                var e = this.index(t);
                return e > -1 && this.members.splice(e, 1), this
            },
            each: function(t) {
                for (var e = 0, i = this.members.length; i > e; e++) t.apply(this.members[e], [e, this.members]);
                return this
            },
            clear: function() {
                return this.members = [], this
            },
            has: function(t) {
                return this.index(t) >= 0
            },
            index: function(t) {
                return this.members.indexOf(t)
            },
            get: function(t) {
                return this.members[t]
            },
            first: function() {
                return this.get(0)
            },
            last: function() {
                return this.get(this.members.length - 1)
            },
            valueOf: function() {
                return this.members
            },
            bbox: function() {
                var t = new l.BBox;
                if (0 == this.members.length) return t;
                var e = this.members[0].rbox();
                return t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height, this.each(function() {
                    t = t.merge(this.rbox())
                }), t
            }
        },
        construct: {
            set: function() {
                return new l.Set
            }
        }
    }), l.SetFX = l.invent({
        create: function(t) {
            this.set = t
        }
    }), l.Set.inherit = function() {
        var t, e = [];
        for (var t in l.Shape.prototype) "function" == typeof l.Shape.prototype[t] && "function" != typeof l.Set.prototype[t] && e.push(t);
        e.forEach(function(t) {
            l.Set.prototype[t] = function() {
                for (var e = 0, i = this.members.length; i > e; e++) this.members[e] && "function" == typeof this.members[e][t] && this.members[e][t].apply(this.members[e], arguments);
                return "animate" == t ? this.fx || (this.fx = new l.SetFX(this)) : this
            }
        }), e = [];
        for (var t in l.FX.prototype) "function" == typeof l.FX.prototype[t] && "function" != typeof l.SetFX.prototype[t] && e.push(t);
        e.forEach(function(t) {
            l.SetFX.prototype[t] = function() {
                for (var e = 0, i = this.set.members.length; i > e; e++) this.set.members[e].fx[t].apply(this.set.members[e].fx, arguments);
                return this
            }
        })
    }, l.extend(l.Element, {
        data: function(t, e, i) {
            if ("object" == typeof t)
                for (e in t) this.data(e, t[e]);
            else if (arguments.length < 2) try {
                return JSON.parse(this.attr("data-" + t))
            } catch (n) {
                return this.attr("data-" + t)
            } else this.attr("data-" + t, null === e ? null : i === !0 || "string" == typeof e || "number" == typeof e ? e : JSON.stringify(e));
            return this
        }
    }), l.extend(l.Element, {
        remember: function(t, e) {
            if ("object" == typeof arguments[0])
                for (var e in t) this.remember(e, t[e]);
            else {
                if (1 == arguments.length) return this.memory()[t];
                this.memory()[t] = e
            }
            return this
        },
        forget: function() {
            if (0 == arguments.length) this._memory = {};
            else
                for (var t = arguments.length - 1; t >= 0; t--) delete this.memory()[arguments[t]];
            return this
        },
        memory: function() {
            return this._memory || (this._memory = {})
        }
    }), l
});