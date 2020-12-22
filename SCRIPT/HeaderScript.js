function loadingshopping() {
    try {
        var datashopping = JSON.parse(localStorage.getItem("lstdathang"));
        var numproduct = document.getElementById("numproduct");
        numproduct.innerHTML = datashopping.length;
    } catch{

    }
}
function autocompletesearch() {
    var xhttp = new XMLHttpRequest();
    var data;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = changetolistdata(this);
            autocomplete(document.getElementById("txtsearch"), data)
        }
    };

    xhttp.open("GET", "Data/product2.xml", true);
    xhttp.send();
    var lstproduct;
    var xmlDoc;

    function changetolistdata(xml) {
        var datalst = []
        var lstmuc = ['NOI', 'BAT', 'DIA', 'THO', 'KHAC']
        xmlDoc = xml.responseXML;
        for (j = 0; j < lstmuc.length; j++) {
            lstproduct = xmlDoc.getElementsByTagName(lstmuc[j])[0].getElementsByTagName("sanpham");
            for (i = 0; i < lstproduct.length; i++) {
                var product = lstproduct[i];
                datalst.push(product.getElementsByTagName("TEN")[0].childNodes[0].nodeValue)
            }
        }
        return datalst;
    }


    function autocomplete(inp, arr) {

        var currentFocus;

        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            a = document.createElement("div");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("div");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
function closeAllLists(elmnt) {

    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
    document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
}
function xulySearch() {
    var result = document.getElementById('txtsearch')
    var stringfinal = result.value.split(' ').join('+');
    window.location.href = 'SearchResult.html?search=' + stringfinal;
}
