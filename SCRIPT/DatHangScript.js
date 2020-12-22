var datashopping = JSON.parse(localStorage.getItem("lstdathang"));
if (datashopping == null) {
    datashopping = []
}
var tongtien = 0;
function loadinggiohang() {
    var xhttp = new XMLHttpRequest();
    var data = []
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = changetolistdata(this)
            HienThi(data);
        }
    };
    xhttp.open("GET", "Data/product2.xml", true);
    xhttp.send();
    var lstproduct;
    var xmlDoc;

    function changetolistdata(xml) {

        xmlDoc = xml.responseXML;
        var lstmuc = ['NOI', 'BAT', 'DIA', 'THO', 'KHAC']

        for (j = 0; j < lstmuc.length; j++) {
            lstproduct = xmlDoc.getElementsByTagName(lstmuc[j])[0].getElementsByTagName("sanpham");
            var detailmuc = [];
            for (i = 0; i < lstproduct.length; i++) {
                var product = lstproduct[i]
                var detailproduct = []
                detailproduct.push(product.getElementsByTagName("ID")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("DANHMUC")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("TEN")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("SOLUONG")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("HINHANH")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("GIA")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("MOTA")[0].childNodes[0].nodeValue
                )
                detailmuc.push(detailproduct)
            }
            data.push(detailmuc)
        }
        return data;
    }
   

   
}
function HienThi(lstrecord) {
    table = document.getElementById("maintable")
    //  while (table.childNodes.length > 0) {
    //        table.removeChild(table.firstChild)
    //     }

    for (k = 0; k < datashopping.length; k++) {

        for (var i = 0; i < lstrecord.length; i++) {
            for (j = 0; j < lstrecord[i].length; j++) {
                if (datashopping[k][0] == lstrecord[i][j][0]) {
                    sp = datashopping[k]

                    var trsp = document.createElement("tr")

                    var tdimg = document.createElement("td")
                    var asp = document.createElement("a")
                    asp.href = "DetailSP.html?id=" + sp[0];
                    var btndel = document.createElement("span")

                    btndel.innerHTML = "X"
                    btndel.setAttribute("class", "btndel")
                    btndel.setAttribute("onclick", "delItem(this)")
                    trsp.appendChild(btndel);
                    tdimg.setAttribute("id", "tdimg");
                    //tdimg.setAttribute("rowspan", "3")

                    var img = document.createElement("img")

                    img.setAttribute("height", "130")
                    img.setAttribute("width", "130")

                    img.setAttribute("src", "Images/" + lstrecord[i][j][4])
                    asp.appendChild(img)
                    tdimg.appendChild(asp)
                    trsp.appendChild(tdimg)

                    var giatien = parseInt(sp[1]) * parseInt(lstrecord[i][j][5])

                    var tdinfor = document.createElement("td");
                    var asp2 = document.createElement("a")
                    asp2.href = "DetailSP.html?id=" + sp[0];
                    var pinfor = document.createElement("p");
                    tdinfor.setAttribute('valign', 'top')
                    pinfor.innerHTML =sp[0]+ "<br/>"+ "<b>" + lstrecord[i][j][2] + "</b>" + "<br/>"
                        + "SỐ LƯỢNG: " + sp[1] + "<br/>" +
                        "THÀNH TIỀN: " + giatien;

                    asp2.appendChild(pinfor)
                    tdinfor.appendChild(asp2)
                    trsp.appendChild(tdinfor)
                    table.appendChild(trsp)

                    tongtien = tongtien + giatien
                }
            }
        }
    }

    var divtongtien = document.getElementById("idtongtien")
    divtongtien.innerHTML = tongtien + " VNĐ"
}
function delItem(e) {
    iddel = e.parentNode.childNodes[2].childNodes[0].childNodes[0].innerHTML.substring(0, 9);   
    for (i = 0; i < datashopping.length; i++) {
        id = datashopping[i][0];
        if (iddel == id) {
            var removeditem = datashopping.splice(i, 1)
            localStorage.setItem('lstdathang', JSON.stringify(datashopping))
            loadinggiohang();
            window.location.href = "GioHang.html"
        }
    }
}

