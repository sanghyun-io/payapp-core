/**
 * payapp-core
 * PayApp payment integration core library (framework-agnostic)
 */

// Types
export * from './types';

// Client
export { PayAppClient, createPayAppClient } from './client';

// Webhook (선택적 import)
// import { createWebhookHandler } from 'payapp-core/webhook'

// Utils
export {
  loadPayAppSDK,
  initPayAppSDK,
  requestPaymentWithSDK,
  requestRecurringPaymentWithSDK,
  validateFeedback,
  generateFeedbackKey,
  isPaymentCompleted,
  isPaymentCancelled,
  isPayAppError,
  getPayAppErrorMessage,
  PAYAPP_ERROR_MESSAGES,
} from './client';
