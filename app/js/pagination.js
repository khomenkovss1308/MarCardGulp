const getPageList = (totalPages, page, maxLength) => {
    const range = (start, end) => {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    let sideWidth = maxLength < 9 ? 1 : 2;
    let leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    let rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

$(() => {
    let numberOfItems = $(".pagination-list .pagination-list__item").length;
    let limitPerPage = parseInt($(".pagination-list").data("limit"));
    let totalPages = Math.ceil(numberOfItems / limitPerPage);
    let currentPage;

    const showPage = (whichPage) => {
        if (whichPage < 1 || whichPage > totalPages) return false;

        currentPage = whichPage;

        $(".pagination-list .pagination-list__item").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
        $(".pagination li").removeClass("active");
        $(".pagination li").eq(currentPage).addClass("active");

        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);

        return true;
    }

    $(".pagination-list").show();
    showPage(1);

    $(".pagination li:not(.previous-page, .next-page)").on("click", function() {
        return showPage($(this).index());
    });

    $(".next-page").on("click", function() {
        return showPage(currentPage + 1);
    });

    $(".previous-page").on("click", function() {
        return showPage(currentPage - 1);
    });
});
