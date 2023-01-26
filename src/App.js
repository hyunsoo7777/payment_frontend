import * as React from "react";
import axios from "axios";

async function createMerchantCode(amount) {
  fetch(`http://localhost:8080/payment/create?amount=${amount}`, {
    method: "GET",
  });
}

function requestPay() {
  const IMP = window.IMP;
  IMP.init("imp86085776");
  const data = {
    pg: "kcp.T0000", // PG사 (필수항목)
    pay_method: "card", // 결제수단 (필수항목)
    merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
    name: "결제 테스트", // 주문명 (필수항목)
    amount: "10,000", // 금액 (필수항목)
    buyer_name: "hyunsoo", // 구매자 이름
    buyer_tel: "010-2351-8197", // 구매자 전화번호 (필수항목)
    buyer_email: "pjk1245@naver.com", // 구매자 이메일
    buyer_addr: "삼전동 116-16",
    buyer_postalcode: "13023",
  };
  //

  IMP.request_pay(data, callback);
}
function callback(rsp) {
  if (rsp.success) {
    console.log(rsp);
    axios({
      url: "http://localhost:8080/payment/verify/",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        imp_uid: rsp.imp_uid,
      },
    }).then((data) => {
      alert("결제 완료");
      // 서버 결제 API 성공시 로직
    });
  } else {
    alert(`결제 실패 : ${rsp.error_msg}`);
  }
}

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          createMerchantCode(10000);
          requestPay();
        }}
      >
        결제하기
      </button>
    </div>
  );
}

export default App;
