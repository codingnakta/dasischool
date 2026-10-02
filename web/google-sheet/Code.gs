// 다시학교 입학 신청 → 구글 시트 저장
// 구글 시트의 확장 프로그램 > Apps Script 에 이 파일 내용을 그대로 붙여넣는다.
// README.md 의 "신청 데이터 저장 (구글 시트)" 순서를 따를 것.

// 아무 문자열이나 길게. Vercel 환경변수 APPLY_SHEET_TOKEN 과 똑같이 맞춘다.
var TOKEN = '여기에-비밀-토큰-입력';

var HEADERS = ['접수시각', '닉네임', '나이대', '거주 지역', '가능 요일', '가능 시간대', '신청 이유', '연락처', '이메일', '인스타그램', '유입경로', '교칙 동의', '개인정보 동의'];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.token !== TOKEN) return json({ ok: false, error: 'unauthorized' });

    var a = body.answers;
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      a.nickname, a.age, a.region,
      (a.days || []).join(' '), (a.times || []).join(' '),
      a.reason, a.contact, a.email, a.insta, a.source,
      a.rules ? 'O' : 'X', a.privacy ? 'O' : 'X',
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// 브라우저로 배포 URL 을 열었을 때 살아있는지 확인용
function doGet() {
  return json({ ok: true, service: 'dasischool-apply' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
