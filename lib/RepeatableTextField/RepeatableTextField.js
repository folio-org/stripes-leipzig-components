import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  IconButton,
  Row,
  TextField,
} from '@folio/stripes/components';

import { Required } from './Validate';

const RepeatableTextField = ({
  ariaLabel = '',
  isFirstFieldRequired = false,
  fields,
  placeholder = '',
  fieldValidate = () => {},
}) => {
  const getValidate = useCallback((index) => (value) => {
    if (isFirstFieldRequired && index === 0) {
      const requiredError = Required(value);
      if (requiredError) return requiredError;
    }

    return fieldValidate(value);
  }, [isFirstFieldRequired, fieldValidate]);

  return (
    <Row>
      <Col xs={12}>
        {fields.map((elem, index) => (
          <Row key={elem}>
            <Col xs={8}>
              <Field
                ariaLabel={`${ariaLabel} #${index + 1}`}
                component={TextField}
                fullWidth
                id={elem}
                name={elem}
                placeholder={placeholder}
                required={isFirstFieldRequired && index === 0}
                validate={getValidate(index)}
              />
            </Col>
            <Col xs={1}>
              {/* no trash icon if first field is required */}
              {(!isFirstFieldRequired || index !== 0) &&
              <IconButton
                icon="trash"
                onClick={() => fields.remove(index)}
              />}
            </Col>
          </Row>
        ))}
      </Col>
      <Col xs={4}>
        <Button onClick={() => fields.push('')}>
          <FormattedMessage id="stripes-leipzig-components.repeatableTextField.buttonAdd" />
        </Button>
      </Col>
    </Row>
  );
};

RepeatableTextField.propTypes = {
  ariaLabel: PropTypes.string,
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  fieldValidate: PropTypes.func,
  isFirstFieldRequired: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default RepeatableTextField;
