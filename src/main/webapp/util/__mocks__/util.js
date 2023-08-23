import { mockUnifiedConfig } from './mockUnifiedConfig';

export const generateEndPointUrl = jest.fn(() => 'mockGeneratedEndPointUrl');

export function getUnifiedConfigs() {
    return mockUnifiedConfig;
}

export const generateToast = jest.fn();
