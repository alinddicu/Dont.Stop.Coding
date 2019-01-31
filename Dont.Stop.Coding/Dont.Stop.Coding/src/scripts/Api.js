Api = function () {
    this.getRss = function () {
        return $.getJSON("/cakephp/ws");
    };
};