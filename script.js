// =============================================================
// 김남용 포트폴리오 기능(JavaScript)
// - querySelector / getElementById 로 요소를 찾고
// - addEventListener 로 '클릭', '입력' 같은 이벤트에 기능을 연결합니다.
// =============================================================


// -------------------------------------------------------------
// 1. 버튼을 누르면 자기소개 문구가 바뀌는 기능 (수업 필수 기능)
// -------------------------------------------------------------
const introText = document.getElementById('introText');
const introBtn = document.getElementById('introBtn');

// 순서대로 보여줄 소개 문장들 (자유롭게 추가·수정하세요)
const intros = [
  '광운대학교 소프트웨어학부에 재학 중인 김남용입니다.',
  '22학번, 웹 개발을 차근차근 배우고 있어요. 💻',
  '요즘은 HTML·CSS·JavaScript로 홈페이지를 만들고 있습니다.',
  '아래 Contact에서 언제든 연락 주세요! 📮'
];
let introIndex = 0; // 지금 몇 번째 문장인지 기억하는 변수

introBtn.addEventListener('click', function () {
  introText.classList.add('fade'); // 잠깐 투명하게

  // 0.25초 뒤에 문장을 바꾸고 다시 보이게 함
  setTimeout(function () {
    introIndex = (introIndex + 1) % intros.length; // 끝까지 가면 처음으로
    introText.textContent = intros[introIndex];
    introText.classList.remove('fade');
  }, 250);
});


// -------------------------------------------------------------
// 2. 카테고리 필터 + 검색 기능
//    두 조건을 모두 만족하는 카드만 보여줍니다.
// -------------------------------------------------------------
const catButtons = document.querySelectorAll('.cat-item');
const cards = document.querySelectorAll('.card');
const searchInput = document.getElementById('searchInput');
const emptyMsg = document.getElementById('emptyMsg');

let currentFilter = 'all'; // 현재 선택된 카테고리

function updateCards() {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach(function (card) {
    // data-category="html css" → 카테고리 확인
    const matchCategory =
      currentFilter === 'all' || card.dataset.category.includes(currentFilter);
    // 카드 안의 글자에 검색어가 들어있는지 확인
    const matchKeyword = card.textContent.toLowerCase().includes(keyword);

    if (matchCategory && matchKeyword) {
      card.classList.remove('hide');
      visibleCount++;
    } else {
      card.classList.add('hide');
    }
  });

  // 보이는 카드가 하나도 없으면 안내 문구 표시
  emptyMsg.hidden = visibleCount > 0;
}

// 카테고리 버튼마다 클릭 이벤트 연결
catButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    catButtons.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    updateCards();
  });
});

// 검색창에 글자를 입력할 때마다 카드 다시 걸러내기
searchInput.addEventListener('input', function () {
  updateCards();
  // 검색을 시작하면 프로젝트 영역으로 화면 이동
  if (searchInput.value.length === 1) {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  }
});


// -------------------------------------------------------------
// 3. 좋아요(♡) 버튼 + 오른쪽 아래 좋아요 개수 표시
// -------------------------------------------------------------
const likeButtons = document.querySelectorAll('.like-btn');
const likeCount = document.getElementById('likeCount');
const cartFloat = document.querySelector('.cart-float');

likeButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    btn.classList.toggle('liked'); // 누를 때마다 좋아요/취소
    btn.textContent = btn.classList.contains('liked') ? '♥ 좋아요' : '♡ 좋아요';

    // 현재 좋아요 누른 버튼 개수 세기
    likeCount.textContent = document.querySelectorAll('.like-btn.liked').length;

    // 통통 튀는 효과를 다시 실행하기 위해 클래스를 뺐다가 다시 넣음
    cartFloat.classList.remove('bump');
    void cartFloat.offsetWidth;
    cartFloat.classList.add('bump');
  });
});


// -------------------------------------------------------------
// 4. 연락처(Contact) 폼 - 실제 전송 대신 확인 메시지 표시
// -------------------------------------------------------------
const orderForm = document.getElementById('orderForm');
const orderResult = document.getElementById('orderResult');

orderForm.addEventListener('submit', function (event) {
  event.preventDefault(); // 페이지가 새로고침되지 않도록 막기

  const name = document.getElementById('orderName').value.trim();
  const msg = document.getElementById('orderMsg').value.trim();

  // 빈칸 검사
  if (name === '' || msg === '') {
    orderResult.textContent = '이름과 메시지를 모두 적어주세요!';
    orderResult.classList.add('error');
    return;
  }

  orderResult.classList.remove('error');
  orderResult.textContent =
    name + '님, 메시지 감사합니다! 😊 (연습용 폼이라 실제로 전송되지는 않아요. 이메일로 연락 주세요!)';
  orderForm.reset(); // 입력칸 비우기
});


// -------------------------------------------------------------
// 5. 푸터의 연도 자동 표시 (기존 홈페이지와 같은 기능)
// -------------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();
