let serialNum = 0;
let late = 0;
let absent = 0;
let present = 0;
const studentList = [];
const att = [];
var table;
var rowss;
function start() {
  serialNum++;
  const one = {
    num: serialNum,
    studentId: "100",
    firstName: "user1",
    lastName: "",
    attendance: "present",
  };
  studentList.push(one);
  showInfo();
  serialNum++;
  const two = {
    num: serialNum,
    studentId: "101",
    firstName: "user2",
    lastName: "",
    attendance: "present",
  };
  studentList.push(two);
  showInfo();
  serialNum++;
  const three = {
    num: serialNum,
    studentId: "102",
    firstName: "user3",
    lastName: "",
    attendance: "present",
  };
  studentList.push(three);
  showInfo();
  //document.getElementById("inputbox").style.display = "none";
}
function showForm() {
  document.getElementById("inputbox").style.display = "block";
  document.getElementById("all").style.background = "#dee1e6";
}

function cancel() {
  document.getElementById("inputbox").style.display = "none";
  document.getElementById("all").style.background = "white";
}
function addStudent() {
  let id = document.getElementById("sid").value;
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  if (id == "" || fname == "" || lname == "") {
    alert("Please fill all the fields");
  } else {
    serialNum++;
    const student = {
      num: serialNum,
      studentId: id,
      firstName: fname,
      lastName: lname,
      attendance: "present",
    };
    studentList.push(student);
    document.getElementById("inputbox").style.display = "none";

    showInfo();
    // alert(studentList[serialNum-1].num);
  }
}

function showInfo() {
  document.getElementById("all").style.background = "white";

  var table = document.getElementById("studenttable");
  var row = table.insertRow(serialNum);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  cell0.innerHTML = studentList[serialNum - 1].num;
  cell1.innerHTML = studentList[serialNum - 1].studentId;
  cell2.innerHTML =
    studentList[serialNum - 1].firstName +
    " " +
    studentList[serialNum - 1].lastName;
  cell3.innerHTML = "<button onclick='presentStudent(this)'>&#x2705;</button>";
  cell4.innerHTML = "<button onclick='absentStudent(this)'>&#x1f6ab;</button> ";
  cell5.innerHTML = "<button onclick='lateStudent(this)'>&#128336;</button>";
  document.getElementById("present").innerHTML = "0";
  document.getElementById("late").innerHTML = "0";
  document.getElementById("absent").innerHTML = "0";
  if (present > 0 || late > 0 || absent > 0) {
    document.getElementsByTagName("tr").style.background = "white";
  }
  event.preventDefault();
///****** */
  document.getElementById("sid").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
}
function deleteall() {
  studentList.splice(0, studentList.length);
  document.getElementById("tfot").innerHTML = "";
}
function lateStudent(tdata) {
  late++;
  document.getElementById("late").innerHTML = late;
  let rownum = tdata.parentElement.parentElement;
  let index = rownum.cells[0].innerHTML;
  studentList[index - 1].attendance = "late";
  att.push("late");
  // alert(studentList[index].attendance);
  for (let i = 0; i < 6; i++) {
    rownum.cells[i].style.background = "#ffcc66 ";
  }
}
function absentStudent(tdata) {
  absent++;
  document.getElementById("absent").innerHTML = absent;
  let rownum = tdata.parentElement.parentElement;
  let index = rownum.cells[0].innerHTML;
  studentList[index - 1].attendance = "absent";
  att.push("absent");

  // alert(studentList[index-1].attendance);
  // alert(studentList[index-1].num);
  for (let i = 0; i < 6; i++) {
    rownum.cells[i].style.background = " #ff4d4d        ";
  }
}
function presentStudent(tdata) {
  present++;
  document.getElementById("present").innerHTML = present;
  let rownum = tdata.parentElement.parentElement;
  let index = rownum.cells[0].innerHTML;
  studentList[index - 1].attendance = "present";
  att.push("present");
  for (let i = 0; i < 6; i++) {
    rownum.cells[i].style.background = "  #33cc33      ";
  }
}

function csv() {
  let data = [];
  let status = 0;
  let rdata = document.getElementsByTagName("tr");
  for (let i = 0; i < rdata.length; i++) {
    let cdata = rdata[i].querySelectorAll("td");
    let row = [];

    for (let j = 0; j < cdata.length; j++) {
      row.push(cdata[j].innerHTML);
      if (j == 2) {
        row.push(att[status]);
        j = 6;
        status++;
      }
    }

    data.push(row.join(","));
  }

  data = data.join("\n");
  downloadCSVFile(data);
}

function downloadCSVFile(data) {
  CSVFile = new Blob([data], {
    type: "text/csv",
  });
  let temp_link = document.createElement("a");
  temp_link.download = "GfG.csv";
  let url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);
  temp_link.click();
  document.body.removeChild(temp_link);
}
