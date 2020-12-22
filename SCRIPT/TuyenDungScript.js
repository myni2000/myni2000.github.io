 function loadDoc() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    myFunction2(this);
                }

            };
            xhttp.open("GET", "Data/tuyendung.xml", true);
            xhttp.send();
        }
function myFunction2(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var dsNhanVien = xmlDoc.getElementsByTagName("nhanvien");
    tbody = document.getElementById("idbody")
    for (i = 0; i < dsNhanVien.length; i++) {
        NhiemVu = dsNhanVien[i].getElementsByTagName("NHIEMVU")[0].childNodes[0].nodeValue
        var tr = document.createElement("tr")
        tbody.appendChild(tr)
        id = dsNhanVien[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue
        icon = dsNhanVien[i].getElementsByTagName("ICON")[0].childNodes[0].nodeValue
        var tdHinh = document.createElement("td")
        var img = document.createElement("img")
        img.setAttribute("src", "Images/" + icon)
        img.setAttribute("height", "80")
        img.setAttribute("width", "80")
        tdHinh.appendChild(img)
        tr.appendChild(tdHinh)
        var a = document.createElement('a');
        a.innerHTML = NhiemVu
        a.href = "DetailTuyenDung.html?id=" + id;              
        var td = document.createElement("td")     
        td.appendChild(a)
        tr.appendChild(td)
    }
}
