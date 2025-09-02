import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { vi } from 'vitest';

// Make jasmine available globally for backward compatibility
(global as any).jasmine = {
  createSpy: vi.fn,
  createSpyObj: vi.fn,
  any: vi.fn,
  objectContaining: vi.fn,
};

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
