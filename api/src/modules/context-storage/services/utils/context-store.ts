export type PredefinedContextFields = {
  traceId: string;
};

export class ContextStore {
  private readonly dynamicFields = new Map<unknown, unknown>();

  constructor(private readonly predefinedFields: PredefinedContextFields) {}

  set(key: unknown, value: unknown): void {
    if (this.dynamicFields.has(key)) {
      throw new Error(`Key '${String(key)}' already exists.`);
    }
    this.dynamicFields.set(key, value);
  }

  overwrite(key: unknown, value: unknown): void {
    if (!this.dynamicFields.has(key)) {
      throw new Error(
        `Key '${String(key)}' does not exist. Use '${this.set.name}' or '${this.forceSet.name}' to add a new key-value pair.`,
      );
    }
    this.dynamicFields.set(key, value);
  }

  forceSet(key: unknown, value: unknown): void {
    this.dynamicFields.set(key, value);
  }
  get<V = unknown>(key: unknown): V {
    return this.dynamicFields.get(key) as V;
  }

  getPredefined(): PredefinedContextFields {
    return this.predefinedFields;
  }
}
