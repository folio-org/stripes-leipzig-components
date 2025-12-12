import { Required } from './Validate';

describe('Required validation', () => {
  it('returns undefined for non-empty string', () => {
    expect(Required('some value')).toBeUndefined();
  });

  it('returns undefined for number 0', () => {
    expect(Required(0)).toBeUndefined();
  });

  it('returns undefined for boolean false', () => {
    expect(Required(false)).toBeUndefined();
  });

  it('returns undefined for non-empty array', () => {
    expect(Required(['item'])).toBeUndefined();
  });

  it('returns error message for empty string', () => {
    const result = Required('');
    expect(result).toBeDefined();
    expect(result.props.id).toBe('stripes-leipzig-components.repeatableTextField.validateRequired');
  });

  it('returns error message for null', () => {
    const result = Required(null);
    expect(result).toBeDefined();
    expect(result.props.id).toBe('stripes-leipzig-components.repeatableTextField.validateRequired');
  });

  it('returns error message for undefined', () => {
    const result = Required(undefined);
    expect(result).toBeDefined();
    expect(result.props.id).toBe('stripes-leipzig-components.repeatableTextField.validateRequired');
  });
});
