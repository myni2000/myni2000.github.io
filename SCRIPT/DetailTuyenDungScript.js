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
    xhttp.open("GET", "Data/tuyendung.xml", true);
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
            lstproduct = xmlDoc.getElementsByTagName("nhanvien");
            for (i = 0; i < lstproduct.length; i++) {
                var product = lstproduct[i]
                var detailproduct = []
                detailproduct.push(product.getElementsByTagName("ID")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("NHIEMVU")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("MOTACONGVIEC")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("YEUCAU")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("QUYENLOI")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("THOIGIANLAMVIEC")[0].childNodes[0].nodeValue,
                    product.getElementsByTagName("LUONGCOBAN")[0].childNodes[0].nodeValue
                )
                data.push(detailproduct)
        }
        return data;
    }
    function HienThi(lstrecord) {
        var idsp = unescape(getUrlVars()["id"])
        tbody = document.getElementById("detailproduct")
        

        for (var i = 0; i < lstrecord.length; i++)  {
                if (lstrecord[i][0] == idsp) {

                    var trten = document.createElement("tr")
                    tbody.appendChild(trten)
                    var tdten = document.createElement("td")
                    var divten = document.createElement("div")
                    divten.setAttribute('class','vitrituyendung')                   
                    divten.innerHTML = lstrecord[i][1];
                    tdten.appendChild(divten);
                    trten.appendChild(tdten);
                    var trmota = document.createElement("tr")
                    tbody.appendChild(trten)
                    var tdmota = document.createElement("td")
                    var titlecv = document.createElement("div")
                    titlecv.setAttribute('class','titlemota')
                    titlecv.innerHTML = "Mô tả công việc:" +"<br/>"
                    tdmota.appendChild(titlecv)
                    var divmota = document.createElement("div")
                    divmota.setAttribute('class', 'mota')
                    divmota.innerHTML = lstrecord[i][2]
                    tdmota.appendChild(divmota);                   
                    trmota.appendChild(tdmota);

                    var tryc = document.createElement("tr")
                    tbody.appendChild(tryc)
                    var tdyc = document.createElement("td")
                    var titleyc = document.createElement("div")
                    titleyc.setAttribute('class', 'titlemota')
                    titleyc.innerHTML = "Yêu cầu:" + "<br/>"
                    tdyc.appendChild(titleyc)
                    var divyc = document.createElement("div")
                    divyc.setAttribute('class', 'yeucau')
                    divyc.innerHTML = lstrecord[i][3]
                    tdyc.appendChild(divyc);
                    tryc.appendChild(tdyc);

                    var trql = document.createElement("tr")
                    tbody.appendChild(trql)
                    var tdql = document.createElement("td")
                    var titleql = document.createElement("div")
                    titleql.setAttribute('class', 'titlemota')
                    titleql.innerHTML = "Quyền lợi:" + "<br/>"
                    tdql.appendChild(titleql)
                    var divql = document.createElement("div")
                    divql.setAttribute('class', 'yeucau')
                    divql.innerHTML = lstrecord[i][4]
                    tdql.appendChild(divql);
                    trql.appendChild(tdql);

                    var trtg = document.createElement("tr")
                    tbody.appendChild(trtg)
                    var tdtg = document.createElement("td")
                    var titletg = document.createElement("div")
                    titletg.setAttribute('class', 'titlemota')
                    titletg.innerHTML = "Thời gian làm việc:" + "<br/>"
                    tdtg.appendChild(titletg)
                    var divtg = document.createElement("div")
                    divtg.setAttribute('class', 'yeucau')
                    divtg.innerHTML = lstrecord[i][5]
                    tdtg.appendChild(divtg);
                    trtg.appendChild(tdtg);


                    var trluong = document.createElement("tr")
                    tbody.appendChild(trluong)
                    var tdluong = document.createElement("td")
                    var titleluong = document.createElement("div")
                    titleluong.setAttribute('class', 'titlemota')
                    titleluong.innerHTML = "Lương cơ bản:" + "<br/>"
                    tdluong.appendChild(titleluong)
                    var divluong = document.createElement("div")
                    divluong.setAttribute('class', 'yeucau')
                    divluong.innerHTML = lstrecord[i][6]
                    tdluong.appendChild(divluong);
                    trluong.appendChild(tdluong);

                    var trapply = document.createElement("tr")
                    tbody.appendChild(trapply)
                    var tdapply = document.createElement("td")
                    var btnapply = document.createElement("div")
                    var aapply = document.createElement("a")
                    aapply.href = "https://tinyurl.com/miceratuyendung"
                    aapply.target="blank"
                    btnapply.setAttribute("id", "idbtnungtuyen")                  
                    aapply.innerText = "ỨNG TUYỂN NGAY"
                    btnapply.appendChild(aapply);
                    tdapply.appendChild(btnapply);
                    trapply.appendChild(tdapply);
                }

            }

    }
 
}

