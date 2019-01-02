$.ajax({
    url: "/api/list",
    dataType: "json",
    success: function(data) {
        if (data.code == 1) {
            console.log(data.data);
        }
    }
})