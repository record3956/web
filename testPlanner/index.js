const secOne = document.getElementById('secOne');
const secTwo = document.getElementById('secTwo');
const secThree = document.getElementById('secThree');
// 시험 과목 배열
var testName = [];
// 시험 날짜 배열
var testDay = [];
// 시험 날짜 .getTime()한대로 있는 배열
var testDayAscend = [];
// 시험 과목:날짜
var testInfo = {};
// 시험 과목:날짜 순서대로 배열된 객체
var arrTestInfo = {};
// 시험 끝나는 날짜
var lastDay = [];
// 시험 시작 날짜
var startDay = '';
var many = '';
let runEmoji = '🏃';
let angryEmoji = '😱';
// 년 월 일을 반환하는 함수 ex)23-4-12
function outPutDate(date) {
  let year = String(new Date(date).getFullYear()).slice(2);
  let month = new Date(date).getMonth() + 1;
  let day = new Date(date).getDate();
  let Full = `${year}-${month}-${day}`;
  return Full;
}
// 행을 추가하는 함수
function addRow() {
  const tbl = document.getElementById('inputTable');
  const newRow = tbl.insertRow();
  const rowCell1 = newRow.insertCell();
  const rowCell2 = newRow.insertCell();
  rowCell1.innerHTML = ' <td>과목 이름 : <input type="text" required></td>';
  rowCell2.innerHTML = '<td>시험 날짜 : <input type="date" required></td>';
}
// 행을 삭제하는 함수
function delRow() {
  const tbl = document.getElementById('inputTable');
  const delRow = tbl.deleteRow(-1);
}
// nextChp 함수
// 1. testName/Day 배열에 각각 값을 넣어준다
// 2.
function nextChp() {
  var tbl = document.getElementById('inputTable');
  var tblTD = tbl.getElementsByTagName('td');
  var numRow = tbl.rows.length;
  // !!node value를 가져오는 법!!
  for (let i = 0; i < 2 * numRow; i++) {
    if (i % 2 == 0) {
      let name = tblTD[i].children[0].value;
      testName.push(name);
    } else {
      let name = tblTD[i].children[0].value;
      testDay.push(name);
    }
  }
  testDayAscend = testDay.slice();
  testDayAscend.sort();
  for (let i = 0; i < testDayAscend.length; i++) {
    testDayAscend[i] = new Date(testDayAscend[i]).getTime();
  }
  console.log('testDayAscend 입니다.');
  console.log(testDayAscend);
  // !!객체 접근 방법 기억!!
  for (let x = 0; x < testDay.length; x++) {
    testInfo[testName[x]] = testDay[x];
  }
  // !!sort 오름,내림차순 적용원리 공부!!
  arrTestInfo = Object.entries(testInfo);
  // 객체를 다시 배열로 만들어서 오름,내림차순으로 정렬하는 방법 이때 date -> 문자열로 변경되니 다시 date로 변경하고 sort해야함!
  for (let i = 0; i < arrTestInfo.length; i++) {
    arrTestInfo[i][1] = new Date(arrTestInfo[i][1]);
  }
  arrTestInfo.sort((a, b) => a[1].getTime() - b[1].getTime());
  console.log('testName입니다.', testName);
  console.log('testDay입니다.', testDay);
  console.log('testIfno입니다.', testInfo);
  console.log('arrTestInfo입니다.', arrTestInfo);

  // !!sort메소드 작동 원리 공부!!!!
  lastDay = testDay.slice().sort()[testDay.length - 1];

  var secInput = document.getElementById('secInput');
  secInput.innerHTML = `<p>총 입력한 과목 개수는 ${numRow}개 입니다. </p>`;
  secOne.style.display = 'none';
  secTwo.style.display = 'block';
}
function back() {
  secOne.style.display = 'block';
  secTwo.style.display = 'none';
}
function backTwo() {
  secOne.style.display = 'none';
  secTwo.style.display = 'block';
  secThree.style.display = 'none';
}

// 계획표 출력하고
// 시험 언제시작이랑 하루에 몇과목 값.
// 나중에 공부 시작 날짜가 시험 끝나는 날짜보다 느리다면 이미 시험이 끝났습니다. 라는 아웃풋을 제출해야함!
function setPlanner() {
  // 하루 공부할 과목 개수
  many = parseInt(document.querySelector('input[name="many"]').value);
  // 공부 시작하는 날 Date 객체화한 변수
  startDay = new Date(document.getElementById('startGongBoo').value);
  // 결과 출력 박스
  const result = document.getElementById('outPut');
  // 1,2 페이지 none -> 3페이지 블락
  secTwo.style.display = 'none';
  secThree.style.display = 'block';
  console.log('하루에 몇과목:' + many);
  console.log('공부시작 날짜는:' + startDay);
  console.log('시험시작 끝나는:' + lastDay);
  var differenceDay = (new Date(lastDay).getTime() - new Date(startDay).getTime()) / 86400000 + 1;
  console.log(differenceDay);
  // 결과를 담아줄 공간을 만들어야함. 어떻게? table로? div로? -> div로!!
  var a = 0;

  for (let i = 0; i < differenceDay; i++) {
    var today = startDay.getTime() + a;
    console.log(today);
    var outPutDiv = document.createElement('div');
    outPutDiv.setAttribute('id', `outPut_${i}`);
    var day = outPutDate(startDay.getTime() + a);
    var todayTest = [];
    for (let x = 0; x < testName.length; x++) {
      if (today == arrTestInfo[x][1].getTime()) {
        todayTest.push(arrTestInfo[x][0]);
      }
    }
    var outString = ``;
    if (todayTest[0]) {
      outString = `${day}<hr>오늘 시험과목:${todayTest.join(',')}${runEmoji}`;
    } else {
      outString = `${day}<hr>${angryEmoji}`;
    }
    outPutDiv.innerHTML = `${outString}`;
    // 하루공부과목량에 따른 list개수 넣기위한 변수
    var manyList = document.createElement('ul');
    for (let x = 0; x < many; x++) {
      var newLi = document.createElement('li');
      var input = document.createElement('input');
      input.type = 'text';
      manyList.appendChild(newLi);
      newLi.appendChild(input);
    }
    outPutDiv.appendChild(manyList);
    result.appendChild(outPutDiv);
    a += 86400000;
  }
}
// 클릭하면 textarea를 제공하는 함수
