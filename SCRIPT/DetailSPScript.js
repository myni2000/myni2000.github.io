var data = [];
var datashopping = []
function loading() {
    var xhttp = new XMLHttpRequest();
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
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = value;
            });
        return vars;
    }
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
    function HienThi(lstrecord) {
        var idsp = unescape(getUrlVars()["id"])
        tbody = document.getElementById("detailproduct")
        var tr = document.createElement("tr")
        tbody.appendChild(tr)
        var td1 = document.createElement("td")
        var td2 = document.createElement("td")
        td1.setAttribute('valign', 'top')
        td2.setAttribute('valign', 'top')
        td2.setAttribute('class','motatd2')
        tr.appendChild(td1)
        tr.appendChild(td2)

        for (var i = 0; i < lstrecord.length; i++) {
            for (var j = 0; j < lstrecord[i].length; j++) {
                if (lstrecord[i][j][0] == idsp) {
                    var img = document.createElement("img")
                    img.setAttribute("src", "Images/" + lstrecord[i][j][4])
                    img.setAttribute("class", "imgproduct")
                    //img3.setAttribute("width", widthimage)
                    //img3.setAttribute("height", heightimage)
                    td1.appendChild(img)
                    var ten = document.createElement("div")
                    ten.setAttribute('class','nameproductdt')
                    ten.innerHTML = "<b>" + lstrecord[i][j][2].toUpperCase() + "</b>"
                    td2.appendChild(ten)
                    var gia = document.createElement("div")
                    gia.setAttribute('class','giaproductdt')
                    gia.innerHTML = lstrecord[i][j][5] + " VNĐ" 
                    td2.appendChild(gia)

                    var title = document.createElement("span")
                    title.setAttribute('class', 'titleChiTiet')
                    title.innerHTML = "Thông tin chi tiết:"
                    td2.appendChild(title);
                    var mota = document.createElement("div")
                    mota.setAttribute('class', 'motasp')
                    mota.innerHTML = lstrecord[i][j][6]
                    td2.appendChild(mota)
                    var quantitycontainer = document.createElement("div")
                    
                    quantitycontainer.setAttribute('class', 'quantity')
                    var text = document.createElement("span")
                    text.setAttribute('class','txt')
                    text.innerHTML ="<b>"+ "SỐ LƯỢNG: "+"</b>"
                    quantitycontainer.appendChild(text)
                    var plus = document.createElement("span")
                    var quant = document.createElement("span")
                    var minus = document.createElement("span")                    
                    var btndathang = document.createElement("div")

                    plus.innerText = '+'
                    quant.innerText = '1'
                    minus.innerText = '-'
                   

                    plus.setAttribute("class", "btnquant")
                    minus.setAttribute("class", "btnquant")
                    plus.setAttribute("onclick", "xuLyquant(1)")
                    minus.setAttribute("onclick", "xuLyquant(-1)")
                    quant.setAttribute("id", "idquant")

                    btndathang.setAttribute("id", "idbtndathang")
                    btndathang.setAttribute("onclick", "xuLyThemGioHang()")
                    btndathang.innerText = "ĐẶT MUA "
                    quantitycontainer.appendChild(minus)
                    quantitycontainer.appendChild(quant)
                    quantitycontainer.appendChild(plus)
                    quantitycontainer.appendChild(btndathang)
                    td2.appendChild(quantitycontainer)
                    var btnthanhtoanngay = document.createElement("div")
                    var athanhtoanngay = document.createElement("a")
                    btnthanhtoanngay.setAttribute('class','btnthanhtoanngay')
                    athanhtoanngay.innerText = "THANH TOÁN NGAY "
                    athanhtoanngay.href ="TienHanhThanhToan.html"
                    btnthanhtoanngay.appendChild(athanhtoanngay)
                    td2.appendChild(btnthanhtoanngay)

                }

            }

        }
    }


}
function xuLyquant(stt) {
    quant = document.getElementById("idquant");
    quantnum = parseFloat(quant.childNodes[0].nodeValue);
   // gia = document.getElementById("idbtndathang");
    //giasp = parseFloat(gia.childNodes[0].nodeValue.substring(2)) / quantnum;

    if (quantnum != 1 || stt != -1) {
        quantnum = quantnum + stt;
        quant.innerText = quantnum + "";
       // gia.innerHTML = "+ " + (giasp * quantnum)
    }

}
datashopping = JSON.parse(localStorage.getItem("lstdathang"));

if (datashopping == null) {
    datashopping = []
}
function xuLyThemGioHang() {
    var datasp = []
    var url = window.location.href;
    var idspchon = url.substring(url.lastIndexOf('=') + 1);
    datasp.push(idspchon)
    datasp.push(document.getElementById("idquant").childNodes[0].nodeValue)

    datashopping.push(datasp)

    localStorage.setItem('lstdathang', JSON.stringify(datashopping))
    loadingshopping();

    //document.getElementById("overlay").style.display = "none";

}