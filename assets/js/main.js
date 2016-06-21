function HubTab() {
    function e(e, t, o) {
        var a = "";
        $(e).each(function(e, t) {
            a += '<div class="content-item"><div class="header"><a href="' + t.html_url + '">' + t.full_name + '</a></div><p class="tagline">' + t.description + '</p><div class="footer"><span class="footer-stat"><i class="fa fa-code-fork"></i>' + t.forks_count + '</span><span class="footer-stat"><i class="fa fa-commenting-o"></i>' + t.open_issues + '</span><span class="footer-stat"><i class="fa fa-star-o"></i>' + t.stargazers_count + "</span></div></div>"
        });
        var n = moment(t).fromNow(),
            r = moment(t).format("ll"),
            s = moment(o).format("ll"),
            i = '<div class="content-batch"><h1 class="date-head" data-date="' + t + '">' + n + " - " + r + " &ndash; " + s + "</h1>" + a + '<div class="clearfix"></div></div></div>';
        return i
    }
    var t = !1,
        o = ".content-batch",
        a = ".repos-filter",
        n = ".main-content",
        r = ".date-head",
        s = "date",
        i = "#language",
        u = "#date-jump",
        m = "githunt_token",
        c = 0,
        l = "https://api.github.com/search/repositories",
        d = "last_hunt_result",
        f = "180",
        h = "last_hunt_time",
        p = new HubStorage,
        g = function() {
            var e = $(o).last().find(r).data(s),
                t = {},
                a = $(u).val();
            return e ? (t.upper = e, t.lower = moment(e).subtract(1, a).format("YYYY-MM-DD")) : (t.upper = moment().format("YYYY-MM-DD"), t.lower = moment().add(1, "day").subtract(1, a).format("YYYY-MM-DD")), t
        },
        v = function() {
            var e = g(),
                t = $(i).val(),
                o = "";
            t && (o = "language:" + t + " ");
            var a = $.trim(p.getStorage().getItem(m)),
                n = "";
            return a && (n = "&access_token=" + a), {
                queryParams: "?sort=stars&order=desc&q=" + o + 'created:"' + e.lower + " .. " + e.upper + '"' + n,
                dateRange: e
            }
        },
        Y = function() {
            var e = $(".main-content").html();
            return e ? (p.getStorage().setItem(d, e), void p.getStorage().setItem(h, moment().format("YYYY-MM-DD HH:mm:ss"))) : !1
        },
        b = function() {
            if (0 !== c) return !0;
            var e = p.getStorage().getItem(d),
                t = p.getStorage().getItem(h);
            if (!e || !t || "undefined" === $.trim(e)) return !0;
            var o = moment(),
                a = moment(t, "YYYY-MM-DD HH:mm:ss");
            return o.diff(a, "minutes") >= f ? !0 : ($(n).html(e), c++, !1)
        },
        w = function() {
            if (t !== !1 || 0 !== $(".error-quote").length) return !1;
            if (b() === !1) return !1;
            var o = v(),
                a = l + o.queryParams;
            t = $.ajax({
                url: a,
                method: "get",
                beforeSend: function() {
                    $(".loading-more").removeClass("hide")
                },
                success: function(t) {
                    var a = e(t.items, o.dateRange.lower, o.dateRange.upper);
                    $(n).append(a)
                },
                error: function(e, t, o) {
                    var o = JSON.parse(e.responseText),
                        a = o.message || "";
                    a && "bad credentials" == a.toLowerCase() ? ($(".main-content").replaceWith('<h3 class="quote-item error-quote">Oops! Seems to be a problem with your API token. Could you verify the API token you entered in extension options.</h3>'), p.getStorage().removeItem(m)) : a && -1 !== a.indexOf("rate limit") ? $(".main-content").replaceWith('<h3 class="quote-item error-quote">Oops! Seems like you did not set the API token. Wait another hour for github to refresh your rate limit or better add a token in `Githunt Options` to hunt more.</h3>') : $(".main-content").replaceWith("Oops! Could you please refresh the page.")
                },
                complete: function() {
                    t = !1, $(".loading-more").addClass("hide"), Y()
                }
            })
        },
        S = function() {
            $(window).on("scroll", function() {
                $(window).scrollTop() + $(window).height() > $(document).height() - 100 && w()
            }), $(document).on("change", a, function() {
                c++, $(o).remove(), p.persistFilters(a), w()
            })
        };
    return {
        init: function() {
            S(), this.refresh()
        },
        refresh: function() {
            p.populateFilters(a), w()
        }
    }
}
$(function() {
    var e = new HubTab;
    e.init()
});
