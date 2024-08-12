import { ContextStore, PredefinedContextFields } from './context-store';

describe('ContextStore', () => {
  let contextStore: ContextStore;
  // @ts-expect-error
  const predefinedFields = { testPredefKey: 'test-predef-value' } as PredefinedContextFields;

  const testKey = 'test-key';
  const testValue = 'test-value';

  beforeEach(() => {
    contextStore = new ContextStore(predefinedFields);
  });

  it('should set a new key-value pair', () => {
    contextStore.set(testKey, testValue);

    expect(contextStore.get(testKey)).toBe(testValue);
  });

  it('should throw an error when setting an existing key', () => {
    contextStore.set(testKey, testValue);

    expect(() => contextStore.set(testKey, 'newValue')).toThrow(`Key 'test-key' already exists.`);
  });

  it('should overwrite an existing key-value pair', () => {
    contextStore.set(testKey, testValue);
    contextStore.overwrite(testKey, 'newValue');

    expect(contextStore.get(testKey)).toBe('newValue');
  });

  it('should throw an error when overwriting a non-existent key', () => {
    expect(() => contextStore.overwrite('nonExistentKey', 'value')).toThrow(
      "Key 'nonExistentKey' does not exist. Use 'set' or 'forceSet' to add a new key-value pair.",
    );
  });

  it('should force set a new key-value pair', () => {
    contextStore.forceSet(testKey, testValue);

    const result = contextStore.get(testKey);

    expect(result).toBe(testValue);
  });

  it('should force set an existing key-value pair', () => {
    contextStore.set(testKey, testValue);
    contextStore.forceSet(testKey, 'newValue');

    const result = contextStore.get(testKey);

    expect(result).toBe('newValue');
  });

  it('should return undefined for non-existent key', () => {
    const result = contextStore.get('nonExistentKey');

    expect(result).toBeUndefined();
  });

  it('should return predefined fields', () => {
    const result = contextStore.getPredefined();

    expect(result).toEqual(predefinedFields);
  });
});
