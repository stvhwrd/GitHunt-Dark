function HubStorage() {
    var t = function() {
            return window.localStorage ? window.localStorage : {
                setItem: function() {},
                getItem: function() {}
            }
        },
        n = function(n) {
            var e = t();
            $(n).each(function(t, n) {
                var r = $(n),
                    a = r.attr("name");
                e.setItem(a, r.val())
            })
        },
        e = function(n) {
            var e = t(),
                r = !1;
            return $(n).each(function(t, n) {
                var a = $(n),
                    o = a.attr("name"),
                    u = e.getItem(o);
                u && (a.val(u), r = !0)
            }), r
        };
    return {
        persistFilters: function(t) {
            n(t)
        },
        populateFilters: function(t) {
            return e(t)
        },
        getStorage: function() {
            return t()
        }
    }
}
