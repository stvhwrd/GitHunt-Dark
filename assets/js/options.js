function HubOptions() {
    function t() {
        $(document).on("click", ".save-token", function(t) {
            t.preventDefault(), n.persistFilters(".githunt_token"), $(".quote-item").html("Woohoo! Token saved, happy hunting.")
        })
    }
    var n = new HubStorage;
    return {
        init: function() {
            var e = n.populateFilters(".githunt_token");
            e && $(".quote-item").html("Token already saved. Better go for the hunt!"), t()
        }
    }
}
$(function() {
    var t = new HubOptions;
    t.init()
});
