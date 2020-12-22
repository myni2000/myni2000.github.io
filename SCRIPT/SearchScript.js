function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}


var data = [];
var datatopping = [];
function loading() {
    var dataloc_pre = getUrlVars()["search"].replace(/\+/g, '%20');
    var dataloc = decodeURIComponent(dataloc_pre)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = changetolistdata(this)
            //datatopping = changetolistdatatopping(this)
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



    function HienThi(lstrecord) {
        tbody = document.getElementById("mainbody")
        numtdeachrow = 3;
        widthimage = 300;
        heightimage = 300;
        infoloc = document.getElementById("infoloc")
        infoloc.innerText = "Kết quả tìm kiếm cho từ khóa \"" + dataloc + "\""

        for (var i = 0; i < lstrecord.length; i++) {
            for (var j = 0; j < lstrecord[i].length; j++) {
                if (lstrecord[i][j][2] == dataloc) {
                    sp = lstrecord[i][j]
                    var tr = document.createElement("tr")
                    tbody.appendChild(tr)
                    var td1 = document.createElement("td")
                    td1.setAttribute('valign', 'top')
                    td1.setAttribute('class', 'itemproduct')
                   // td2.setAttribute('valign', 'top')
                   // td2.setAttribute('class', 'itemproduct')
                   // td3.setAttribute('valign', 'top')
                  //  td3.setAttribute('class', 'itemproduct')

                    tr.appendChild(td1)
                   // tr.appendChild(td2)
                   // tr.appendChild(td3)

                    var a1 = document.createElement("a")
                    a1.href = "DetailSP.html?id=" + sp[0];

                   // var a2 = document.createElement("a")
                   // a2.href = "DetailSP.html?id=" + record2[0];

                   // var a3 = document.createElement("a")
                   // a3.href = "DetailSP.html?id=" + record3[0];

                    td1.appendChild(a1)
                   // td2.appendChild(a2)
                   // td3.appendChild(a3)
                    var img1 = document.createElement("img")
                    img1.setAttribute("src", "Images/" + sp[4])
                    img1.setAttribute("class", "imgproduct")
                    img1.setAttribute("width", widthimage)
                    img1.setAttribute("height", heightimage)
                    a1.appendChild(img1)


                    var content1 = document.createElement("p")
                    content1.innerHTML = "<b>" + sp[2].toUpperCase() + "</b>" + "<br/>"
                        + sp[5] + " VNĐ"
                    content1.setAttribute('color', '#000000');
                    a1.appendChild(content1)


                   /* var img2 = document.createElement("img")
                    img2.setAttribute("src", "Images/" + record2[4])
                    img2.setAttribute("class", "imgproduct")
                    img2.setAttribute("width", widthimage)
                    img2.setAttribute("height", heightimage)
                    a2.appendChild(img2)

                    var content2 = document.createElement("p")
                    content2.innerHTML = "<b>" + record2[2].toUpperCase() + "</b>" + "<br/>"
                        + record2[5] + " VNĐ"
                    content2.setAttribute('color', '#000000');
                    a2.appendChild(content2)


                    var img3 = document.createElement("img")
                    img3.setAttribute("src", "Images/" + record3[4])
                    img3.setAttribute("class", "imgproduct")
                    img3.setAttribute("width", widthimage)
                    img3.setAttribute("height", heightimage)
                    a3.appendChild(img3)


                    var content3 = document.createElement("p")
                    content3.innerHTML = "<b>" + record3[2].toUpperCase() + "</b>"
                        + "<br/>" + record3[5] + " VNĐ"
                    content3.setAttribute('color', '#000000');
                    a3.appendChild(content3)

                }
                if (lstrecord[i].length % numtdeachrow != 0) {

                    var trlast = document.createElement('tr')
                    tbody.appendChild(trlast)
                    for (j = 0; j < (lstrecord[i].length % numtdeachrow); j++) {

                        var td = document.createElement("td")
                        td.setAttribute('class', 'itemproduct')
                        //td.setAttribute('width', '300')
                        trlast.appendChild(td)

                        record = lstrecord[i][(parseInt(lstrecord[i].length / numtdeachrow) * 3) + j]

                        var a = document.createElement("a")
                        a.href = "detailproduct.html?id=" + record[0];
                        a.setAttribute("href", "detalproduct.html?id=" + record[0])
                        td.appendChild(a)
                        var img = document.createElement("img")
                        img.setAttribute("src", "Images/" + record[4])
                        img.setAttribute("class", "imgproduct")
                        img.setAttribute("width", widthimage)
                        img.setAttribute("height", heightimage)
                        a.appendChild(img)
                        var content = document.createElement("p")
                        content.innerHTML = "<b>" + record[2].toUpperCase() + "</b>" + "<br/>" +
                            record[5] + " VNĐ"
                        content.setAttribute('color', '#000000');
                        a.appendChild(content)
                    }*/

                }               
            } 
        }

    }
}

