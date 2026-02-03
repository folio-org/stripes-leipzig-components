import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { useMemo } from 'react';
import { Field } from 'react-final-form';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import MonthpickerInput from './MonthpickerInput';

const normalizeToLuxonFormat = (format) => format.replaceAll('Y', 'y').replaceAll('m', 'M');

const getDateFormatFromLocale = (locale) => {
  const parts = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date());

  return parts
    .map((part) => {
      if (part.type === 'month') return 'MM';
      if (part.type === 'year') return 'yyyy';
      return part.value;
    })
    .join('');
};

const getResolvedDateFormat = (locale, explicitFormat) => {
  const format = explicitFormat || getDateFormatFromLocale(locale);
  return normalizeToLuxonFormat(format);
};

const monthpickerValidator = ({ isRequired, inputFormat }) => (value) => {
  if (isRequired && !value) {
    return <FormattedMessage id="stripes-leipzig-components.monthpicker.errors.required" />;
  }

  if (value) {
    const dt = DateTime.fromFormat(value, inputFormat);

    if (!dt.isValid) {
      return <FormattedMessage id="stripes-leipzig-components.monthpicker.errors.dateInvalid" />;
    }
  }

  return undefined;
};

const Monthpicker = ({
  backendDateFormat = 'yyyy-MM',
  dateFormat,
  isRequired = false,
  name,
  textLabel,
}) => {
  const intl = useIntl();
  const resolvedDateFormat = getResolvedDateFormat(intl.locale, dateFormat);

  const resolvedBackendDateFormat = normalizeToLuxonFormat(backendDateFormat);

  const validator = useMemo(
    () => monthpickerValidator({ isRequired, inputFormat: resolvedBackendDateFormat }),
    [isRequired, resolvedBackendDateFormat]
  );

  return (
    <Field
      key={isRequired ? 'required' : 'optional'}
      name={name}
      validate={validator}
    >
      {({ input, meta }) => (
        <MonthpickerInput
          backendDateFormat={resolvedBackendDateFormat}
          dateFormat={resolvedDateFormat}
          input={input}
          isRequired={isRequired}
          meta={meta}
          textLabel={textLabel}
        />
      )}
    </Field>
  );
};

Monthpicker.propTypes = {
  backendDateFormat: PropTypes.string,
  dateFormat: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  textLabel: PropTypes.string,
};

export default Monthpicker;
