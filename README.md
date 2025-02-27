# TripTrav 프로젝트

## ▶ 개발 목적
- 사용자의 취향에 맞는 여행지 추천
- 가고 싶은 여행지나 맛집을 리스트로 정리
- 같이 가는 동행자를 추가하여 동행자와 함께 여행리스트 작성

---

## ▶ 프로젝트 일정
- **개발 시작일**: 24.8.18
- **개발 종료일**: 24.10.18 (2달)

---

## ▶ 개발 환경
- **OS**: Windows 10
- **IDE**: IntelliJ 24.1.2
- **Java**: Oracle OpenJDK 17.0.10
- **DBMS**: MySQL 8.0
- **Communication Tools**: Figma, GitHub

---

## ▶ 담당 파트
### 마이페이지 기능
- **프로필 수정**: 
  - 사진, 닉네임, 비밀번호 수정 가능.
  - 가입한 경로에 따라 수정 항목이 달라짐 (API를 통한 가입과 일반 가입의 차이점)
  
- **내 여행일정**:
  - 사용자가 작성한 여행일정을 마이페이지에서 확인할 수 있음.
  - 클릭하면 해당 여행일정 페이지로 이동.
  - 지난 여행일정과 예정된 여행일정이 구분되어 표시됨.

## ▶ 내가 쓴 리뷰

### 리뷰 작성 전 화면
![리뷰 작성 전 화면](https://github.com/wanted2001/imagefile/blob/main/%ED%8A%B8%EB%A6%BD%ED%8A%B8%EB%9E%A9/%EB%A6%AC%EB%B7%B0%20%EC%93%B0%EA%B8%B0%20%EC%A0%84.png)
- **설명**: 사용자가 리뷰를 작성하기 전에 보게 되는 화면입니다. 여기에서 리뷰의 내용을 입력하고 사진을 첨부할 수 있습니다. 사용자에게 친숙하고 직관적인 인터페이스를 제공합니다.

### 리뷰 수정 전 화면
![리뷰 수정 전 화면](https://github.com/wanted2001/imagefile/blob/main/%ED%8A%B8%EB%A6%BD%ED%8A%B8%EB%9E%A9/%EB%A6%AC%EB%B7%B0%20%EC%88%98%EC%A0%95%20%EC%A0%84.png)
- **설명**: 이미 작성한 리뷰를 수정하려는 화면입니다. 리뷰 내용 수정이 가능하고, 작성한 리뷰를 변경할 수 있습니다. 여기에선 사용자가 리뷰의 내용을 쉽게 확인하고 수정할 수 있는 기능을 제공합니다.

### 리뷰 수정 화면
![리뷰 수정 화면](https://github.com/wanted2001/imagefile/blob/main/%ED%8A%B8%EB%A6%BD%ED%8A%B8%EB%9E%A9/%EB%A6%AC%EB%B7%B0%20%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0.png)
- **설명**: 사용자가 리뷰를 수정하는 화면입니다. 리뷰의 내용을 업데이트하고 사진도 교체할 수 있습니다. 입력된 데이터는 데이터베이스에 저장되어 실시간으로 업데이트됩니다.

### 리뷰 수정 후 화면
![리뷰 수정 후 화면](https://github.com/wanted2001/imagefile/blob/main/%ED%8A%B8%EB%A6%BD%ED%8A%B8%EB%9E%A9/%EB%A6%AC%EB%B7%B0%20%EC%88%98%EC%A0%95%20%ED%9B%84.png)
- **설명**: 수정된 리뷰가 최종적으로 반영된 화면입니다. 사용자가 변경한 내용을 볼 수 있으며, 리뷰가 성공적으로 수정되었음을 확인할 수 있습니다.

  
- **찜한 장소**:
  - 사용자가 찜한 장소를 유형별로 분류.
  - 찜한 장소 삭제 가능.
  
- **찜한 여행 일정**:
  - 사용자가 찜한 여행일정을 표시하고, 삭제 가능.

---

## ▶ 여행 추천 페이지 기능
- 추천 페이지는 랜덤으로 추천.
- 찜한 여행 일정에는 찜 표시가 나타나도록 설정.

---

## ▶ 페이지 전환 및 동적 콘텐츠 관리
- 마이페이지에서 자연스러운 페이지 전환을 위해 **div** 안에 다른 HTML 파일과 JavaScript 파일을 불러오는 방식 사용.

#### 코드 예시: 페이지 전환을 위한 스크립트
```html
<script>
  function loadPage(pageUrl) {
    document.getElementById('content').innerHTML = '';
    fetch(pageUrl)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
      });
  }
</script>
