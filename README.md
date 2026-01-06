# payapp-core

PayApp 결제 연동 Core 라이브러리 (Framework-agnostic)

## 특징

- ✅ **Framework-agnostic**: React, Vue, Angular, Vanilla JS 등 모든 프레임워크에서 사용 가능
- ✅ **TypeScript**: 완전한 타입 지원
- ✅ **REST API & JavaScript SDK**: 두 가지 방식 모두 지원
- ✅ **Webhook 처리**: Supabase Edge Function 등에서 사용 가능한 Webhook 핸들러 제공

## 설치

```bash
npm install payapp-core
```

## 사용 방법

### 1. REST API 방식

```typescript
import { createPayAppClient } from 'payapp-core';

const client = createPayAppClient({
  userid: 'your_userid',
  linkkey: 'your_linkkey',
  linkval: 'your_linkval',
});

// 결제 요청
const response = await client.requestPayment({
  shopname: '상점명',
  goodname: '상품명',
  price: 10000,
  recvphone: '01012341234',
});

console.log(response.payurl); // 결제 페이지 URL
```

### 2. JavaScript SDK 방식

```typescript
import {
  loadPayAppSDK,
  initPayAppSDK,
  requestPaymentWithSDK
} from 'payapp-core';

// SDK 로드
await loadPayAppSDK();

// SDK 초기화
initPayAppSDK('your_userid', '상점명');

// 결제 요청
requestPaymentWithSDK({
  goodname: '상품명',
  price: 10000,
  recvphone: '01012341234',
});
```

### 3. Webhook 처리

```typescript
import { createWebhookHandler } from 'payapp-core/webhook';

const handler = createWebhookHandler(
  {
    userid: 'your_userid',
    linkkey: 'your_linkkey',
    linkval: 'your_linkval',
  },
  {
    onPaymentCompleted: async (feedback) => {
      console.log('결제 완료:', feedback.mul_no);
      // 결제 완료 처리 로직
    },
    onPaymentCancelled: async (feedback) => {
      console.log('결제 취소:', feedback.mul_no);
      // 결제 취소 처리 로직
    },
  }
);

// Supabase Edge Function에서 사용
Deno.serve(handler);
```

## API

### PayAppClient

- `requestPayment()` - 결제 요청
- `cancelPayment()` - 결제 취소
- `registerBill()` - 등록결제 등록
- `deleteBill()` - 등록결제 삭제
- `payWithBill()` - 등록결제로 결제
- `registerRecurringPayment()` - 정기결제 요청
- `cancelRecurringPayment()` - 정기결제 해지
- `stopRecurringPayment()` - 정기결제 일시정지
- `startRecurringPayment()` - 정기결제 재개
- `issueCashReceipt()` - 현금영수증 발행
- `cancelCashReceipt()` - 현금영수증 취소

### Webhook Processor

- `PayAppWebhookProcessor` - Webhook 처리 클래스
- `createWebhookHandler()` - Supabase Edge Function용 핸들러 생성
- `validateFeedback()` - Webhook 검증
- `isPaymentCompleted()` - 결제 완료 상태 확인
- `isPaymentCancelled()` - 결제 취소 상태 확인

## Framework 별 사용 예시

### Vanilla JavaScript

```javascript
import { createPayAppClient } from 'payapp-core';

const client = createPayAppClient({
  userid: 'your_userid',
  linkkey: 'your_linkkey',
  linkval: 'your_linkval',
});

document.getElementById('payBtn').addEventListener('click', async () => {
  const response = await client.requestPayment({
    shopname: '상점명',
    goodname: '상품명',
    price: 10000,
    recvphone: '01012341234',
  });
  
  window.location.href = response.payurl;
});
```

### Vue 3

```vue
<script setup>
import { createPayAppClient } from 'payapp-core';

const client = createPayAppClient({
  userid: import.meta.env.VITE_PAYAPP_USER_ID,
  linkkey: import.meta.env.VITE_PAYAPP_LINK_KEY,
  linkval: import.meta.env.VITE_PAYAPP_LINK_VAL,
});

const handlePayment = async () => {
  const response = await client.requestPayment({
    shopname: '상점명',
    goodname: '상품명',
    price: 10000,
    recvphone: '01012341234',
  });
  
  window.location.href = response.payurl;
};
</script>

<template>
  <button @click="handlePayment">결제하기</button>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { createPayAppClient } from 'payapp-core';

@Component({
  selector: 'app-payment',
  template: '<button (click)="handlePayment()">결제하기</button>'
})
export class PaymentComponent {
  private client = createPayAppClient({
    userid: environment.payappUserId,
    linkkey: environment.payappLinkKey,
    linkval: environment.payappLinkVal,
  });

  async handlePayment() {
    const response = await this.client.requestPayment({
      shopname: '상점명',
      goodname: '상품명',
      price: 10000,
      recvphone: '01012341234',
    });
    
    window.location.href = response.payurl!;
  }
}
```

### React

React를 사용하는 경우 [payapp-react](https://github.com/sanghyun-io/payapp-react) 패키지를 사용하는 것을 권장합니다:

```bash
npm install payapp-react
```

```tsx
import { usePayApp } from 'payapp-react';

function PaymentButton() {
  const { requestPayment, isLoading } = usePayApp({
    credentials: {
      userid: process.env.REACT_APP_PAYAPP_USER_ID,
      linkkey: process.env.REACT_APP_PAYAPP_LINK_KEY,
      linkval: process.env.REACT_APP_PAYAPP_LINK_VAL,
    }
  });

  return (
    <button onClick={() => requestPayment({
      goodname: '상품명',
      price: 10000,
      recvphone: '01012341234',
    })}>
      {isLoading ? '처리 중...' : '결제하기'}
    </button>
  );
}
```

## 라이선스

MIT

## 링크

- [PayApp 개발자 센터](https://www.payapp.kr/dev_center/dev_center01.html)
- [payapp-react (React Hooks)](https://github.com/sanghyun-io/payapp-react)
